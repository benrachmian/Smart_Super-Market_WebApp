package SDMSystem.system.usersInSystem;

import SDMSystem.user.User;
import SDMSystem.user.customer.Customer;
import SDMSystem.user.storeOwner.StoreOwner;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class UsersInSystem {
    private Map<String,User> usersInSystem;
    private Map<String,Customer> customersInSystem;
    private Map<String,StoreOwner> storeOwnersInSystem;

    public UsersInSystem() {
        usersInSystem = new HashMap<>();
        customersInSystem = new HashMap<>();
        storeOwnersInSystem = new HashMap<>();
    }

    public Customer getCustomer(String  customerUserName) {
        return customersInSystem.get(customerUserName);
    }

    public Map<String, User> getUsersInSystem() {
        return usersInSystem;
    }

    public Map<String, Customer> getCustomersInSystem() {
        return customersInSystem;
    }

    public Map<String, StoreOwner> getStoreOwnersInSystem() {
        return storeOwnersInSystem;
    }

    public void addUser(String username, String userRole) {
        User user = null;
        if(userRole.equals("customer")){
           user = new Customer(username);
           customersInSystem.put(user.getUsername(),(Customer)user)       ;
        }
        else{
            user = new StoreOwner(username);
            storeOwnersInSystem.put(user.getUsername(),(StoreOwner)user);
        }
        usersInSystem.put(username,user);
    }

    public User getUser(String username) {
        return usersInSystem.get(username);
    }
}
