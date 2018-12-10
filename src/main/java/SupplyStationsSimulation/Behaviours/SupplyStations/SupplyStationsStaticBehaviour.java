package SupplyStationsSimulation.Behaviours.SupplyStations;

import SupplyStationsSimulation.Agents.BehaviourType;
import SupplyStationsSimulation.Agents.SupplyStationAgent;
import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Statistics.SupplyStationInfo;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import sajas.core.behaviours.Behaviour;

public class SupplyStationsStaticBehaviour extends Behaviour implements ACLMessageBehaviour {

    private boolean isDone = false;
    private SupplyStationAgent supplyStationAgent;
    private SupplyStationInfo supplyStationInfo;
    private int infoFlag = 0;

    public SupplyStationsStaticBehaviour(SupplyStationAgent supplyStationAgent) {
        super();
        this.supplyStationAgent = supplyStationAgent;
    }

    @Override
    public void action() {
        if(infoFlag == 500) {
            this.supplyStationInfo = new SupplyStationInfo(this.supplyStationAgent.getPricePerLiter(), this.supplyStationAgent.getTicksToFuel(), this.supplyStationAgent.getTotalRequests(), BehaviourType.STATIC);
            this.infoFlag = 0;
        }
        this.supplyStationAgent.updateDrivers();
        infoFlag++;
    }

    @Override
    public boolean done() {
        return isDone;
    }

    @Override
    public void handleMessage(Message message) {

        this.supplyStationAgent.handleMessage(message);

    }


}
