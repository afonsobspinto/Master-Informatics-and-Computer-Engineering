package SupplyStationsSimulation.Behaviours.SupplyStations;

import SupplyStationsSimulation.Agents.SupplyStationAgent;
import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Utilities.Messaging.MessageContent;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import SupplyStationsSimulation.Utilities.Messaging.MessageType;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;

import java.util.List;

public class SupplyStationsStaticBehaviour extends Behaviour implements ACLMessageBehaviour {

    private boolean isDone = false;
    private SupplyStationAgent supplyStationAgent;


    public SupplyStationsStaticBehaviour(SupplyStationAgent supplyStationAgent) {
        super();
        this.supplyStationAgent = supplyStationAgent;
    }

    @Override
    public void action() {
    }

    @Override
    public boolean done() {
        return isDone;
    }

    @Override
    public void handleMessage(Message message) {

        switch (message.getPerformative()) {
            case ACLMessage.REQUEST:
                handleRequest(message);
            case ACLMessage.PROPOSE:
                handlePropose(message);
            case ACLMessage.CONFIRM:
                handleConfirm(message);
        }

    }

    private void handleRequest(Message message) {
        if (message.getContent().equals(MessageType.INFO.getTypeStr())) {
            new Message(this.supplyStationAgent, message.getSenderAID(), ACLMessage.INFORM, new MessageContent(MessageType.INFO, List.of(this.supplyStationAgent.getX(), this.supplyStationAgent.getY(), this.supplyStationAgent.getPricePerLiter())).getContent()).send();
        }
    }

    private void handlePropose(Message message) {
        if (message.getContent().equals(MessageType.ENTRANCE.getTypeStr())) {
            if (this.supplyStationAgent.isAvailable()) {
                new Message(this.supplyStationAgent, message.getSenderAID(), ACLMessage.ACCEPT_PROPOSAL,
                        new MessageContent(MessageType.ENTRANCE,
                                List.of(this.supplyStationAgent.getOccupation(),
                                        this.supplyStationAgent.getTicksToFuel())).getContent()).send();
            }
            else{
                new Message(this.supplyStationAgent, message.getSenderAID(), ACLMessage.REJECT_PROPOSAL,
                        new MessageContent(MessageType.ENTRANCE,
                                List.of(this.supplyStationAgent.getOccupation(),
                                        this.supplyStationAgent.getTicksToFuel(),
                                        this.supplyStationAgent.getWaitingListSize())).getContent()).send();
            }
        }
    }

    private void handleConfirm(Message message) {
        if (message.getContent().equals(MessageType.ENTRANCE.getTypeStr())) {
            this.supplyStationAgent.addDriver(message.getSenderAID());
        }
    }
}
