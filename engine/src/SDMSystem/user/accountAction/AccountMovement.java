package SDMSystem.user.accountAction;

import SDMSystemDTO.user.DTOAccountAction.AccountActionType;
import SDMSystemDTO.user.DTOAccountAction.DTOAccountMovement;

import java.time.LocalDate;

public class AccountMovement {
    private AccountActionType accountActionType;
    private LocalDate actionDate;
    private float transactionSum;
    private float accountMoneyBeforeAction;
    private float accountMoneyAfterAction;

    public AccountMovement(AccountActionType accountActionType,
                           LocalDate actionDate,
                           float transactionSum,
                           float accountMoneyBeforeAction,
                           float accountMoneyAfterAction) {
        this.accountActionType = accountActionType;
        this.actionDate = actionDate;
        this.transactionSum = transactionSum;
        this.accountMoneyBeforeAction = accountMoneyBeforeAction;
        this.accountMoneyAfterAction = accountMoneyAfterAction;
    }

    public DTOAccountMovement getDTOAccountMovement() {
        return new DTOAccountMovement(
                accountActionType.toString(),
                actionDate,
                transactionSum,
                accountMoneyBeforeAction,
                accountMoneyAfterAction
        );
    }
}
