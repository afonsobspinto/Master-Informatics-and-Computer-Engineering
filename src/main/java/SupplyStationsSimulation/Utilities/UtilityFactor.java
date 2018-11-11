package SupplyStationsSimulation.Utilities;

import SupplyStationsSimulation.Utilities.Locations.EuclideanDistance;
import SupplyStationsSimulation.Utilities.Locations.Position;
import jade.core.AID;

public class UtilityFactor {
    private Position supplyStationPosition;
    private double pricePerLiter;
    private Position driverPosition;
    private Position targetPosition;
    private double priceIntolerance;
    private int ticksToFuel;
    private AID aid;


    public UtilityFactor(SupplyStationInfo supplyStationInfo, Position driverPosition, double priceIntolerance, Position targetPosition) {
        this.supplyStationPosition = supplyStationInfo.getLocation();
        this.driverPosition = driverPosition;
        this.targetPosition = targetPosition;
        this.priceIntolerance = priceIntolerance;
        this.ticksToFuel = supplyStationInfo.getTicksToFuel();
        this.pricePerLiter = supplyStationInfo.getPricePerLiter();
        this.aid = supplyStationInfo.getAid();
    }

    public double getUtility(){
        return  Math.ceil(new EuclideanDistance().getDistance(driverPosition.getX(), driverPosition.getY(), supplyStationPosition.getX(), supplyStationPosition.getY()) +
                new EuclideanDistance().getDistance(supplyStationPosition.getX(), supplyStationPosition.getY(), targetPosition.getX(), targetPosition.getY()) +
                pricePerLiter * priceIntolerance + ticksToFuel);
    }

    public AID getAid() {
        return aid;
    }
}
