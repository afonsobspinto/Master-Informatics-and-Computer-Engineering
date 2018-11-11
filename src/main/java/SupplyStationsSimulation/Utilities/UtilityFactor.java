package SupplyStationsSimulation.Utilities;

import SupplyStationsSimulation.Utilities.Locations.EuclideanDistance;
import SupplyStationsSimulation.Utilities.Locations.Position;
import jade.core.AID;

import java.util.Objects;

public class UtilityFactor {
    private Position supplyStationPosition;
    private double pricePerLiter;
    private Position driverPosition;
    private Position targetPosition;
    private double priceIntolerance;
    private int ticksToFuel;
    private Boolean isTicksGuess;
    private AID aid;
    private static int priceAmplifier = 50;


    public UtilityFactor(SupplyStationInfo supplyStationInfo, Position driverPosition, double priceIntolerance, Position targetPosition) {
        this.supplyStationPosition = supplyStationInfo.getLocation();
        this.driverPosition = driverPosition;
        this.targetPosition = targetPosition;
        this.priceIntolerance = priceIntolerance;
        this.ticksToFuel = supplyStationInfo.getTicksToFuel();
        this.isTicksGuess = supplyStationInfo.isTicksGuess();
        this.pricePerLiter = supplyStationInfo.getPricePerLiter();
        this.aid = supplyStationInfo.getAid();
    }

   public double getUtility() {
        return Math.ceil(new EuclideanDistance().getDistance(driverPosition.getX(), driverPosition.getY(), supplyStationPosition.getX(), supplyStationPosition.getY()) +
                new EuclideanDistance().getDistance(supplyStationPosition.getX(), supplyStationPosition.getY(), targetPosition.getX(), targetPosition.getY()) +
                (pricePerLiter * priceIntolerance) * priceAmplifier + ticksToFuel);
    }

    public AID getAid() {
        return aid;
    }


    @Override
    public String toString() {
        return "{" +
                "DistanceFrom=" + new EuclideanDistance().getDistance(driverPosition.getX(), driverPosition.getY(), supplyStationPosition.getX(), supplyStationPosition.getY()) +
                ", DistanceTo=" + new EuclideanDistance().getDistance(supplyStationPosition.getX(), supplyStationPosition.getY(), targetPosition.getX(), targetPosition.getY()) +
                ", pricePerLiter=" + pricePerLiter +
                ", priceIntolerance=" + priceIntolerance +
                ", ticksToFuel=" + ticksToFuel + "(" + !isTicksGuess +")" +
                ", Utility=" + this.getUtility() +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UtilityFactor that = (UtilityFactor) o;
        return Double.compare(that.pricePerLiter, pricePerLiter) == 0 &&
                Double.compare(that.priceIntolerance, priceIntolerance) == 0 &&
                ticksToFuel == that.ticksToFuel &&
                Objects.equals(supplyStationPosition, that.supplyStationPosition) &&
                Objects.equals(driverPosition, that.driverPosition) &&
                Objects.equals(targetPosition, that.targetPosition) &&
                Objects.equals(isTicksGuess, that.isTicksGuess) &&
                Objects.equals(aid, that.aid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(supplyStationPosition, pricePerLiter, driverPosition, targetPosition, priceIntolerance, ticksToFuel, isTicksGuess, aid);
    }

}
