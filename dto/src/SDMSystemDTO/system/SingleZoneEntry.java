package SDMSystemDTO.system;

public class SingleZoneEntry {
    private final String zoneOwner;
    private final String zone;
    private final int kindOfProducts;
    private final int numberOfStores;
    private final int numberOfOrders;
    private final float avgOrderCost;

    public SingleZoneEntry(String zoneOwner,
                           String zone,
                           int kindOfProducts,
                           int numberOfStores,
                           int numberOfOrders,
                           float avgOrderCost) {
        this.zoneOwner = zoneOwner;
        this.zone = zone;
        this.kindOfProducts = kindOfProducts;
        this.numberOfStores = numberOfStores;
        this.numberOfOrders = numberOfOrders;
        this.avgOrderCost = avgOrderCost;
    }

    public String getZoneOwner() {
        return zoneOwner;
    }

    public String getZone() {
        return zone;
    }

    public int getKindOfProducts() {
        return kindOfProducts;
    }

    public int getNumberOfStores() {
        return numberOfStores;
    }

    public int getNumberOfOrders() {
        return numberOfOrders;
    }

    public float getAvgOrderCost() {
        return avgOrderCost;
    }
}
