package SupplyStationsSimulation.Behaviours.SupplyStations;

import SupplyStationsSimulation.Agents.SupplyStationAgent;
import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Utilities.Message;
import sajas.core.AID;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;

public class SupplyStationsStaticBehaviour extends Behaviour implements ACLMessageBehaviour {

    private boolean isDone = false;
    private SupplyStationAgent supplyStationAgent;


    public SupplyStationsStaticBehaviour(SupplyStationAgent supplyStationAgent) {
        super();
        this.supplyStationAgent = supplyStationAgent;
    }

    @Override
    public void action() {
        //System.out.println("Supply Station Static Behaviour Action");
    }

    @Override
    public boolean done() {
        return isDone;
    }


    /*
     * Send Confirm Message confirming the car can enter the station
     */
    private void confirm(AID receiver, String content) {
        new Message(this.supplyStationAgent, receiver, ACLMessage.CONFIRM, content).send();
    }

    /*
     * Send Disconfirm Message rejecting the car entrance in the station
     */
    private void disconfirm(AID receiver, String content) {
        new Message(this.supplyStationAgent, receiver, ACLMessage.DISCONFIRM, content).send();
    }

    @Override
    public void handleMessage(ACLMessage message) {

    }
}
