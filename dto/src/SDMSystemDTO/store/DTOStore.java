package SDMSystemDTO.store;


import SDMSystemDTO.discount.DTODiscount;
import SDMSystemDTO.product.DTOProductInStore;

import java.awt.*;
import java.util.Collection;
import java.util.Map;

public class DTOStore {
    private final Map<Integer, DTOProductInStore> productsInStore;
    private final Point storeLocation;
    private final float ppk;
    private final int storeSerialNumber;
    private final String storeName;
    //private Collection<DTOOrder> ordersFromStore;
    //private Collection<DTOFeedback> storeFeedbacks;
    private final float totalProfitFromDelivery;
    private final Collection<DTODiscount> storeDiscounts;
    private final int totalOrders;
    private final String storeOwner;
    private final float productsSoldCost;
    private final int numOfProductsKindsInStoreZone;
    private final int numOfProductsKindsInStore;

    @Override
    public String toString() {
        return storeName + ", ID:" + getStoreSerialNumber();
    }

    public DTOStore(Map<Integer, DTOProductInStore> productsInStore,
                    Point storeLocation,
                    float ppk,
                    int storeSerialNumber,
                    String storeName,
                    float totalProfitFromDelivery,
                    Collection<DTODiscount> storeDiscounts,
                    int totalOrders,
                    String storeOwner,
                    float productsSoldCost,
                    int numOfProductsKindsInStoreZone) {
        this.productsInStore = productsInStore;
        this.storeLocation = storeLocation;
        this.ppk = ppk;
        this.storeSerialNumber = storeSerialNumber;
        this.storeName = storeName;
        this.totalProfitFromDelivery = totalProfitFromDelivery;
        this.storeDiscounts = storeDiscounts;
        this.totalOrders = totalOrders;
        this.storeOwner = storeOwner;
        this.productsSoldCost = productsSoldCost;
        this.numOfProductsKindsInStoreZone = numOfProductsKindsInStoreZone;
        this.numOfProductsKindsInStore = productsInStore.size();
    }

    public Collection<DTODiscount> getStoreDiscounts() {
        return storeDiscounts;
    }

    public DTOProductInStore getProductFromStore(int productSerialNumber){
        return productsInStore.get(productSerialNumber);
    }


    public Map<Integer, DTOProductInStore> getProductsInStore() {
        return productsInStore;
    }

    public Point getStoreLocation() {
        return storeLocation;
    }

    public float getPpk() {
        return ppk;
    }

    public int getStoreSerialNumber() {
        return storeSerialNumber;
    }

    public String getStoreName() {
        return storeName;
    }

    public int getTotalOrders() {
        return totalOrders;
    }

    public float getTotalProfitFromDelivery() {
        return totalProfitFromDelivery;
    }




//    public DTOProductInStore getProductInStore(int chosenProductSerialNumber) {
//        DTOProductInStore askedProduct = productsInStore.get(chosenProductSerialNumber);
//        if(askedProduct == null){
//            throw new ExistenceException(false,chosenProductSerialNumber,"Product","Store");
//        }
//        return askedProduct;
//    }
}
