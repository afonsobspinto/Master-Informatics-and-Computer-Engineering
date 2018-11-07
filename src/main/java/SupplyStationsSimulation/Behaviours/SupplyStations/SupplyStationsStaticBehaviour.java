package SupplyStationsSimulation.Behaviours.SupplyStations;

import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Agents.SupplyStationAgent;
import SupplyStationsSimulation.Utilities.Message;
import sajas.core.AID;
import jade.domain.FIPAException;
import jade.lang.acl.ACLMessage;
import sajas.core.Agent;
import sajas.core.behaviours.Behaviour;

import java.io.IOException;
import java.util.ArrayList;

public class SupplyStationsStaticBehaviour extends Behaviour {

    private boolean isDone = false;
    private SupplyStationAgent supplyStationAgent;


    public SupplyStationsStaticBehaviour(SupplyStationAgent supplyStationAgent) {
        super();
        this.supplyStationAgent = supplyStationAgent;
    }

    @Override
    public void action() {
        System.out.println("Supply Station Static Behaviour Action");

    }

    @Override
    public boolean done() {
        return isDone;
    }


    /*
     * Send Confirm Message confirming the car can enter the station
     */
    private void confirm(AID receiver, String content) {
        Message.sendMessage(this.supplyStationAgent, receiver, ACLMessage.CONFIRM, content);
    }

    /*
     * Send Disconfirm Message rejecting the car entrance in the station
     */
    private void disconfirm(AID receiver, String content) {
        Message.sendMessage(this.supplyStationAgent, receiver, ACLMessage.DISCONFIRM, content);
    }
}
