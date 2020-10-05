package SDMSystem.user.customer;


import SDMSystem.order.Order;
import SDMSystem.user.User;

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
