package SDMSystemDTO.user.DTOAccountAction;

import java.time.LocalDate;

public class DTOAccountMovement {

    private String accountMovementType;
    private LocalDate movementDate;
    private float movementSum;
    private float accountMoneyBeforeAction;
    private float accountMoneyAfterAction;

    public DTOAccountMovement(String accountActionType, LocalDate actionDate, float accountSum, float accountMoneyBeforeAction, float accountMoneyAfterAction) {
        this.accountMovementType = accountActionType;
        this.movementDate = actionDate;
        this.movementSum = accountSum;
        this.accountMoneyBeforeAction = accountMoneyBeforeAction;
        this.accountMoneyAfterAction = accountMoneyAfterAction;
    }
}
