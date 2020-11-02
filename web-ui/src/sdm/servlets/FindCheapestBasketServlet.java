package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import SDMSystemDTO.product.DTOProduct;
import SDMSystemDTO.product.IDTOProductInStore;
import SDMSystemDTO.store.DTOStore;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import SDMSystemDTO.pair.Pair;
import sdm.constants.Constants;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.util.*;
import java.util.List;

public class FindCheapestBasketServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        String zoneFromSession = SessionUtils.getChosenZone(request);
        SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
        SDMSystemInZone sdmSystemInZone = sdmSystemManager.getZoneSystem(zoneFromSession);

        try {
            BufferedReader br =
                    new BufferedReader(new InputStreamReader(request.getInputStream()));
            String json = "";
            if(br != null){
                json = br.readLine();
                System.out.println(json);
            }
            Gson gson = new Gson();
            Type listType = new TypeToken<ArrayList<FindCheapestBasketServlet.ProductAndAmount>>(){}.getType();
            java.util.List<FindCheapestBasketServlet.ProductAndAmount> productsAndAmount = gson.fromJson(json, listType);
            Collection<Pair<DTOProduct, Float>> productsInOrder = createProductsInOrderProductsAndAmount(productsAndAmount);
            Map<Integer, Collection<Pair<IDTOProductInStore, Float>>> cheapestBasket = new HashMap<>();
            sdmSystemInZone.makeCheapestBasket(cheapestBasket,productsInOrder);
            request.getSession(true).setAttribute(Constants.SHOPPING_CART, cheapestBasket);
            Collection<StoreResponse> storesParticipating = createStoresParticipating(cheapestBasket,sdmSystemInZone);
            String jsonResponse = gson.toJson(storesParticipating);
                out.print(jsonResponse);
                out.flush();
        }
        catch (RuntimeException e){
            response.setStatus(500);
            out.print(e.getMessage());
            out.flush();
        }
    }

    private Collection<StoreResponse> createStoresParticipating(Map<Integer, Collection<Pair<IDTOProductInStore, Float>>> cheapestBasket, SDMSystemInZone sdmSystemInZone) {
        Collection<StoreResponse> storesParticipating = new LinkedList<>();
        for(Integer storeId : cheapestBasket.keySet()){
            DTOStore storeParticipating = sdmSystemInZone.getStoreFromStores(storeId);
            storesParticipating.add(new StoreResponse(
                    storeParticipating,
                    cheapestBasket.get(storeParticipating.getStoreSerialNumber()).size(),
                    sdmSystemInZone.calcProductsInOrderCost(cheapestBasket.get(storeParticipating.getStoreSerialNumber()))));
        }
        return storesParticipating;
    }

    private Collection<Pair<DTOProduct, Float>> createProductsInOrderProductsAndAmount(List<ProductAndAmount> productsAndAmount) {
        Collection<Pair<DTOProduct, Float>> productsInOrder = new LinkedList<>();
        for(ProductAndAmount productAndAmount : productsAndAmount){
            productsInOrder.add(new Pair<>(productAndAmount.product,productAndAmount.amount));
        }
        return productsInOrder;
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Save order date,type and location";
    }// </editor-fold>


    private class ProductAndAmount{
        private DTOProduct product;
        private Float amount;

        public DTOProduct getProduct() {
            return product;
        }

        public void setProduct(DTOProduct product) {
            this.product = product;
        }

        public Float getAmount() {
            return amount;
        }

        public void setAmount(Float amount) {
            this.amount = amount;
        }
    }

    private class StoreResponse{
        private DTOStore store;
        private int numProductsKind;
        private float productsCost;

        public StoreResponse(DTOStore store, int numProductsKind, float productsCost) {
            this.store = store;
            this.numProductsKind = numProductsKind;
            this.productsCost = productsCost;
        }

        public float getProductsCost() {
            return productsCost;
        }

        public void setProductsCost(float productsCost) {
            this.productsCost = productsCost;
        }

        public DTOStore getStore() {
            return store;
        }

        public void setStore(DTOStore store) {
            this.store = store;
        }

        public int getNumProductsKind() {
            return numProductsKind;
        }

        public void setNumProductsKind(int numProductsKind) {
            this.numProductsKind = numProductsKind;
        }
    }
}
