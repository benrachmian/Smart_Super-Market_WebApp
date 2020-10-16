package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.user.storeOwner.StoreOwner;
import SDMSystemDTO.order.DTOOrder;
import SDMSystemDTO.system.SingleZoneEntry;
import com.google.gson.Gson;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class CheckOrdersAlertServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
        int orderAlertVersion = Integer.parseInt(request.getParameter("orderAlertVersion"));
        String username = SessionUtils.getUsername(request);
        if (username == null) {
            response.sendRedirect(request.getContextPath() + "/index.html");
        }
        StoreOwner storeOwner = sdmSystemManager.getStoreOwner(username);
        NewOrdersAndVersion newOrdersAndVersion;
         /*
        verify chat version given from the user is a valid number. if not it is considered an error and nothing is returned back
        Obviously the UI should be ready for such a case and handle it properly
         */
//        if (numOfZonesInTable == Constants.INT_PARAMETER_ERROR) {
//            return;
//        }

        ArrayList<DTOOrder> ordersFromUserStores;
        synchronized (getServletContext()) {
            ordersFromUserStores = storeOwner.getNewOrdersFromUser(orderAlertVersion);
            newOrdersAndVersion = new NewOrdersAndVersion(ordersFromUserStores,storeOwner.getOrdersFromUser().size());
        }

        Gson gson = new Gson();
        String jsonResponse = gson.toJson(newOrdersAndVersion);

        try (PrintWriter out = response.getWriter()) {
            out.print(jsonResponse);
            out.flush();
        }
        // }
    }

    private class NewOrdersAndVersion{
        ArrayList<DTOOrder> newOrders;
        int version;

        public NewOrdersAndVersion(ArrayList<DTOOrder> newOrders, int version) {
            this.newOrders = newOrders;
            this.version = version;
        }

        public ArrayList<DTOOrder> getNewOrders() {
            return newOrders;
        }

        public void setNewOrders(ArrayList<DTOOrder> newOrders) {
            this.newOrders = newOrders;
        }

        public int getVersion() {
            return version;
        }

        public void setVersion(int version) {
            this.version = version;
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
        return "get row data";
    }// </editor-fold>
}
