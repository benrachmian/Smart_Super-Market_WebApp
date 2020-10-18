package SDMSystem.user;

import SDMSystem.HasSerialNumber;
import SDMSystem.user.accountAction.AccountMovement;
import SDMSystem.user.storeOwner.StoreOwner;
import SDMSystemDTO.order.DTOOrder;
import SDMSystemDTO.user.DTOAccountAction.AccountActionType;
import SDMSystemDTO.user.DTOAccountAction.DTOAccountMovement;
import feedback.Feedback;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;

public abstract class User implements HasSerialNumber<Integer> {
    private static int generatedSerialNumber = 1000;
    protected String username;
    protected final int serialNumber;
    protected Collection<AccountMovement> accountMovements;
    protected float moneyInAccount;

    public User(String username) {
        this.username = username;
        this.moneyInAccount = 0;
        this.serialNumber = ++generatedSerialNumber;
        this.accountMovements = new LinkedList<>();
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
        accountMovements.add(new AccountMovement(
                AccountActionType.CHARGE,
                LocalDate.parse(chargeDate),
                money,
                moneyBeforeCharge,
                moneyInAccount));
    }

    public Collection<DTOAccountMovement> getAccountMovements(){
        Collection<DTOAccountMovement> accountMovements = new LinkedList<>();
        for(AccountMovement accountMovement : this.accountMovements){
            accountMovements.add(accountMovement.getDTOAccountMovement());
        }

        return accountMovements;
    }

    public float getMoneyInAccount() {
        return moneyInAccount;
    }


}
