package SupplyStationsSimulation.Statistics;

import SupplyStationsSimulation.Agents.BehaviourType;
import SupplyStationsSimulation.Agents.Type;
import SupplyStationsSimulation.Utilities.Locations.Position;

public class SupplyStationInfo extends AgentInfo {

    private double price;
    private int ticksToFuel;
    private int totalRequests;
    private BehaviourType behaviourType;
    private int fuelSold;
    private int waitingLine;
    private int attending;
    private int totalGasPumps;

    public SupplyStationInfo(double price, int ticksToFuel, int totalRequests, BehaviourType behaviourType, int fuelSold, int waitingLine, int attending, int totalGasPumps) {
        this.behaviourType = BehaviourType.DYNAMIC;
        this.price = price;
        this.ticksToFuel = ticksToFuel;
        this.totalRequests = totalRequests;
        this.fuelSold = fuelSold;
        this.waitingLine = waitingLine;
        this.attending = attending;
        this.totalGasPumps = totalGasPumps;
    }

    public double getPrice() {
        return price;
    }

    public int getTicksToFuel() {
        return ticksToFuel;
    }

    public int getTotalRequests() {
        return totalRequests;
    }

    @Override
    public Type getType() {
        return super.getType();
    }

    @Override
    public BehaviourType getBehaviourType() {
        return this.behaviourType;
    }

    @Override
    public Position getLocation() {
        return this.location;
    }

    @Override
    public String toString() {
        return behaviourType.getValue() +
                "," + price +
                "," + ticksToFuel +
                "," + totalRequests +
                "," + waitingLine +
                "," + attending +
                "," + totalGasPumps +
                "," + fuelSold ;

    }
}
