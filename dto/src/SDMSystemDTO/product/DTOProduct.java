package SDMSystemDTO.product;

public class DTOProduct {

    protected int productSerialNumber;
    protected String productName;
    protected String wayOfBuying;
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
    public DTOProduct(){

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

    public void setAmountSoldInAllStores(float amountSoldInAllStores) {
        this.amountSoldInAllStores = amountSoldInAllStores;
    }

    public int getNumOfStoresSellingTheProduct() {
        return numOfStoresSellingTheProduct;
    }

    public void setNumOfStoresSellingTheProduct(int numOfStoresSellingTheProduct) {
        this.numOfStoresSellingTheProduct = numOfStoresSellingTheProduct;
    }

    public float getAvgPrice() {
        return avgPrice;
    }

    public void setAvgPrice(float avgPrice) {
        this.avgPrice = avgPrice;
    }
}
