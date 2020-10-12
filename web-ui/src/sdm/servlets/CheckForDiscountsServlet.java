package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import SDMSystemDTO.product.DTOProductInStore;
import SDMSystemDTO.product.IDTOProductInStore;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import javafx.util.Pair;
import sdm.constants.Constants;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CheckForDiscountsServlet  extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
        String zone = SessionUtils.getChosenZone(request);
        SDMSystemInZone zoneSystem = sdmSystemManager.getZoneSystem(zone);
        String storeId = request.getParameter("chosenStoreId");
        Map<Integer,Map<Integer,Pair<IDTOProductInStore, Float>>> shoppingCart = SessionUtils.getShoppingCart(request);
        try {
            if(zoneSystem.storeHasDiscountWithOneOfTheProducts(
                    Integer.parseInt(storeId),
                    shoppingCart.get(Integer.parseInt(storeId)).values())){
                out.print("true");
            }
            else{
                out.print("false");
            }

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
