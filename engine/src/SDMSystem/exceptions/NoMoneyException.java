package SDMSystem.exceptions;

public class NoMoneyException extends RuntimeException {
    private String customerUserName;
    private float customerMoney;
    private float orderCost;

    public NoMoneyException(String customerUserName,
            float customerMoney,
            float orderCost){
        this.customerUserName = customerUserName;
        this.customerMoney = customerMoney;
        this.orderCost = orderCost;
    }

    @Override
    public String getMessage() {
        return "Customer " + customerUserName + " has no enough money for the order!";
    }

    public String getCustomerUserName() {
        return customerUserName;
    }

    public float getCustomerMoney() {
        return customerMoney;
    }

    public float getOrderCost() {
        return orderCost;
    }
}
