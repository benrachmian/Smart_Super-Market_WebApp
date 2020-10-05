package SDMSystemDTO.user;

import SDMSystemDTO.user.DTOAccountAction.DTOAccountAction;

import java.util.Collection;

public abstract class DTOUser {

    protected String username;
    protected final int serialNumber;
    protected Collection<DTOAccountAction> accountActions;
    protected float moneyInAccount;

    public DTOUser(String username, int serialNumber, Collection<DTOAccountAction> accountActions, float moneyInAccount) {
        this.username = username;
        this.serialNumber = serialNumber;
        this.accountActions = accountActions;
        this.moneyInAccount = moneyInAccount;
    }

    public String getUsername() {
        return username;
    }

    public int getSerialNumber() {
        return serialNumber;
    }

    public Collection<DTOAccountAction> getAccountActions() {
        return accountActions;
    }

    public float getMoneyInAccount() {
        return moneyInAccount;
    }
}
