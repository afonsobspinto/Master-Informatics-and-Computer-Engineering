package SupplyStationsSimulation.Behaviours.Drivers;

import SupplyStationsSimulation.Agents.DrawableAgent;
import SupplyStationsSimulation.Utilities.Message;
import jade.lang.acl.ACLMessage;
import sajas.core.AID;
import sajas.core.Agent;
import sajas.core.behaviours.Behaviour;

import java.util.ArrayList;

public class AdventurousDriverBehaviour extends Behaviour {
    private boolean isDone = false;
    private ArrayList<DrawableAgent> allDrivers = new ArrayList<DrawableAgent>();

    public AdventurousDriverBehaviour(Agent a, ArrayList<DrawableAgent> agentList) {
        super(a);
        for (DrawableAgent anAgentList : agentList) {
            if (anAgentList.getName().charAt(0) == 'A' || anAgentList.getName().charAt(0) == 'C') {
                this.allDrivers.add(anAgentList);
            }
        }

    }

    @Override
    public void action() {
        System.out.println("Adventurous DriverAgent Behaviour Action");

        ACLMessage msg = myAgent.receive();
        if (msg != null ){
            Message.printMessage(myAgent, msg, true);
            if (msg.getPerformative() == ACLMessage.INFORM)
                System.out.println("Thanks for the info!");
        }
        for (DrawableAgent anAgentList : this.allDrivers) {
            inform((AID) anAgentList.getAID(), "bla bla");
            System.out.println("Sent message to all drivers");
        }

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

    /*
     * Send Inform Message to request to enter the station
     */
    private void receive(AID receiver, String content) {
        Message.sendMessage(this.myAgent, receiver, ACLMessage.INFORM, content);
    }


}
