package sdm.utils;


import SDMSystem.system.SDMSystem;

import javax.servlet.ServletContext;

public class ServletUtils {

    private static final String SDM_SYSTEM_MANAGER_ATTRIBUTE_NAME = "sdmSystemManager";

    private static final Object sdmSystemManagerLock = new Object();

    public static SDMSystem getSDMSystem(ServletContext servletContext) {
        synchronized (sdmSystemManagerLock) {
            if (servletContext.getAttribute(SDM_SYSTEM_MANAGER_ATTRIBUTE_NAME) == null) {
                servletContext.setAttribute(SDM_SYSTEM_MANAGER_ATTRIBUTE_NAME, new SDMSystem());
            }
        }
        return (SDMSystem) servletContext.getAttribute(SDM_SYSTEM_MANAGER_ATTRIBUTE_NAME);
    }

}
