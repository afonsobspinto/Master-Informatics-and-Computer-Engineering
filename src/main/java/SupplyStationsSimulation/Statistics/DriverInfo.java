package SupplyStationsSimulation.Statistics;

import SupplyStationsSimulation.Agents.DriverAgent.DriverState;
import SupplyStationsSimulation.Utilities.Locations.Position;

public class DriverInfo extends AgentInfo {

    private int priceIntolerance;
    private int fuelToBuy;
    private Position destination;
    private DriverState driverState;
    private int travelDiff;

}
