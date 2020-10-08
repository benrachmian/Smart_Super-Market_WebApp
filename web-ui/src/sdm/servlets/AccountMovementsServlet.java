package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystemDTO.user.DTOAccountAction.DTOAccountMovement;
import com.google.gson.Gson;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;

public class AccountMovementsServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("application/json");
        Collection<DTOAccountMovement> userAccountMovements;
        try {
            SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
            String username = SessionUtils.getUsername(request);
            synchronized (getServletContext()) {
                userAccountMovements = sdmSystemManager.getUserAccountMovements(username);
            }
            if(userAccountMovements.size() == 0){
                throw new RuntimeException("You still have no movements in your account!");
            }
            Gson gson = new Gson();
            String jsonResponse = gson.toJson(userAccountMovements);

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
        return "Get account movements";
    }// </editor-fold>
}
