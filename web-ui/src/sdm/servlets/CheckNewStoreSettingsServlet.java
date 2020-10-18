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

public class CheckNewStoreSettingsServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //response.setContentType("text/html;charset=UTF-8");
        String chosenZone = SessionUtils.getChosenZone(request);
        String storeIdParameter = request.getParameter("storeId");
        String storeNameParameter = request.getParameter("storeName");
        String locationX = request.getParameter("locationX");
        String locationY = request.getParameter("locationY");
        String ppk = request.getParameter("ppk");
        SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
        SDMSystemInZone sdmSystemInZone = sdmSystemManager.getZoneSystem(chosenZone);

        try{
            if(storeIdParameter.isEmpty() || storeNameParameter.isEmpty() || locationX.isEmpty() || locationY.isEmpty() || ppk.isEmpty()){
                throw new RuntimeException("All fields must be filled!");
            }
            int storeId = Integer.parseInt(storeIdParameter);
            if(storeId <0){
                throw new RuntimeException("The store ID must be a positive number!");
            }
            if(!sdmSystemInZone.isAvailableStoreId(storeId)){
                throw new RuntimeException("The store ID is already taken, please try different ID");
            }
            int x = Integer.parseInt(locationX);
            int y = Integer.parseInt(locationY);
            if(!sdmSystemInZone.checkIfLocationIsUnique(new Point(x,y))){
                throw new RuntimeException("The location is already taken. Please try different location.");
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
