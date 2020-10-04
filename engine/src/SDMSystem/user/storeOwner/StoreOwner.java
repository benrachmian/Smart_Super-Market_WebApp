package SDMSystem.user.storeOwner;

import SDMSystem.store.Store;
import SDMSystem.user.User;

import java.util.Map;

public class StoreOwner extends User {
    private Map<String, Store> ownedStores;

    public StoreOwner(String username) {
        super(username);
    }
}
