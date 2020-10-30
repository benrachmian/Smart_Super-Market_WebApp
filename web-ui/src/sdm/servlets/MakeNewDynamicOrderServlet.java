package sdm.servlets;

import SDMSystem.exceptions.NoMoneyException;
import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import SDMSystemDTO.order.DTOOrder;
import SDMSystemDTO.product.IDTOProductInStore;
import javafx.util.Pair;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;
import sdm.utils.ThreadSafeUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class MakeNewDynamicOrderServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String zoneFromSession = SessionUtils.getChosenZone(request);
        SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
        SDMSystemInZone sdmSystemInZone = sdmSystemManager.getZoneSystem(zoneFromSession);
        Map<Integer, Collection<Pair<IDTOProductInStore, Float>>> shoppingCart = SessionUtils.getShoppingCart(request);
        int orderToX = Integer.parseInt(request.getParameter("orderToX"));
        int orderToY = Integer.parseInt(request.getParameter("orderToY"));
        Point orderToLocation = new Point(orderToX,orderToY);
        LocalDate orderDate = LocalDate.parse(request.getParameter("orderDate"));
        String userName = SessionUtils.getUsername(request);

        try {
            synchronized (ThreadSafeUtils.newOrderLock) {
                sdmSystemInZone.makeNewDynamicOrder(
                        orderDate,
                        shoppingCart,
                        userName,
                        orderToLocation,
                        sdmSystemManager
                );
            }
        }
        catch (NoMoneyException e){
            response.setStatus(500);
            out.print("You don't have enough money! The order cost " + e.getOrderCost() + " whilst you have " + e.getCustomerMoney());
            out.flush();
        }
        catch (RuntimeException e){
            response.setStatus(500);
            out.print(e.getMessage());
            out.flush();
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
