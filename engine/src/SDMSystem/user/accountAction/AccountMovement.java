package SDMSystem.user.accountAction;

import SDMSystemDTO.user.DTOAccountAction.AccountActionType;
import SDMSystemDTO.user.DTOAccountAction.DTOAccountMovement;

import java.time.LocalDate;

public class AccountMovement {
    private AccountActionType accountActionType;
    private LocalDate actionDate;
    private float accountSum;
    private float accountMoneyBeforeAction;
    private float accountMoneyAfterAction;

    public AccountMovement(AccountActionType accountActionType,
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

    public DTOAccountMovement getDTOAccountMovement() {
        return new DTOAccountMovement(
                accountActionType.toString(),
                actionDate,
                accountSum,
                accountMoneyBeforeAction,
                accountMoneyAfterAction
        );
    }
}
