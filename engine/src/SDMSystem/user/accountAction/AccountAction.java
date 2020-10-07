package SDMSystem.user.accountAction;

import SDMSystemDTO.user.DTOAccountAction.AccountActionType;

import java.time.LocalDate;

public class AccountAction {
    private AccountActionType accountActionType;
    private LocalDate actionDate;
    private float accountSum;
    private float accountMoneyBeforeAction;
    private float accountMoneyAfterAction;

    public AccountAction(AccountActionType accountActionType,
                         LocalDate actionDate,
                         float accountSum,
                         float accountMoneyBeforeAction,
                         float accountMoneyAfterAction) {
        this.accountActionType = accountActionType;
        this.actionDate = actionDate;
        this.accountSum = accountSum;
        this.accountMoneyBeforeAction = accountMoneyBeforeAction;
        this.accountMoneyAfterAction = accountMoneyAfterAction;
    }
}
