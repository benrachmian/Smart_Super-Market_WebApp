package SDMSystem.system.usersInSystem;

import SDMSystem.user.User;
import SDMSystem.user.customer.Customer;
import SDMSystem.user.storeOwner.StoreOwner;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class UsersInSystem {
    private Map<String,User> usersInSystem;
    private Map<Integer,Customer> customersInSystem;
    private Map<Integer,StoreOwner> storeOwnersInSystem;

    public UsersInSystem() {
        usersInSystem = new HashMap<>();
        customersInSystem = new HashMap<>();
        storeOwnersInSystem = new HashMap<>();
    }

    public Customer getCustomer(int customerSerialNumber) {
        return customersInSystem.get(customerSerialNumber);
    }

    public Map<String, User> getUsersInSystem() {
        return usersInSystem;
    }

    public Map<Integer, Customer> getCustomersInSystem() {
        return customersInSystem;
    }

    public Map<Integer, StoreOwner> getStoreOwnersInSystem() {
        return storeOwnersInSystem;
    }

    public void addUser(String username, String userRole) {
        User user = null;
        if(userRole.equals("customer")){
           user = new Customer(username);
           customersInSystem.put(user.getSerialNumber(),(Customer)user)       ;
        }
        else{
            user = new StoreOwner(username);
            storeOwnersInSystem.put(user.getSerialNumber(),(StoreOwner)user);
        }
        usersInSystem.put(username,user);
    }
}
