package SupplyStationsSimulation.Behaviours.Drivers;

import SupplyStationsSimulation.Agents.BehaviourType;
import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Statistics.DriverInfo;
import SupplyStationsSimulation.Utilities.Locations.Position;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import SupplyStationsSimulation.Utilities.Messaging.MessageContent;
import SupplyStationsSimulation.Utilities.Messaging.MessageType;
import SupplyStationsSimulation.Utilities.SupplyStationInfo;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;
import java.util.List;

public class AdventurousDriverBehaviour extends Behaviour implements ACLMessageBehaviour {

    private DriverAgent driverAgent;
    private DriverInfo driverInfo;

    public AdventurousDriverBehaviour(DriverAgent a) {
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
            case ACLMessage.REJECT_PROPOSAL:
                handleReject(message);
                break;
            case ACLMessage.ACCEPT_PROPOSAL:
                handleAccept(message);
                break;

        }
    }

    private void handleInform(Message message) {
        this.driverAgent.handleInform(message);
    }

    private void handleAccept(Message message) {
        this.driverAgent.handleAccept(message);
    }

    private void handleReject(Message message) {
        this.driverAgent.handleReject(message, (this::averageTimeWaiting));
    }

    private int averageTimeWaiting(int totalGasPumps, int ticksToFuel, int waitingLine) {
        return (int) Math.ceil((waitingLine * 1.0 / totalGasPumps) * ticksToFuel);
    }

    public void saveStatistics(){
        this.driverInfo = new DriverInfo(this.driverAgent.getPriceIntolerance(), this.driverAgent.getFuelToBuy(), this.driverAgent.getDestination(),
                this.driverAgent.getDriverState(), Math.abs(this.driverAgent.getExpectedTravelDuration() - this.driverAgent.getDeFactoTravelDuration()), BehaviourType.ADVENTUROUS);
        this.driverAgent.getStatistics().updateAgentInfo(this.driverAgent.getAID(), this.driverInfo);
    }
}
