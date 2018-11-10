package SupplyStationsSimulation.Utilities;

import SupplyStationsSimulation.Utilities.Locations.Position;
import jade.core.AID;

import java.util.Objects;

public class SupplyStationInfo {

    private AID aid;
    private Position location;
    private double pricePerLiter;
    private int ticksToFuel;
    private UtilityFactor utilityFactor;

    public SupplyStationInfo(AID aid, Position location, double pricePerLiter) {
        this.aid = aid;
        this.location = location;
        this.pricePerLiter = pricePerLiter;
    }

    public SupplyStationInfo(AID aid, Position location, double pricePerLiter, Position driverLocation, double priceIntolerance) {
        this(aid, location, pricePerLiter);
        this.utilityFactor = new UtilityFactor(this,driverLocation, priceIntolerance);
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

    public void setTicksToFuel(int ticksToFuel) {
        this.ticksToFuel = ticksToFuel;
    }
}
