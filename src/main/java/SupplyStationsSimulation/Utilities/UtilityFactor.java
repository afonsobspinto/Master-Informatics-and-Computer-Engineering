package SupplyStationsSimulation.Utilities;

import SupplyStationsSimulation.Utilities.Locations.EuclideanDistance;
import SupplyStationsSimulation.Utilities.Locations.Position;

public class UtilityFactor {
    private Position supplyStationPosition;
    private double pricePerLiter;
    private Position driverPosition;
    private double priceIntolerance;
    private int ticksToFuel;


    public UtilityFactor(SupplyStationInfo supplyStationInfo, Position driverPosition, double priceIntolerance) {
        this.supplyStationPosition = supplyStationInfo.getLocation();
        this.driverPosition = driverPosition;
        this.priceIntolerance = priceIntolerance;
        this.ticksToFuel = supplyStationInfo.getTicksToFuel();
        this.pricePerLiter = supplyStationInfo.getPricePerLiter();
    }

    public double getUtility(){
        return  Math.ceil(new EuclideanDistance().getDistance(driverPosition.getX(), driverPosition.getY(), supplyStationPosition.getX(), supplyStationPosition.getY()) +
                pricePerLiter * priceIntolerance + ticksToFuel);
    }
}
