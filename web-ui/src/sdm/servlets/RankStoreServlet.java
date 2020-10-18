package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import SDMSystem.user.storeOwner.StoreOwner;
import SDMSystemDTO.order.DTOOrder;
import com.google.gson.Gson;
import org.omg.SendingContext.RunTime;
import sdm.constants.Constants;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class RankStoreServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
            int storeToRankId = Integer.parseInt(request.getParameter("storeToRankId"));
            String comment = request.getParameter("comment");
            float rank = Float.parseFloat(request.getParameter("starRating"));
            if(rank ==0){
                throw new RuntimeException("You must rank the store!");
            }
            String zone = SessionUtils.getChosenZone(request);
            SDMSystemInZone sdmSystemInZone = sdmSystemManager.getZoneSystem(zone);
            String username = SessionUtils.getUsername(request);
            if (username == null) {
                response.sendRedirect(request.getContextPath() + "/index.html");
            }
            sdmSystemInZone.giveFeedback(storeToRankId, comment, rank, username);
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
        return "get row data";
    }// </editor-fold>
}
