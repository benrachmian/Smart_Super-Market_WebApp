package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import SDMSystemDTO.order.DTOOrder;
import SDMSystemDTO.product.IDTOProductInStore;
import javafx.util.Pair;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class MakeNewDynamicOrderServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String zoneFromSession = SessionUtils.getChosenZone(request);
        SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
        SDMSystemInZone sdmSystemInZone = sdmSystemManager.getZoneSystem(zoneFromSession);
        Map<Integer, Collection<Pair<IDTOProductInStore, Float>>> shoppingCart = SessionUtils.getShoppingCart(request);
        int orderToX = Integer.parseInt(request.getParameter("orderToX"));
        int orderToY = Integer.parseInt(request.getParameter("orderToY"));
        Point orderToLocation = new Point(orderToX,orderToY);
//        float deliveryCost = Float.parseFloat(request.getParameter("deliveryCost"));
        LocalDate orderDate = LocalDate.parse(request.getParameter("orderDate"));
        String userName = SessionUtils.getUsername(request);
//        //key: username, value: orders in user's stores
//        Map<String, ArrayList<DTOOrder>> usersStoreOrdersMap = ServletUtils.getUsersStoreOrdersMap(getServletContext());
//        ArrayList<DTOOrder> thisUserStoresOrder = usersStoreOrdersMap.get(userName);
//        if(thisUserStoresOrder == null){
//            thisUserStoresOrder = new ArrayList<>();
//        }
        sdmSystemInZone.makeNewDynamicOrder(
                orderDate,
                shoppingCart,
                userName,
                orderToLocation,
                sdmSystemManager
        );
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
