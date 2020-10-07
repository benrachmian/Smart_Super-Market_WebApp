package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import SDMSystemDTO.system.SingleZoneEntry;
import com.google.gson.Gson;
import sdm.constants.Constants;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class NewZoneDataServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
        int numOfZonesInTable = SessionUtils.getNumOfZonesInTable(request);
        String username = SessionUtils.getUsername(request);
        if (username == null) {
            response.sendRedirect(request.getContextPath() + "/index.html");
        }

         /*
        verify chat version given from the user is a valid number. if not it is considered an error and nothing is returned back
        Obviously the UI should be ready for such a case and handle it properly
         */
//        int chatVersion = ServletUtils.getIntParameter(request, Constants.ZONES_TABLE_VERSION_PARAMETER);
//        if (chatVersion == Constants.INT_PARAMETER_ERROR) {
//            return;
//        }

        if(sdmSystemManager.getNumOfZones() > numOfZonesInTable){
            //SessionUtils.updateNumOfZones(getServletContext(),sdmSystemManager.getNumOfZones() - numOfZonesInTable);
            request.getSession(true).setAttribute(Constants.NUM_OF_ZONE,sdmSystemManager.getNumOfZones());
            List<SingleZoneEntry> zonesEntries;
            synchronized (getServletContext()) {
                zonesEntries = sdmSystemManager.getZonesEntries(numOfZonesInTable);
            }

            Gson gson = new Gson();
            String jsonResponse = gson.toJson(zonesEntries);

            try (PrintWriter out = response.getWriter()) {
                out.print(jsonResponse);
                out.flush();
            }
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
