package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import SDMSystemDTO.discount.DTODiscount;
import SDMSystemDTO.feedback.DTOFeedback;
import SDMSystemDTO.product.IDTOProductInStore;
import SDMSystemDTO.store.DTOStore;
import com.google.gson.Gson;
import javafx.util.Pair;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;
import sdm.utils.ThreadSafeUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.LinkedList;
import java.util.Map;

public class GetFeedbacksServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        String zoneFromSession = SessionUtils.getChosenZone(request);
        SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
        String username = SessionUtils.getUsername(request);
        Collection<DTOFeedback> zoneFeedbacks;
        try {
            synchronized (ThreadSafeUtils.feedbacksLock) {
                zoneFeedbacks = sdmSystemManager.getZoneFeedbacks(username, zoneFromSession);
            }
            Gson gson = new Gson();
            String jsonResponse = gson.toJson(zoneFeedbacks);

            try (PrintWriter out = response.getWriter()) {
                out.print(jsonResponse);
                out.flush();
            }
        }
        catch (RuntimeException e){
            PrintWriter out = response.getWriter();
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
