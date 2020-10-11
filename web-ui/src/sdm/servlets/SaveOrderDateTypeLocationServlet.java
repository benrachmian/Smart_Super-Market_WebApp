package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import sdm.constants.Constants;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class SaveOrderDateTypeLocationServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        try {
            SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
            String zone = SessionUtils.getChosenZone(request);
            SDMSystemInZone zoneSystem = sdmSystemManager.getZoneSystem(zone);
            String xLocation = request.getParameter("locationX");
            String yLocation = request.getParameter("locationY");
            String orderDate = request.getParameter("date");
            String orderType = request.getParameter("ordertype");
            if(xLocation.isEmpty() || yLocation.isEmpty() || orderDate.isEmpty() || orderType.isEmpty()){
                throw new RuntimeException("All fields must be filled!");
            }
            int xLocationInt = Integer.parseInt(xLocation);
            int yLocationInt = Integer.parseInt(yLocation);
            if(xLocationInt < zoneSystem.MIN_COORDINATE || yLocationInt < zoneSystem.MIN_COORDINATE){
                throw new RuntimeException("X and Y coordinate must be at least " + zoneSystem.MIN_COORDINATE);
            }
            if(xLocationInt > zoneSystem.MAX_COORDINATE || yLocationInt > zoneSystem.MAX_COORDINATE){
                throw new RuntimeException("X and Y coordinate must be maximum " + zoneSystem.MAX_COORDINATE);
            }
            request.getSession(true).setAttribute(Constants.X_COORDINATE, xLocationInt);
            request.getSession(true).setAttribute(Constants.Y_COORDINATE, yLocationInt);
            request.getSession(true).setAttribute(Constants.ORDER_DATE, orderDate);
            request.getSession(true).setAttribute(Constants.ORDER_TYPE, orderType);
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
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Save order date,type and location";
    }// </editor-fold>
}
