package SupplyStationsSimulation.Behaviours.Drivers;

import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import jade.core.AID;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;

public class AdventurousDriverBehaviour extends Behaviour implements ACLMessageBehaviour {
    private DriverAgent driverAgent;
    private int tick = 0;

    public AdventurousDriverBehaviour(DriverAgent a) {
        super(a);
        this.driverAgent = a;

    }

    @Override
    public void action() {
        for(AID aid: driverAgent.getSupplyStationsServices()){
            System.out.println(aid);
        }
        driverAgent.setPosition(driverAgent.getPath().getStep(++tick));
    }

    @Override
    public boolean done() {
        return driverAgent.getPath().getLength()-1 == tick;
    }

    @Override
    public void handleMessage(ACLMessage message) {

        switch (message.getPerformative()){
            case ACLMessage.INFORM:
                System.out.println("Inform Received");

        }

    }
}
