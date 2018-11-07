package SupplyStationsSimulation.Behaviours.Drivers;

import SupplyStationsSimulation.Utilities.Message;
import jade.lang.acl.ACLMessage;
import sajas.core.AID;
import sajas.core.Agent;
import sajas.core.behaviours.Behaviour;

public class AdventurousDriverBehaviour extends Behaviour {
    private boolean isDone = false;
    AID supplyStation;
    public AdventurousDriverBehaviour(Agent a) {
        super(a);

    }

    @Override
    public void action() {
        System.out.println("Adventurous DriverAgent Behaviour Action");
        inform(this.supplyStation,"I want to pump");
    }

    @Override
    public boolean done() {
        return isDone;
    }

    /*
     * Send Inform Message to request to enter the station
     */
    private void inform(AID receiver, String content) {
        Message.sendMessage(this.myAgent, receiver, ACLMessage.INFORM, content);
    }
}
