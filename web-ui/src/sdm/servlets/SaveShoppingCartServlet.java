package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import SDMSystemDTO.product.DTOProductInStore;
import SDMSystemDTO.product.IDTOProductInStore;
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

public class SaveShoppingCartServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        try {
            SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
            String zone = SessionUtils.getChosenZone(request);
            SDMSystemInZone zoneSystem = sdmSystemManager.getZoneSystem(zone);

            BufferedReader br =
                    new BufferedReader(new InputStreamReader(request.getInputStream()));

            String json = "";
            if(br != null){
                json = br.readLine();
                System.out.println(json);
            }
            Gson gson = new Gson();
            Type listType = new TypeToken<ArrayList<ProductAndAmount>>(){}.getType();
            List<ProductAndAmount> productsAndAmount = gson.fromJson(json, listType);
            Map<Integer,Pair<IDTOProductInStore, Float>> shoppingCart = createShoppingCartFromProductsAndAmount(productsAndAmount);

            request.getSession(true).setAttribute(Constants.SHOPPING_CART, shoppingCart);
        }
        catch (RuntimeException e){
            response.setStatus(500);
            out.print(e.getMessage());
            out.flush();
        }
    }

    private Map<Integer, Pair<IDTOProductInStore, Float>> createShoppingCartFromProductsAndAmount(List<ProductAndAmount> productsAndAmount) {
        Map<Integer,Pair<IDTOProductInStore, Float>> shoppingCart = new HashMap<>();
        for(ProductAndAmount productAndAmount : productsAndAmount){
            //if already bought this product - need to update the amount bought
            Integer productId = productAndAmount.product.getProductSerialNumber();
            if(shoppingCart.get(productId) != null){
                float oldAmount = shoppingCart.get(productId).getValue();
                shoppingCart.remove(productId);
                shoppingCart.put(productId,new Pair<>(productAndAmount.product,productAndAmount.amount + oldAmount));
            }
            else{
                shoppingCart.put(productId,new Pair<>(productAndAmount.product,productAndAmount.amount));
            }
        }

        return shoppingCart;
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
        private DTOProductInStore product;
        private Float amount;

        public DTOProductInStore getProduct() {
            return product;
        }

        public void setProduct(DTOProductInStore product) {
            this.product = product;
        }

        public Float getAmount() {
            return amount;
        }

        public void setAmount(Float amount) {
            this.amount = amount;
        }
    }

    private class ShoppingCart{
        List<ProductAndAmount> list;

        public List<ProductAndAmount> getList() {
            return list;
        }
    }

}
