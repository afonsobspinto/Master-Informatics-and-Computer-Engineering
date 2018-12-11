package SupplyStationsSimulation.Statistics;

import SupplyStationsSimulation.Agents.BehaviourType;
import SupplyStationsSimulation.Agents.Type;
import SupplyStationsSimulation.Utilities.Locations.Position;

public class SupplyStationInfo extends AgentInfo {

    private double price;
    private int ticksToFuel;
    private int totalRequests;
    private int behaviourType;

    public SupplyStationInfo(double price, int ticksToFuel, int totalRequests, BehaviourType behaviourType) {
        if(behaviourType == BehaviourType.DYNAMIC)
            this.behaviourType = 2;
        else
            this.behaviourType = 3;
        this.price = price;
        this.ticksToFuel = ticksToFuel;
        this.totalRequests = totalRequests;
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
        return super.getBehaviourType();
    }

    @Override
    public Position getLocation() {
        return super.getLocation();
    }

    @Override
    public String toString() {
        return behaviourType +
                "," + ticksToFuel +
                "," + price +
                "," + totalRequests;
    }
}
