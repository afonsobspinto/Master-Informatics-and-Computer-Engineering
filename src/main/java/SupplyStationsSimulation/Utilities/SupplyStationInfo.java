package SupplyStationsSimulation.Utilities;

import SupplyStationsSimulation.Utilities.Locations.Position;
import jade.core.AID;

import java.util.Objects;
import java.util.Random;

public class SupplyStationInfo {

    private AID aid;
    private Position location;
    private double pricePerLiter;
    private static int maxTicksToFuelGuess = 100;
    private static int minTicksToFuelGuess = 8;
    private int ticksToFuel = new Random().nextInt(maxTicksToFuelGuess)+minTicksToFuelGuess;
    private Boolean isTicksGuess = true;
    private UtilityFactor utilityFactor;

    public SupplyStationInfo(AID aid, Position location, double pricePerLiter) {
        this.aid = aid;
        this.location = location;
        this.pricePerLiter = pricePerLiter;
    }

    public SupplyStationInfo(AID aid, Position location, double pricePerLiter, Position driverLocation, double priceIntolerance, Position destination) {
        this(aid, location, pricePerLiter);
        this.utilityFactor = new UtilityFactor(this,driverLocation, priceIntolerance, destination);
    }

    public SupplyStationInfo(AID aid, Position location, double pricePerLiter, Position driverLocation, double priceIntolerance, Position destination, int ticksToFuel) {
        this(aid, location, pricePerLiter);
        this.ticksToFuel = ticksToFuel;
        this.isTicksGuess = false;
        this.utilityFactor = new UtilityFactor(this,driverLocation, priceIntolerance, destination);
    }

    public Position getLocation() {
        return location;
    }

    public double getPricePerLiter() {
        return pricePerLiter;
    }

    public AID getAid() {
        return aid;
    }

    public UtilityFactor getUtilityFactor(){
        return utilityFactor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SupplyStationInfo that = (SupplyStationInfo) o;
        return Double.compare(that.pricePerLiter, pricePerLiter) == 0 &&
                Objects.equals(aid, that.aid) &&
                Objects.equals(location, that.location);
    }

    @Override
    public int hashCode() {
        return Objects.hash(aid, location, pricePerLiter);
    }

    public int getTicksToFuel() {
        return ticksToFuel;
    }

    public Boolean isTicksGuess() {
        return isTicksGuess;
    }


    @Override
    public String toString() {
        return "SupplyStationInfo{" +
                aid.getLocalName() +
                ", " + location +
                ", pricePerLiter=" + pricePerLiter +
                ", ticksToFuel=" + ticksToFuel + "(" + !isTicksGuess +")" +
                ", utilityFactor=" + utilityFactor +
                '}';
    }
}
