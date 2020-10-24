package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.io.PrintWriter;

public class CheckNewProductSettingsServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //response.setContentType("text/html;charset=UTF-8");
        String chosenZone = SessionUtils.getChosenZone(request);

        String productIdParameter = request.getParameter("productId");
        String productNameParameter = request.getParameter("product-name");
        String productWayOfBuying = request.getParameter("wayOfBuying");

        SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
        SDMSystemInZone sdmSystemInZone = sdmSystemManager.getZoneSystem(chosenZone);

        try{
            if(productIdParameter.isEmpty() || productNameParameter.isEmpty() || productWayOfBuying.isEmpty()){
                throw new RuntimeException("All fields must be filled!");
            }
            int productId = Integer.parseInt(productIdParameter);
            if(productId <0){
                throw new RuntimeException("The product ID must be a positive number!");
            }
            if(!sdmSystemInZone.isAvailableProductId(productId)){
                throw new RuntimeException("The product ID is already taken, please try different ID");
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
     *
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
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
