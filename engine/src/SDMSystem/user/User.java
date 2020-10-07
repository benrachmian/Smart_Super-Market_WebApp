package SDMSystem.user;

import SDMSystem.HasSerialNumber;
import SDMSystem.user.accountAction.AccountAction;
import SDMSystemDTO.user.DTOAccountAction.AccountActionType;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Date;
import java.util.LinkedList;

public abstract class User implements HasSerialNumber<Integer> {
    private static int generatedSerialNumber = 1000;
    protected String username;
    protected final int serialNumber;
    protected Collection<AccountAction> accountActions;
    protected float moneyInAccount;

    public User(String username) {
        this.username = username;
        this.moneyInAccount = 0;
        this.serialNumber = ++generatedSerialNumber;
        this.accountActions = new LinkedList<>();
    }

    @Override
    public Integer getSerialNumber() {
        return serialNumber;
    }

    public String getUsername() {
        return username;
    }

    public void chargeMoney(float money, String chargeDate) {
        float moneyBeforeCharge = moneyInAccount;
        moneyInAccount += money;
        accountActions.add(new AccountAction(
                AccountActionType.CHARGE,
                LocalDate.parse(chargeDate),
                money,
                moneyBeforeCharge,
                moneyInAccount));
    }
}
