package SDMSystem.user;

import SDMSystem.HasSerialNumber;
import SDMSystem.user.accountAction.AccountAction;

import java.util.Collection;
import java.util.LinkedList;

public abstract class User implements HasSerialNumber<Integer> {
    private static int generatedSerialNumber = 1000;
    protected String username;
    protected final int serialNumber;
    protected Collection<AccountAction> accountActions;
    protected float moneyInAccount;

    public User(String username) {
        this.username = username;
        this.moneyInAccount = moneyInAccount;
        this.serialNumber = ++generatedSerialNumber;
        this.accountActions = new LinkedList<>();
    }

    @Override
    public Integer getSerialNumber() {
        return serialNumber;
    }
}
