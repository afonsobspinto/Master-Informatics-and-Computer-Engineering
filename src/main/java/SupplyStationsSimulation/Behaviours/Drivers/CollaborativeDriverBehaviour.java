package SupplyStationsSimulation.Behaviours.Drivers;

import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import sajas.core.behaviours.Behaviour;

public class CollaborativeDriverBehaviour extends Behaviour implements ACLMessageBehaviour {

    private DriverAgent driverAgent;

    public CollaborativeDriverBehaviour(DriverAgent a) {
        super(a);
        this.driverAgent = a;

    }

    @Override
    public void action() {
        driverAgent.updatePosition();
    }

    @Override
    public boolean done() {
        return driverAgent.isDone();
    }

    @Override
    public void handleMessage(Message message) {

    }
}
