package SDMSystemDTO.user.customer;


import SDMSystemDTO.order.DTOOrder;
import SDMSystemDTO.user.DTOAccountAction.DTOAccountAction;
import SDMSystemDTO.user.DTOUser;

import java.util.Collection;

public class DTOCustomer extends DTOUser {
    private final Collection<DTOOrder> ordersMade;

    public DTOCustomer(String username,
                       int serialNumber,
                       Collection<DTOAccountAction> accountActions,
                       float moneyInAccount,
                       Collection<DTOOrder> ordersMade) {
        super(username, serialNumber, accountActions, moneyInAccount);
        this.ordersMade = ordersMade;
    }

    public Collection<DTOOrder> getOrdersMade() {
        return ordersMade;
    }
}


