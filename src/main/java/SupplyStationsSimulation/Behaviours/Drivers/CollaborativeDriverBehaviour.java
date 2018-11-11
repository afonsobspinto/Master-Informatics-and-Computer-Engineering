package SupplyStationsSimulation.Behaviours.Drivers;

import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;

public class CollaborativeDriverBehaviour extends Behaviour implements ACLMessageBehaviour {

    private DriverAgent driverAgent;

    public CollaborativeDriverBehaviour(DriverAgent a) {
        super(a);
        this.driverAgent = a;

    }

    @Override
    public void action() {
        driverAgent.update();
    }

    @Override
    public boolean done() {
        return driverAgent.isDone();
    }

    @Override
    public void handleMessage(Message message) {

        switch (message.getPerformative()) {
            case ACLMessage.INFORM:
                handleInform(message);
                break;
            case ACLMessage.ACCEPT_PROPOSAL:
                handleAccept(message);
                break;
            case ACLMessage.REJECT_PROPOSAL:
                handleReject(message);
                break;
        }
    }


    private void handleReject(Message message) {
        this.driverAgent.handleReject(message, (this::averageTimeWaiting));
        //todo: this.message.broadcast();
    }

    private int averageTimeWaiting(int totalGasPumps, int ticksToFuel, int waitingLine){
        return (int) Math.ceil((waitingLine*1.0 / totalGasPumps) * ticksToFuel);
    }

    private void handleAccept(Message message) {
        this.driverAgent.handleAccept(message);
        //todo: this.message.broadcast();

    }

    private void handleInform(Message message) {
        this.driverAgent.handleInform(message);
        //todo: this.message.broadcast();
    }
}
