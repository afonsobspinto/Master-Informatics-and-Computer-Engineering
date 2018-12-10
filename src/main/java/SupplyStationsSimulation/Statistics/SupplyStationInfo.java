package SupplyStationsSimulation.Statistics;

import SupplyStationsSimulation.Agents.BehaviourType;
import SupplyStationsSimulation.Agents.Type;
import SupplyStationsSimulation.Utilities.Locations.Position;

public class SupplyStationInfo extends AgentInfo {

    private double price;
    private int ticksToFuel;
    private int totalRequests;
    private BehaviourType behaviourType;

    public SupplyStationInfo(double price, int ticksToFuel, int totalRequests, BehaviourType behaviourType) {
        this.price = price;
        this.ticksToFuel = ticksToFuel;
        this.totalRequests = totalRequests;
        this.behaviourType = behaviourType;
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
}
