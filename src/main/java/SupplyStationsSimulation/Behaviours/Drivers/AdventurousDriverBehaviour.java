package SupplyStationsSimulation.Behaviours.Drivers;

import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Utilities.Locations.Position;
import SupplyStationsSimulation.Utilities.Messaging.MessageContent;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import SupplyStationsSimulation.Utilities.Messaging.MessageType;
import SupplyStationsSimulation.Utilities.SupplyStationInfo;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;

import java.util.List;

public class AdventurousDriverBehaviour extends Behaviour implements ACLMessageBehaviour {
    private DriverAgent driverAgent;

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

        }
    }

    private void handleInform(Message message) {
        MessageContent messageContent = new MessageContent(message);
        if (messageContent.getMessageType() == MessageType.INFO) {
            List<Object> contentObjects = messageContent.getContetObjects();
            int x = Integer.parseInt((String) contentObjects.get(0));
            int y = Integer.parseInt((String) contentObjects.get(1));
            double price = Double.parseDouble((String) contentObjects.get(2));
            driverAgent.addSupplyStationsInfo(new SupplyStationInfo(message.getSenderAID(),
                    new Position(x, y), price, driverAgent.getPosition(),
                    driverAgent.getPriceIntolerance(), driverAgent.getDestination()));

        }
    }
}
