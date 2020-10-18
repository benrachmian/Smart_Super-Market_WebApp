package SDMSystem.user.storeOwner;

import SDMSystem.order.Order;
import SDMSystem.store.Store;
import SDMSystem.user.User;
import SDMSystem.user.accountAction.AccountMovement;
import SDMSystemDTO.feedback.DTOFeedback;
import SDMSystemDTO.order.DTOOrder;
import SDMSystemDTO.user.DTOAccountAction.AccountActionType;
import feedback.Feedback;
import javafx.util.Pair;

import java.time.LocalDate;
import java.util.*;

public class StoreOwner extends User {
    //key: storeId, value: store
    private Map<Integer, Store> ownedStores;
    private ArrayList<Order> ordersFromUser;
    private ArrayList<Feedback> feedbacks;
    //key: zone name, value: feedbacks in zone
    private Map<String,ArrayList<Feedback>> feedbacksByZone;
    private int numOfFeedbacks;

    public StoreOwner(String username) {
        super(username);
        ownedStores = new HashMap<>();
        ordersFromUser = new ArrayList<>();
        feedbacks = new ArrayList<>();
        feedbacksByZone = new HashMap<>();
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

    public ArrayList<DTOFeedback> getNewFeedbacksFromUser(int fromIndex){
        ArrayList<DTOFeedback> res = new ArrayList<>();
        if (fromIndex < 0 || fromIndex > feedbacks.size()) {
            fromIndex = 0;
        }
        List<Feedback> newFeedbacks =  feedbacks.subList(fromIndex,feedbacks.size());
        for(Feedback feedback : newFeedbacks){
            res.add(feedback.createDTOFeedbackFromFeedback());
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

    public void giveFeedback(String zone,Feedback feedback){
        feedbacks.add(feedback);
        ArrayList<Feedback> feedbacksOfZone = feedbacksByZone.get(zone);
        if(feedbacksOfZone == null){
            feedbacksByZone.put(zone,new ArrayList<>());
            feedbacksByZone.get(zone).add(feedback);
        }
        else{
            feedbacksOfZone.add(feedback);
        }
    }

    public int getFeedbacksAmount() {
        return feedbacks.size();
    }

    public Collection<DTOFeedback> getFeedbacksInZoneDTO(String zone) {
        Collection<DTOFeedback> zoneFeedbacksDTO = new LinkedList<>();
        for(Feedback feedback : feedbacksByZone.get(zone)){
            zoneFeedbacksDTO.add(feedback.createDTOFeedbackFromFeedback());
        }

        return zoneFeedbacksDTO;
    }
}
