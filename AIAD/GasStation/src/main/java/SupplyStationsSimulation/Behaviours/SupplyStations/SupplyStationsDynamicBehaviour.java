package SupplyStationsSimulation.Behaviours.SupplyStations;

import SupplyStationsSimulation.Agents.BehaviourType;
import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Agents.SupplyStationAgent;
import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Statistics.Statistics;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import SupplyStationsSimulation.Statistics.SupplyStationInfo;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;

import java.util.ArrayList;
import java.util.Random;

public class SupplyStationsDynamicBehaviour extends Behaviour implements ACLMessageBehaviour {

    private boolean isDone = false;
    private SupplyStationAgent supplyStationAgent;
    private ArrayList<DriverAgent> pumpingDrivers;

    private static int timeoutDeviation = 40;
    private static int timeoutMin = 10;
    private int currentPriceTimeout = new Random().nextInt(timeoutDeviation) + timeoutMin;

    public SupplyStationsDynamicBehaviour(SupplyStationAgent supplyStationAgent) {
        super();
        this.supplyStationAgent = supplyStationAgent;
        this.pumpingDrivers = new ArrayList<DriverAgent>();
    }
    @Override
    public void action() {
        this.supplyStationAgent.updateDrivers();
        this.currentPriceTimeout--;
        if(this.currentPriceTimeout == 0) {
            this.supplyStationAgent.updatePrice();
            this.updatePriceTimeout();
        }
    }

    @Override
    public boolean done() {
        return isDone;
    }

    @Override
    public void handleMessage(Message message) {

        this.supplyStationAgent.handleMessage(message);

    }

    public void updatePriceTimeout(){
        currentPriceTimeout = new Random().nextInt(timeoutDeviation) + timeoutMin;
    }



}
