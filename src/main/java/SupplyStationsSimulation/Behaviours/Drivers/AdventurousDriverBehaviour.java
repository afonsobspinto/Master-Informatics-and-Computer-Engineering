package SupplyStationsSimulation.Behaviours.Drivers;

import SupplyStationsSimulation.Agents.DrawableAgent;
import SupplyStationsSimulation.Utilities.Message;
import jade.lang.acl.ACLMessage;
import sajas.core.AID;
import SupplyStationsSimulation.Agents.DrawableAgent;
import SupplyStationsSimulation.Agents.DriverAgent;
import sajas.core.Agent;
import sajas.core.behaviours.Behaviour;

import java.util.ArrayList;

public class AdventurousDriverBehaviour extends Behaviour {
    private boolean isDone = false;
    private ArrayList<DrawableAgent> allDrivers = new ArrayList<DrawableAgent>();
    private DriverAgent driverAgent;
    private int tick = 0;

    public AdventurousDriverBehaviour(DriverAgent a, ArrayList<DrawableAgent> agentList) {
        super(a);
        for (DrawableAgent anAgentList : agentList) {
            if (anAgentList.getName().charAt(0) == 'A' || anAgentList.getName().charAt(0) == 'C') {
                this.allDrivers.add(anAgentList);
            }
        }
        this.driverAgent = a;

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

        driverAgent.setPosition(driverAgent.getPath().getStep(++tick));
    }

    @Override
    public boolean done() {
        return driverAgent.getPath().getLength()-1 == tick;
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
