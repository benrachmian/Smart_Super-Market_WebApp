package sdm.servlets;

import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import SDMSystemDTO.product.DTOProductInDiscount;
import SDMSystemDTO.product.IDTOProductInStore;
import SDMSystemDTO.pair.Pair;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.Map;

public class AddProductInDiscountToCartServlet extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        PrintWriter out = response.getWriter();
        SDMSystem sdmSystemManager = ServletUtils.getSDMSystem(getServletContext());
        String zone = SessionUtils.getChosenZone(request);
        SDMSystemInZone zoneSystem = sdmSystemManager.getZoneSystem(zone);
        String discountName = request.getParameter("discountName");
        int productInDiscountSerialNumber = Integer.parseInt(request.getParameter("productInDiscountSerialNumber"));
        Float productQuantity = Float.parseFloat(request.getParameter("productQuantity"));
        Map<Integer, Collection<Pair<IDTOProductInStore, Float>>> shoppingCart = SessionUtils.getShoppingCart(request);
        try {
            DTOProductInDiscount discountProduct = zoneSystem.getProductInDiscount(discountName,productInDiscountSerialNumber);
            shoppingCart.get(discountProduct.getStoreTheProductBelongsID()).add(new Pair<>(discountProduct,productQuantity));
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
