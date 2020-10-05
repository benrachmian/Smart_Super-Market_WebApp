package SDMSystem.system;

import SDMSystem.discount.Discount;
import SDMSystem.location.Locationable;
import SDMSystem.system.usersInSystem.UsersInSystem;
import SDMSystem.user.User;
import SDMSystem.user.customer.Customer;
import SDMSystem.user.storeOwner.StoreOwner;
import xml.XMLHelper;
import xml.generated.SuperDuperMarketDescriptor;

import javax.xml.bind.JAXBException;
import java.awt.*;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

//Use it as Singleton
public class SDMSystem {

    private static SDMSystem single_Instance = null;
    private UsersInSystem usersInSystem;
    //key: zone, value: system
    private Map<String, SDMSystemInZone> systemsInZoneMap;

    public SDMSystem() {
        usersInSystem = new UsersInSystem();
        systemsInZoneMap = new HashMap<>();
    }

    public static SDMSystem getInstance(){
        if(single_Instance == null){
            single_Instance = new SDMSystem();
        }
        return single_Instance;
    }

    public void loadSystemWithFilePath(String filePath, StoreOwner storeOwner) throws FileNotFoundException, JAXBException {
        SuperDuperMarketDescriptor superDuperMarketDescriptor = XMLHelper.FromXmlFileToObject(filePath);
        systemsInZoneMap.get(superDuperMarketDescriptor.getSDMZone().getName()).loadSystem(superDuperMarketDescriptor,storeOwner);
    }

    public void loadSystemWithInputStream(InputStream xmlStream, String storeOwnerUserName) throws FileNotFoundException, JAXBException {
        StoreOwner storeOwner = usersInSystem.getStoreOwnersInSystem().get(storeOwnerUserName);
        SuperDuperMarketDescriptor superDuperMarketDescriptor = XMLHelper.deserializeFrom(xmlStream);
        String zone = superDuperMarketDescriptor.getSDMZone().getName();
        SDMSystemInZone sdmSystemInZone =  systemsInZoneMap.get(zone);
        //new zone
        if(sdmSystemInZone == null){
            sdmSystemInZone = SDMSystemInZone.getInstance();
            sdmSystemInZone.loadSystem(superDuperMarketDescriptor,storeOwner);
            systemsInZoneMap.put(zone, sdmSystemInZone);
        }
        //exist zone
        else{
            throw new RuntimeException("There is already such zone in the system!");
        }
    }

    public Customer getCustomer(String  customerUserName) {
        return usersInSystem.getCustomer(customerUserName);
    }

    public boolean isUserExists(String usernameFromParameter) {
        return usersInSystem.getUsersInSystem().containsKey(usernameFromParameter);
    }

    public synchronized void addUser(String username, String userRole) {
        usersInSystem.addUser(username,userRole);
    }

    public Map<String, User> getUsersList() {
        return usersInSystem.getUsersInSystem();
    }
}
