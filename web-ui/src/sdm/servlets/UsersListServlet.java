package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.user.User;
import SDMSystem.user.customer.Customer;
import com.google.gson.Gson;
import sdm.utils.ServletUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.LinkedList;
import java.util.Map;
import java.util.Set;

public class UsersListServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
            Map<String, User> usersFromSystem = sdmSystemManager.getUsersList();
            Collection<UserAndRole> usersList = makeUsersFromSystemToUserAndRoleCollection(usersFromSystem);
            String json = gson.toJson(usersList);
            out.println(json);
            out.flush();
        }
    }

    private Collection<UserAndRole> makeUsersFromSystemToUserAndRoleCollection(Map<String, User> usersFromSystem) {
        Collection usersList = new LinkedList();
        for(User user : usersFromSystem.values()){
            if(user instanceof Customer){
                usersList.add(new UserAndRole(user.getUsername(),"Customer"));
            }
            else{
                usersList.add(new UserAndRole(user.getUsername(),"Store Owner"));
            }
        }

        return usersList;
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
        return "get user list";
    }// </editor-fold>

    private class UserAndRole {
        private final String username;
        private final String role;

        public UserAndRole(String username, String role) {
            this.username = username;
            this.role = role;
        }
    }
}
