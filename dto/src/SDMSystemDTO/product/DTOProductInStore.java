package SDMSystemDTO.product;



public class DTOProductInStore extends DTOProduct implements  IDTOProductInStore{
    private final float price;
    private float amountSoldInStore;
    private final int storeTheProductBelongsID;

    public DTOProductInStore(int productSerialNumber,
                             String productName,
                             String wayOfBuying,
                             //Collection<DTOStore> storesSellingTheProduct,
                             float amountSoldInAllStores,
                             float price,
                             float amountSoldInStore,
                             int storeTheProductBelongsID,
                             int numOfStoresSellingTheProduct,
                             float avgPrice) {
        super(productSerialNumber, productName, wayOfBuying, /*storesSellingTheProduct*/ amountSoldInAllStores,numOfStoresSellingTheProduct,avgPrice);
        this.price = price;
        this.amountSoldInStore = amountSoldInStore;
        this.storeTheProductBelongsID = storeTheProductBelongsID;
    }


    public int getStoreTheProductBelongsID() {
        return storeTheProductBelongsID;
    }

    public float getPrice() {
        return price;
    }

    @Override
    public int getSerialNumber() {
        return productSerialNumber;
    }

    public float getAmountSoldInStore() {
        return amountSoldInStore;
    }

    public void setAmountSoldInStore(float amountSoldInStore) {
        this.amountSoldInStore = amountSoldInStore;
    }
}

