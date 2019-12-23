package SupplyStationsSimulation.Statistics;

import SupplyStationsSimulation.Agents.BehaviourType;
import SupplyStationsSimulation.Agents.DriverAgent.DriverState;
import SupplyStationsSimulation.Agents.Type;
import SupplyStationsSimulation.Utilities.Locations.Position;

public class DriverInfo extends AgentInfo {

    private BehaviourType behaviourType;
    private double priceIntolerance;
    private int fuelToBuy;
    private double x;
    private double y;
    private int driverState;
    private int travelDiff;

    public DriverInfo(double priceIntolerance, int fuelToBuy, Position destination, DriverState driverState, int travelDiff, BehaviourType behaviourType) {
        this.behaviourType = behaviourType;
        this.priceIntolerance = priceIntolerance;
        this.fuelToBuy = fuelToBuy;
        this.x = destination.getX();
        this.y = destination.getY();
        this.travelDiff = travelDiff;
//        switch (driverState){
//            case INITIALIZING: this.driverState = 0;
//            case SEARCHING: this.driverState = 1;
//            case REACHING_FUEL: this.driverState = 2;
//            case WAITING_REPLY: this.driverState = 3;
//            case WAITING_LINE: this.driverState = 4;
//            case FUELLING: this.driverState = 5;
//            case REACHING_GOAL: this.driverState = 6;
//            case TERMINATING: this.driverState = 7;
//        }
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
        return behaviourType +
                "," + fuelToBuy +
/*                "," + x +
                "," + y +
                "," + driverState +
                "," + travelDiff +*/
                "," + priceIntolerance;
    }

    public double getPriceIntolerance() {
        return priceIntolerance;
    }

    public int getFuelToBuy() {
        return fuelToBuy;
    }
}
