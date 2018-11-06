package SupplyStationsSimulation.Behaviours.SupplyStations;

import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Agents.SupplyStationAgent;
import sajas.core.behaviours.Behaviour;

import java.util.ArrayList;

public class SupplyStationsDynamicBehaviour extends Behaviour {

    private boolean isDone = false;
    private SupplyStationAgent supplyStationAgent;
    private ArrayList<DriverAgent> pumpingDrivers;

    public SupplyStationsDynamicBehaviour(SupplyStationAgent supplyStationAgent) {
        super();
        this.supplyStationAgent = supplyStationAgent;
        this.pumpingDrivers = new ArrayList<DriverAgent>();
    }
    @Override
    public void action() {
        System.out.println("Supply Station Dynamic Behaviour Action");

    }

    @Override
    public boolean done() {
        return isDone;
    }
}
