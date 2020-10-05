import SDMSystem.system.SDMSystem;
import SDMSystem.system.SDMSystemInZone;
import SDMSystem.system.usersInSystem.UsersInSystem;
import SDMSystem.user.customer.Customer;
import SDMSystem.user.storeOwner.StoreOwner;
import xml.XMLHelper;
import xml.generated.SuperDuperMarketDescriptor;

import javax.xml.bind.JAXBException;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Map;

public class SDMSystemManager {
    private static SDMSystemManager single_Instance = null;
    private UsersInSystem usersInSystem;
    //key: zone, value: system
    private Map<String, SDMSystemInZone> systemsInZoneMap;

    public SDMSystemManager() {
        usersInSystem = new UsersInSystem();
        systemsInZoneMap = new HashMap<>();
    }

    public static SDMSystemManager getInstance(){
        if(single_Instance == null){
            single_Instance = new SDMSystemManager();
        }
        return single_Instance;
    }

    public void loadSystem(String filePath, StoreOwner storeOwner) throws FileNotFoundException, JAXBException {
        SuperDuperMarketDescriptor superDuperMarketDescriptor = XMLHelper.FromXmlFileToObject(filePath);
        systemsInZoneMap.get(superDuperMarketDescriptor.getSDMZone().getName()).loadSystem(superDuperMarketDescriptor,storeOwner);
    }

    public Customer getCustomer(String customerUserName) {
        return usersInSystem.getCustomer(customerUserName);
    }

    public boolean isUserExists(String usernameFromParameter) {
        return usersInSystem.getUsersInSystem().containsKey(usernameFromParameter);
    }

    public synchronized void addUser(String username, String userRole) {
        usersInSystem.addUser(username,userRole);
    }
}
