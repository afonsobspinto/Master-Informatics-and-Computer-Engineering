package SupplyStationsSimulation.Behaviours.SupplyStations;

import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Agents.SupplyStationAgent;
import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;

import java.util.ArrayList;

public class SupplyStationsDynamicBehaviour extends Behaviour implements ACLMessageBehaviour {

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

    }

    @Override
    public boolean done() {
        return isDone;
    }

    @Override
    public void handleMessage(ACLMessage message) {

    }
}
