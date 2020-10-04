package sdm.servlets;


import SDMSystem.system.SDMSystem;
import sdm.constants.Constants;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static sdm.constants.Constants.ROLE;
import static sdm.constants.Constants.USERNAME;

public class LoginServlet extends HttpServlet {

    private final String SIGN_UP_URL = "../signup/signup.html";
    private final String SIGN_UP_ERROR_URL = "/pages/signup/signup_after_error.jsp";
    private final String ZONE_AND_INFO_URL = "../zones-and-info/zones_and_info.html";



    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String usernameFromSession = SessionUtils.getUsername(request);
        SDMSystem sdmSystem = ServletUtils.getSDMSystem(getServletContext());
        if (usernameFromSession == null) {
            //user is not logged in yet
            String usernameFromParameter = request.getParameter(USERNAME);
            String userRoleFromParameter = request.getParameter(ROLE);
            if (usernameFromParameter == null
                    || usernameFromParameter.isEmpty()
                    || userRoleFromParameter == null
                    || userRoleFromParameter.isEmpty()
            ) {
                String errorMessage = "You must enter both username and role! ";
                request.setAttribute(Constants.ERROR, errorMessage);
                //no username in session and no username or role in parameter -
                //redirect back to the index page
                //this return an HTTP code back to the browser telling it to load
                getServletContext().getRequestDispatcher(SIGN_UP_ERROR_URL).forward(request, response);
            } else {
                //normalize the username value
                usernameFromParameter = usernameFromParameter.trim();

                synchronized (this) {
                    if (sdmSystem.isUserExists(usernameFromParameter)) {
                        String errorMessage = "Username " + usernameFromParameter + " already exists. Please enter a different username.";
                        request.setAttribute(Constants.ERROR, errorMessage);
                        getServletContext().getRequestDispatcher(SIGN_UP_ERROR_URL).forward(request, response);
                    } else {
                        //add the new user to the users list
                        sdmSystem.addUser(usernameFromParameter,userRoleFromParameter);
                        //set the username in a session so it will be available on each request
                        //the true parameter means that if a session object does not exists yet
                        //create a new one
                        request.getSession(true).setAttribute(Constants.USERNAME, usernameFromParameter);

                        //redirect the request to the chat room - in order to actually change the URL
                        System.out.println("On login, request URI is: " + request.getRequestURI());
                        response.sendRedirect(ZONE_AND_INFO_URL);
                    }
                }
            }
        } else {
            //user is already logged in
            response.sendRedirect(ZONE_AND_INFO_URL);
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


