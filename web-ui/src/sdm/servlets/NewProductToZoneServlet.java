package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import SDMSystem.user.storeOwner.StoreOwner;
import SDMSystemDTO.product.WayOfBuying;
import SDMSystemDTO.store.DTOStore;
import com.google.gson.Gson;
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
import java.util.*;

public class NewProductToZoneServlet extends HttpServlet {
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
            NewProductDetails newProductDetails = gson.fromJson(json, NewProductDetails.class);
            //key: store Id, value: price
            Map<Integer, Float> storesSellingTheProductAndPrice = makeStoresSellingTheProductAndPriceFromDetails(newProductDetails);
            sdmSystemInZone.addNewProductToSystem(
                    newProductDetails.productId,
                    newProductDetails.productName,
                    newProductDetails.productWayOfBuying == "By quantity"? WayOfBuying.BY_QUANTITY : WayOfBuying.BY_WEIGHT,
                    storesSellingTheProductAndPrice
            );
        } catch (RuntimeException e) {
            response.setStatus(500);
            out.print(e.getMessage());
            out.flush();
        }
    }

    private Map<Integer, Float> makeStoresSellingTheProductAndPriceFromDetails(NewProductDetails newProductDetails) {
        Map<Integer, Float> storesSellingTheProductAndPrice = new HashMap<>();
        for(StoreSellingNewProduct storeToSellNewProduct : newProductDetails.storesThatSellTheProduct){
            storesSellingTheProductAndPrice.put(storeToSellNewProduct.store.getStoreSerialNumber(),storeToSellNewProduct.price);
        }

        return storesSellingTheProductAndPrice;
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

    private class NewProductDetails{
        private int productId;
        private String productName;
        private String productWayOfBuying;
        ArrayList<StoreSellingNewProduct> storesThatSellTheProduct;

        public int getProductId() {
            return productId;
        }

        public void setProductId(int productId) {
            this.productId = productId;
        }

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public String getProductWayOfBuying() {
            return productWayOfBuying;
        }

        public void setProductWayOfBuying(String productWayOfBuying) {
            this.productWayOfBuying = productWayOfBuying;
        }

        public ArrayList<StoreSellingNewProduct> getStoresThatSellTheProduct() {
            return storesThatSellTheProduct;
        }

        public void setStoresThatSellTheProduct(ArrayList<StoreSellingNewProduct> storesThatSellTheProduct) {
            this.storesThatSellTheProduct = storesThatSellTheProduct;
        }
    }

    private class StoreSellingNewProduct{
        private DTOStore store;
        private float price;

        public DTOStore getStore() {
            return store;
        }

        public void setStore(DTOStore store) {
            this.store = store;
        }

        public float getPrice() {
            return price;
        }

        public void setPrice(float price) {
            this.price = price;
        }
    }
}
