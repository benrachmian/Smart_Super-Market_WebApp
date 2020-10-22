package sdm.utils;


import SDMSystem.system.SDMSystem;
import SDMSystemDTO.order.DTOOrder;
import chat.ChatManager;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static sdm.constants.Constants.INT_PARAMETER_ERROR;

public class ServletUtils {

    private static final String SDM_SYSTEM_MANAGER_ATTRIBUTE_NAME = "sdmSystemManager";
    private static final String USERS_STORES_ORDERS_ATTRIBUTE_NAME = "usersStoresOrders";
    private static final String NUM_OF_ZONE_IN_TABLE_ATTRIBUTE_NAME = "numOfZonesInTable";
    private static final String CHAT_MANAGER_ATTRIBUTE_NAME = "chatManager";


    private static final Object sdmSystemManagerLock = new Object();
    private static final Object usersAlertManagerLock = new Object();
    private static final Object numOfZonesLock = new Object();
    private static final Object chatManagerLock = new Object();


    public static SDMSystem getSDMSystem(ServletContext servletContext) {
        synchronized (sdmSystemManagerLock) {
            if (servletContext.getAttribute(SDM_SYSTEM_MANAGER_ATTRIBUTE_NAME) == null) {
                servletContext.setAttribute(SDM_SYSTEM_MANAGER_ATTRIBUTE_NAME, new SDMSystem());
            }
        }
        return (SDMSystem) servletContext.getAttribute(SDM_SYSTEM_MANAGER_ATTRIBUTE_NAME);
    }

    public static Map<String, ArrayList<DTOOrder>> getUsersStoreOrdersMap(ServletContext servletContext) {
        synchronized (usersAlertManagerLock) {
            if (servletContext.getAttribute(USERS_STORES_ORDERS_ATTRIBUTE_NAME) == null) {
                servletContext.setAttribute(USERS_STORES_ORDERS_ATTRIBUTE_NAME, new HashMap<>());
            }
        }
        return (Map<String, ArrayList<DTOOrder>>) servletContext.getAttribute(USERS_STORES_ORDERS_ATTRIBUTE_NAME);
    }

//    public static int getNumOfZonesInTable(ServletContext servletContext) {
//        synchronized (numOfZonesLock){
//            if (servletContext.getAttribute(NUM_OF_ZONE_IN_TABLE_ATTRIBUTE_NAME) == null) {
//                servletContext.setAttribute(NUM_OF_ZONE_IN_TABLE_ATTRIBUTE_NAME, 0);
//            }
//        }
//        return (int)servletContext.getAttribute(NUM_OF_ZONE_IN_TABLE_ATTRIBUTE_NAME);
//    }

    public static int getIntParameter(HttpServletRequest request, String zonesTableVersionParameter) {
        String value = request.getParameter(zonesTableVersionParameter);
        if (value != null) {
            try {
                return Integer.parseInt(value);
            } catch (NumberFormatException numberFormatException) {
            }
        }
        return INT_PARAMETER_ERROR;
    }

    public static ChatManager getChatManager(ServletContext servletContext) {
        synchronized (chatManagerLock) {
            if (servletContext.getAttribute(CHAT_MANAGER_ATTRIBUTE_NAME) == null) {
                servletContext.setAttribute(CHAT_MANAGER_ATTRIBUTE_NAME, new ChatManager());
            }
        }
        return (ChatManager) servletContext.getAttribute(CHAT_MANAGER_ATTRIBUTE_NAME);
    }

//    public static void updateNumOfZones(ServletContext servletContext, int newNum) {
//        synchronized (numOfZonesLock){
//                servletContext.setAttribute(NUM_OF_ZONE_IN_TABLE_ATTRIBUTE_NAME, newNum);
//        }
//    }
}

