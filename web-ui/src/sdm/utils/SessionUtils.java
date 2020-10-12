package sdm.utils;

import SDMSystemDTO.product.IDTOProductInStore;
import javafx.util.Pair;
import sdm.constants.Constants;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

public class SessionUtils {
    public static String getUsername (HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Object sessionAttribute = session != null ? session.getAttribute(Constants.USERNAME) : null;
        return sessionAttribute != null ? sessionAttribute.toString() : null;
    }

    public static String getRole (HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Object sessionAttribute = session != null ? session.getAttribute(Constants.ROLE) : null;
        return sessionAttribute != null ? sessionAttribute.toString() : null;
    }

    public static String getChosenZone (HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Object sessionAttribute = session != null ? session.getAttribute(Constants.CHOSEN_ZONE) : null;
        return sessionAttribute != null ? sessionAttribute.toString() : null;
    }

    public static Map<Integer,Map<Integer,Pair<IDTOProductInStore, Float>>> getShoppingCart (HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Object sessionAttribute = session != null ? session.getAttribute(Constants.SHOPPING_CART) : null;
        return sessionAttribute != null ? (Map)sessionAttribute : null;
    }

    public static void clearSession (HttpServletRequest request) {
        request.getSession().invalidate();
    }

    public static int getNumOfZonesInTable(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Object sessionAttribute = session != null ? session.getAttribute(Constants.NUM_OF_ZONES) : null;
        return sessionAttribute != null ? (int) sessionAttribute : null;
    }
}
