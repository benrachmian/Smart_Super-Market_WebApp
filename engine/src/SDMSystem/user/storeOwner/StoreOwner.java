package SDMSystem.user.storeOwner;

import SDMSystem.order.Order;
import SDMSystem.store.Store;
import SDMSystem.system.SDMSystemInZone;
import SDMSystem.user.User;
import SDMSystem.user.accountAction.AccountMovement;
import SDMSystemDTO.feedback.DTOFeedback;
import SDMSystemDTO.order.DTOOrder;
import SDMSystemDTO.store.DTOStore;
import SDMSystemDTO.user.DTOAccountAction.AccountActionType;
import feedback.Feedback;

import java.beans.FeatureDescriptor;
import java.time.LocalDate;
import java.util.*;

public class StoreOwner extends User {
    //key: storeId, value: store
    private Map<Integer, Store> ownedStores;
    private ArrayList<Order> ordersFromUser;
    private ArrayList<Feedback> feedbacks;
    //key: zone name, value: feedbacks in zone
    private Map<String,ArrayList<Feedback>> feedbacksByZone;
    //key: zone name, value: zone
    private ArrayList<Store> storesInUserZones;
    public StoreOwner(String username) {
        super(username);
        ownedStores = new HashMap<>();
        ordersFromUser = new ArrayList<>();
        feedbacks = new ArrayList<>();
        feedbacksByZone = new HashMap<>();
        storesInUserZones = new ArrayList<>();
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

    public ArrayList<DTOStore> getNewStoresFromUser(int fromIndex) {
        ArrayList<DTOStore> res = new ArrayList<>();
        if (fromIndex < 0 || fromIndex > storesInUserZones.size()) {
            fromIndex = 0;
        }
        List<Store> newStores =  storesInUserZones.subList(fromIndex,storesInUserZones.size());
        for(Store store : newStores){
            res.add(store.createDTOStore());
        }
        return res;
    }

    public int getNumOfStoresInZones(){
        return storesInUserZones.size();
    }

    public void addNewStoreToUserZone(Store newStore){
        storesInUserZones.add(newStore);
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


    public synchronized void orderFromTransaction(LocalDate orderDate, float transactionSum){
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
        ArrayList<Feedback> feedbacks = feedbacksByZone.get(zone);
        if(feedbacks == null){
            throw new RuntimeException("There are no feedbacks yet!");
        }
        for(Feedback feedback : feedbacks){
            zoneFeedbacksDTO.add(feedback.createDTOFeedbackFromFeedback());
        }

        return zoneFeedbacksDTO;
    }


}
