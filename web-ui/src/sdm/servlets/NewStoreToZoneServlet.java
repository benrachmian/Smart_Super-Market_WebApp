package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import SDMSystem.user.storeOwner.StoreOwner;
import SDMSystemDTO.product.DTOProduct;
import SDMSystemDTO.product.DTOProductInStore;
import SDMSystemDTO.product.IDTOProductInStore;
import SDMSystemDTO.store.DTOStore;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import javafx.util.Pair;
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

public class NewStoreToZoneServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        String zoneFromSession = SessionUtils.getChosenZone(request);
        SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
        SDMSystemInZone sdmSystemInZone = sdmSystemManager.getZoneSystem(zoneFromSession);
        String username = SessionUtils.getUsername(request);
        StoreOwner newStoreOwner = sdmSystemManager.getStoreOwner(username);
        try {
            BufferedReader br =
                    new BufferedReader(new InputStreamReader(request.getInputStream()));
            String json = "";
            if (br != null) {
                json = br.readLine();
                System.out.println(json);
            }
            Gson gson = new Gson();
            NewStoreDetails newStoreDetails = gson.fromJson(json, NewStoreDetails.class);
            Collection<DTOProductInStore> productsInNewStore = makeProductsInNewStoreCollectionFromNewStoreDetails(newStoreDetails);
            sdmSystemInZone.addNewStoreToSystem(
                    newStoreDetails.storeId,
                    newStoreDetails.storeName,
                    newStoreDetails.locationX,
                    newStoreDetails.locationY,
                    newStoreDetails.ppk,
                    productsInNewStore,
                    newStoreOwner,
                    zoneFromSession
            );
        } catch (RuntimeException e) {
            response.setStatus(500);
            out.print(e.getMessage());
            out.flush();
        }
    }

    private Collection<DTOProductInStore> makeProductsInNewStoreCollectionFromNewStoreDetails(NewStoreDetails newStoreDetails) {
        Collection<DTOProductInStore> productsInNewStore = new LinkedList<>();
        for(ProductInNewStore productInNewStore : newStoreDetails.productsInNewStore){
            productsInNewStore.add(new DTOProductInStore(
                    productInNewStore.product.getProductSerialNumber(),
                    productInNewStore.product.getProductName(),
                    productInNewStore.product.getWayOfBuying(),
                    productInNewStore.product.getAmountSoldInAllStores(),
                    productInNewStore.price,
                    0,
                    newStoreDetails.storeId,
                    productInNewStore.product.getNumOfStoresSellingTheProduct(),
                    productInNewStore.product.getAvgPrice(),
                    newStoreDetails.storeName
            ));
        }

        return productsInNewStore;
    }


    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Save order date,type and location";
    }// </editor-fold>

    private class NewStoreDetails{
        private int storeId;
        private String storeName;
        private int locationX;
        private int locationY;
        private float ppk;
        ArrayList<ProductInNewStore> productsInNewStore;

        public NewStoreDetails(int storeId, String storeName, int locationX, int locationY, float ppk, ArrayList<ProductInNewStore> productsInNewStore) {
            this.storeId = storeId;
            this.storeName = storeName;
            this.locationX = locationX;
            this.locationY = locationY;
            this.ppk = ppk;
            this.productsInNewStore = productsInNewStore;
        }

        public int getStoreId() {
            return storeId;
        }

        public void setStoreId(int storeId) {
            this.storeId = storeId;
        }

        public String getStoreName() {
            return storeName;
        }

        public void setStoreName(String storeName) {
            this.storeName = storeName;
        }

        public int getLocationX() {
            return locationX;
        }

        public void setLocationX(int locationX) {
            this.locationX = locationX;
        }

        public int getLocationY() {
            return locationY;
        }

        public void setLocationY(int locationY) {
            this.locationY = locationY;
        }

        public float getPpk() {
            return ppk;
        }

        public void setPpk(float ppk) {
            this.ppk = ppk;
        }

        public ArrayList<ProductInNewStore> getProductsInNewStore() {
            return productsInNewStore;
        }

        public void setProductsInNewStore(ArrayList<ProductInNewStore> productsInNewStore) {
            this.productsInNewStore = productsInNewStore;
        }
    }

    private class ProductInNewStore{
        private DTOProduct product;
        private float price;

        public ProductInNewStore(DTOProduct product, float price) {
            this.product = product;
            this.price = price;
        }

        public DTOProduct getProduct() {
            return product;
        }

        public void setProduct(DTOProduct product) {
            this.product = product;
        }

        public float getPrice() {
            return price;
        }

        public void setPrice(float price) {
            this.price = price;
        }
    }

}



//    private class ProductAndAmount{
//        private DTOProduct product;
//        private Float amount;
//
//        public DTOProduct getProduct() {
//            return product;
//        }
//
//        public void setProduct(DTOProduct product) {
//            this.product = product;
//        }
//
//        public Float getAmount() {
//            return amount;
//        }
//
//        public void setAmount(Float amount) {
//            this.amount = amount;
//        }
//    }
//
//    private class StoreResponse{
//        private DTOStore store;
//        private int numProductsKind;
//        private float productsCost;
//
//        public StoreResponse(DTOStore store, int numProductsKind, float productsCost) {
//            this.store = store;
//            this.numProductsKind = numProductsKind;
//            this.productsCost = productsCost;
//        }
//
//        public float getProductsCost() {
//            return productsCost;
//        }
//
//        public void setProductsCost(float productsCost) {
//            this.productsCost = productsCost;
//        }
//
//        public DTOStore getStore() {
//            return store;
//        }
//
//        public void setStore(DTOStore store) {
//            this.store = store;
//        }
//
//        public int getNumProductsKind() {
//            return numProductsKind;
//        }
//
//        public void setNumProductsKind(int numProductsKind) {
//            this.numProductsKind = numProductsKind;
//        }
//    }
//}
