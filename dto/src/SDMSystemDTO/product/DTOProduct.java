package SDMSystemDTO.product;

public class DTOProduct {

    protected final int productSerialNumber;
    protected final String productName;
    protected final String wayOfBuying;
   // protected Collection<DTOStore> storesSellingTheProduct = new LinkedList<>();
    protected float amountSoldInAllStores;
    protected int numOfStoresSellingTheProduct;
    protected float avgPrice;


    public DTOProduct(int productSerialNumber,
                      String productName,
                      String wayOfBuying,
                      //Collection<DTOStore> storesSellingTheProduct,
                      float amountSoldInAllStores,
                      int numOfStoresSellingTheProduct,
                      float avgPrice) {
        this.productSerialNumber = productSerialNumber;
        this.productName = productName;
        this.wayOfBuying = wayOfBuying;
        //this.storesSellingTheProduct = null;
        this.amountSoldInAllStores = amountSoldInAllStores;
        this.numOfStoresSellingTheProduct = numOfStoresSellingTheProduct;
        this.avgPrice = avgPrice;
    }

    @Override
    public String toString() {
        return productName + ", ID:" + productSerialNumber;
    }

    public int getProductSerialNumber() {
        return productSerialNumber;
    }

    public String getProductName() {
        return productName;
    }

    public String getWayOfBuying() {
        return wayOfBuying;
    }

//    public Collection<DTOStore> getStoresSellingTheProduct() {
//        return storesSellingTheProduct;
//    }

    public float getAmountSoldInAllStores() {
        return amountSoldInAllStores;
    }

//    public int numberOfStoresSellingTheProduct() {
//        return storesSellingTheProduct.size();
//    }
}
