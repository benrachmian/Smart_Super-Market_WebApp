package SDMSystem.user.customer;


import SDMSystem.order.Order;
import SDMSystem.user.User;
import SDMSystem.user.accountAction.AccountMovement;
import SDMSystem.user.storeOwner.StoreOwner;
import SDMSystemDTO.user.DTOAccountAction.AccountActionType;

import java.time.LocalDate;
import java.util.Collection;
import java.util.LinkedList;

public class Customer extends User {

    //private static int generatedSerialNumber = 1000;
    private Collection<Order> ordersMade;

    public Customer(String username, float money) {
        super(username);
        this.ordersMade = new LinkedList<>();
        this.moneyInAccount = money;
    }


    public Collection<Order> getOrdersMade() {
        return ordersMade;
    }
    public void addOrder(Order newOrder) {
        ordersMade.add(newOrder);
    }

    public synchronized void makeNewOrderTransaction(LocalDate orderDate, float transactionSum, StoreOwner storeOwner){
        accountMovements.add(new AccountMovement(
                AccountActionType.PAYMENT_TRANSFERENCE,
                orderDate,
                transactionSum,
                moneyInAccount,
                (moneyInAccount - transactionSum)
        ));
        moneyInAccount -= transactionSum;
        storeOwner.orderFromTransaction(orderDate,transactionSum);
    }
}
