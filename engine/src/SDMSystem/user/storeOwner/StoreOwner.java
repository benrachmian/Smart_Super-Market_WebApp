package SDMSystem.user.storeOwner;

import SDMSystem.order.Order;
import SDMSystem.store.Store;
import SDMSystem.user.User;
import SDMSystem.user.accountAction.AccountMovement;
import SDMSystemDTO.order.DTOOrder;
import SDMSystemDTO.user.DTOAccountAction.AccountActionType;
import feedback.Feedback;

import java.time.LocalDate;
import java.util.*;

public class StoreOwner extends User {
    //key: storeId, value: store
    private Map<Integer, Store> ownedStores;
    private ArrayList<Order> ordersFromUser;
    //key: store id, value: the feedbacks the stores got
    private Map<Integer, Collection<Feedback>> feedbacks;

    public StoreOwner(String username) {
        super(username);
        ownedStores = new HashMap<>();
        ordersFromUser = new ArrayList<>();
        feedbacks = new HashMap<>();
    }
    public void addNewStore(Store storeToAdd){
        ownedStores.put(storeToAdd.getSerialNumber(),storeToAdd);
    }

    public void addOrder(Order order){
        ordersFromUser.add(order);
    }

    public ArrayList<DTOOrder> getNewOrdersFromUser(int fromIndex){
        ArrayList<DTOOrder> res = new ArrayList<>();
        if (fromIndex < 0 || fromIndex > ordersFromUser.size()) {
            fromIndex = 0;
        }
        List<Order> newOrders =  ordersFromUser.subList(fromIndex,ordersFromUser.size());
        for(Order order : newOrders){
            res.add(order.createDTOOrderFromOrder());
        }
        return res;
    }

    public void orderFromTransaction(LocalDate orderDate, float transactionSum){
        accountMovements.add(new AccountMovement(
                AccountActionType.PAYMENT_RECEIVE,
                orderDate,
                transactionSum,
                moneyInAccount,
                moneyInAccount + transactionSum
        ));
        moneyInAccount += transactionSum;
    }

    public Map<Integer, Store> getOwnedStores() {
        return ownedStores;
    }

    public ArrayList<Order> getOrdersFromUser() {
        return ordersFromUser;
    }

    public void giveFeedback(int storeSerialNumber, Feedback feedback){
        //first feedback to store
        if(feedbacks.get(storeSerialNumber) == null){
            feedbacks.put(storeSerialNumber,new LinkedList<>());
        }
        feedbacks.get(storeSerialNumber).add(feedback);
    }

}
