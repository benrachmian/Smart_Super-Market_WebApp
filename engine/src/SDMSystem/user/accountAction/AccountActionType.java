package SDMSystem.user.accountAction;

public enum AccountActionType {
    CHARGE {
        @Override
        public String toString() {
            return "Charge";
        }
    }, PAYMENT_RECEIVE {
        @Override
        public String toString() {
            return "Payment receive";
        }
    }, PAYMENT_TRANSFERENCE {
        @Override
        public String toString() {
            return "Payment transference";
        }
    }
}
