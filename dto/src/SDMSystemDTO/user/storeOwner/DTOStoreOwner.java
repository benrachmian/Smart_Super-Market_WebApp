package SDMSystemDTO.user.storeOwner;

import SDMSystemDTO.store.DTOStore;
import SDMSystemDTO.user.DTOAccountAction.DTOAccountAction;
import SDMSystemDTO.user.DTOUser;

import java.util.Collection;
import java.util.Map;

public class DTOStoreOwner extends DTOUser {

    private Map<String, DTOStore> ownedStores;

    public DTOStoreOwner(String username,
                         int serialNumber,
                         Collection<DTOAccountAction> accountActions,
                         float moneyInAccount,
                         Map<String, DTOStore> ownedStores) {
        super(username, serialNumber, accountActions, moneyInAccount);
        this.ownedStores = ownedStores;
    }

    public Map<String, DTOStore> getOwnedStores() {
        return ownedStores;
    }
}
