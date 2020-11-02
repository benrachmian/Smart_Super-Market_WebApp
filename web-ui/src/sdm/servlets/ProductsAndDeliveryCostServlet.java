package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import SDMSystemDTO.product.IDTOProductInStore;
import com.google.gson.Gson;
import SDMSystemDTO.pair.Pair;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.Map;

public class ProductsAndDeliveryCostServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        String zoneFromSession = SessionUtils.getChosenZone(request);
        SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
        SDMSystemInZone sdmSystemInZone = sdmSystemManager.getZoneSystem(zoneFromSession);
        int x = Integer.parseInt(request.getParameter("orderToLocationX"));
        int y = Integer.parseInt(request.getParameter("orderToLocationY"));
        Point orderToLocation = new Point(x,y);
        Map<Integer, Collection<Pair<IDTOProductInStore, Float>>> shoppingCart = SessionUtils.getShoppingCart(request);
        TotalProductsAndDeliveryCost totalProductsAndDeliveryCost = calcTotalProductsCost(shoppingCart,sdmSystemInZone,orderToLocation);

        Gson gson = new Gson();
        String jsonResponse = gson.toJson(totalProductsAndDeliveryCost);

        try (PrintWriter out = response.getWriter()) {
            out.print(jsonResponse);
            out.flush();
        }
    }

    private TotalProductsAndDeliveryCost calcTotalProductsCost(Map<Integer, Collection<Pair<IDTOProductInStore, Float>>> shoppingCart, SDMSystemInZone sdmSystemInZone, Point orderToLocation) {

        float totalProductsCost = 0;
        float totalDeliveryCost = 0;

        for(Integer storeId : shoppingCart.keySet()){
            for(Pair<IDTOProductInStore, Float> productAndAmount : shoppingCart.get(storeId)){
                totalProductsCost += (productAndAmount.getKey().getPrice() * productAndAmount.getValue());
            }
            totalDeliveryCost += sdmSystemInZone.getDeliveryCost(storeId,orderToLocation);
        }

        return new TotalProductsAndDeliveryCost(totalProductsCost,totalDeliveryCost);
    }

    private class TotalProductsAndDeliveryCost{
       private float totalProductsCost;
       private float totalDeliveryCost;

        public TotalProductsAndDeliveryCost(float totalProductsCost, float totalDeliveryCost) {
            this.totalProductsCost = totalProductsCost;
            this.totalDeliveryCost = totalDeliveryCost;
        }

        public float getTotalProductsCost() {
            return totalProductsCost;
        }

        public void setTotalProductsCost(float totalProductsCost) {
            this.totalProductsCost = totalProductsCost;
        }

        public float getTotalDeliveryCost() {
            return totalDeliveryCost;
        }

        public void setTotalDeliveryCost(float totalDeliveryCost) {
            this.totalDeliveryCost = totalDeliveryCost;
        }
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
        return "get products in store";
    }// </editor-fold>
}
