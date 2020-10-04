package SDMSystem.user.customer;


import SDMSystem.HasSerialNumber;
import SDMSystem.location.LocationUtility;
import SDMSystem.location.Locationable;
import SDMSystem.order.Order;
import SDMSystem.user.User;
import SDMSystemDTO.customer.DTOCustomer;
import SDMSystemDTO.order.DTOOrder;

import java.awt.*;
import java.util.Collection;
import java.util.LinkedList;

public class Customer extends User {

    //private static int generatedSerialNumber = 1000;
    private Collection<Order> ordersMade;

    public Customer(String username) {
        super(username);
        this.ordersMade = new LinkedList<>();
    }


    public Collection<Order> getOrdersMade() {
        return ordersMade;
    }
    public void addOrder(Order newOrder) {
        ordersMade.add(newOrder);
    }
}
