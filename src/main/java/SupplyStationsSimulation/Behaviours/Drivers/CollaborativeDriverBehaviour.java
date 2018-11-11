package SupplyStationsSimulation.Behaviours.Drivers;

import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Utilities.Locations.Position;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import SupplyStationsSimulation.Utilities.Messaging.MessageContent;
import SupplyStationsSimulation.Utilities.Messaging.MessageType;
import SupplyStationsSimulation.Utilities.SupplyStationInfo;
import jade.core.AID;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;

import java.util.List;

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
            case ACLMessage.PROPAGATE:
                handlePropagate(message);
                break;
        }
    }

    private void handlePropagate(Message message) {
        MessageContent messageContent = new MessageContent(message);

        switch (messageContent.getMessageType()) {
/*            case INFO:
                this.handlePropagateInform(messageContent);
                break;*/
            case ENTRANCE:
                this.handlePropagateAccept(messageContent);
                break;
        }

    }

    private void handlePropagateAccept(MessageContent messageContent) {
        List<String> contentObjects = messageContent.getContetObjects();
        int occupation = Integer.parseInt(contentObjects.get(0));
        int ticksToFuel = Integer.parseInt(contentObjects.get(1));
        int totalGasPumps = Integer.parseInt(contentObjects.get(2));
        int x = Integer.parseInt(contentObjects.get(3));
        int y = Integer.parseInt(contentObjects.get(4));
        double price = Double.parseDouble(contentObjects.get(5));

        AID sender = messageContent.getSenderAID(contentObjects, 6);

        int ticks = (int) (1.0 + ((occupation+1.0)/totalGasPumps) * ticksToFuel);
        this.driverAgent.addSupplyStationsInfo(new SupplyStationInfo(sender,
                new Position(x, y), price, this.driverAgent.getPosition(),
                this.driverAgent.getPriceIntolerance(), this.driverAgent.getDestination(), ticks));

        }


    private void handlePropagateInform(MessageContent messageContent) {
        if (messageContent.getMessageType() == MessageType.INFO) {
            List<String> contentObjects = messageContent.getContetObjects();
            int x = Integer.parseInt(contentObjects.get(0));
            int y = Integer.parseInt(contentObjects.get(1));
            double price = Double.parseDouble(contentObjects.get(2));
            AID sender = messageContent.getSenderAID(contentObjects, 3);
            this.driverAgent.addSupplyStationsInfo(new SupplyStationInfo(sender,
                    new Position(x, y), price, this.driverAgent.getPosition(),
                    this.driverAgent.getPriceIntolerance(), this.driverAgent.getDestination()));

        }
    }


    private void handleReject(Message message) {
        this.driverAgent.handleReject(message, (this::averageTimeWaiting));
        this.broadcast(message, this.driverAgent.getDriversList(), null);
    }

    private int averageTimeWaiting(int totalGasPumps, int ticksToFuel, int waitingLine) {
        return (int) Math.ceil((waitingLine * 1.0 / totalGasPumps) * ticksToFuel);
    }

    private void handleAccept(Message message) {
        this.driverAgent.handleAccept(message);
        this.broadcast(message, this.driverAgent.getDriversList(),
                List.of(String.valueOf(this.driverAgent.getX()),
                        String.valueOf(this.driverAgent.getY()),
                        String.valueOf(this.driverAgent.getTargetSupplyStationInfo().getPricePerLiter())));

    }

    private void handleInform(Message message) {
        this.driverAgent.handleInform(message);
        this.broadcast(message, this.driverAgent.getDriversList(), null);
    }

    private void broadcast(Message message, List<AID> aids, List<String>additionalFields) {
        MessageContent messageContent = new MessageContent(message);
        for (AID aid : aids) {
            if (!aid.equals(getAgent().getAID())) {
                List<String> messageContentObjects = messageContent.getContetObjects();
                if(additionalFields!=null){
                    messageContentObjects.addAll(additionalFields);
                }
                messageContentObjects.add(message.getSerializedSenderAID());
                new Message(this.driverAgent, aid, ACLMessage.PROPAGATE,
                        new MessageContent(messageContent.getMessageType(), messageContentObjects).getContent()).send();

            }
        }
    }
}
