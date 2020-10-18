package SDMSystemDTO.product;



public class DTOProductInStore extends DTOProduct implements  IDTOProductInStore{
    private float price;
    private float amountSoldInStore;
    private int storeTheProductBelongsID;
    private String storeTheProductBelongsName;
    private boolean isPartOfDiscount = false;


    public DTOProductInStore(int productSerialNumber,
                             String productName,
                             String wayOfBuying,
                             //Collection<DTOStore> storesSellingTheProduct,
                             float amountSoldInAllStores,
                             float price,
                             float amountSoldInStore,
                             int storeTheProductBelongsID,
                             int numOfStoresSellingTheProduct,
                             float avgPrice,
                             String storeTheProductBelongsName) {
        super(productSerialNumber, productName, wayOfBuying, /*storesSellingTheProduct*/ amountSoldInAllStores,numOfStoresSellingTheProduct,avgPrice);
        this.price = price;
        this.amountSoldInStore = amountSoldInStore;
        this.storeTheProductBelongsID = storeTheProductBelongsID;
        this.storeTheProductBelongsName = storeTheProductBelongsName;
    }

    public DTOProductInStore(){
        super();
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


