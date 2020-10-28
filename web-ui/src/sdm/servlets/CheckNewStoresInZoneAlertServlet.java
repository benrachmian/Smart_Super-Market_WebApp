package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.user.storeOwner.StoreOwner;
import SDMSystemDTO.order.DTOOrder;
import SDMSystemDTO.store.DTOStore;
import com.google.gson.Gson;
import sdm.constants.Constants;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;
import sdm.utils.ThreadSafeUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class CheckNewStoresInZoneAlertServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
        String username = SessionUtils.getUsername(request);
        int newStoresAlertVersion = SessionUtils.getNewStoresAlertVersion(request);
        if (username == null) {
            response.sendRedirect(request.getContextPath() + "/index.html");
        }
        StoreOwner storeOwner = sdmSystemManager.getStoreOwner(username);


        ArrayList<DTOStore> newStoresList;
        synchronized (ThreadSafeUtils.storeLock) {
            newStoresList = storeOwner.getNewStoresFromUser(newStoresAlertVersion);
            request.getSession(false).setAttribute(Constants.NEW_STORES_ALERT_VERSION, storeOwner.getNumOfStoresInZones());
        }
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(newStoresList);

        try (PrintWriter out = response.getWriter()) {
            out.print(jsonResponse);
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
        return "get row data";
    }// </editor-fold>



}
