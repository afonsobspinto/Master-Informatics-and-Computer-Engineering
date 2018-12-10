package SupplyStationsSimulation.Statistics;

import SupplyStationsSimulation.Agents.BehaviourType;
import SupplyStationsSimulation.Agents.DriverAgent.DriverState;
import SupplyStationsSimulation.Agents.Type;
import SupplyStationsSimulation.Utilities.Locations.Position;

public class DriverInfo extends AgentInfo {

    private double priceIntolerance;
    private int fuelToBuy;
    private Position destination;
    private DriverState driverState;
    private int travelDiff;
    private BehaviourType behaviourType;

    public DriverInfo(double priceIntolerance, int fuelToBuy, Position destination, DriverState driverState, int travelDiff, BehaviourType behaviourType) {
        this.priceIntolerance = priceIntolerance;
        this.fuelToBuy = fuelToBuy;
        this.destination = destination;
        this.driverState = driverState;
        this.travelDiff = travelDiff;
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
