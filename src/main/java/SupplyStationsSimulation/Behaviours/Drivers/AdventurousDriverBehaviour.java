package SupplyStationsSimulation.Behaviours.Drivers;

import SupplyStationsSimulation.Agents.DrawableAgent;
import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Utilities.Message;
import jade.lang.acl.ACLMessage;
import sajas.core.AID;
import SupplyStationsSimulation.Agents.DriverAgent;
import sajas.core.behaviours.Behaviour;

import java.util.ArrayList;

public class AdventurousDriverBehaviour extends Behaviour implements ACLMessageBehaviour {
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
        driverAgent.setPosition(driverAgent.getPath().getStep(++tick));
        informBroadcast();
    }

    @Override
    public boolean done() {
        return driverAgent.getPath().getLength()-1 == tick;
    }

    private void informBroadcast(){
        for (DrawableAgent anAgentList : this.allDrivers) {
            inform((AID) anAgentList.getAID(), "bla bla");
        }
    }

    private void inform(AID receiver, String content) {
        new Message(this.myAgent, receiver, ACLMessage.INFORM, content).send();
    }

    private void receive(AID receiver, String content) {
        new Message(this.myAgent, receiver, ACLMessage.INFORM, content).send();
    }


    @Override
    public void handleMessage(ACLMessage message) {

        switch (message.getPerformative()){
            case ACLMessage.INFORM:
                System.out.println("Inform Received");

        }

    }
}
