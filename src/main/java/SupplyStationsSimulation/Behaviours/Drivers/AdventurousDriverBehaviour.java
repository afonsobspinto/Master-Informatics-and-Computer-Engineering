package SupplyStationsSimulation.Behaviours.Drivers;

import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Utilities.Locations.Position;
import SupplyStationsSimulation.Utilities.Messaging.MessageContent;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import SupplyStationsSimulation.Utilities.Messaging.MessageType;
import jade.core.AID;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;

import java.util.List;
import java.util.Map;

public class AdventurousDriverBehaviour extends Behaviour implements ACLMessageBehaviour {
    private DriverAgent driverAgent;
    private int tick = 0;

    public AdventurousDriverBehaviour(DriverAgent a) {
        super(a);
        this.driverAgent = a;

    }

    @Override
    public void action() {


        driverAgent.setPosition(driverAgent.getPath().getStep(++tick));
    }

    @Override
    public boolean done() {
        return driverAgent.getPath().getLength()-1 == tick;
    }

    @Override
    public void handleMessage(Message message) {

        switch (message.getPerformative()){
            case ACLMessage.INFORM:
                handleInform(message);

        }
    }

    private void handleInform(Message message){
        MessageContent messageContent = new MessageContent(message);
        if(messageContent.getMessageType() == MessageType.POSITION){
            List<Object> contentObjects = messageContent.getContetObjects();
            int x =  Integer.parseInt((String)contentObjects.get(0));
            int y =  Integer.parseInt((String)contentObjects.get(1));
            driverAgent.addSupplyStationsLocation(message.getSenderAID(), new Position(x,y));

        }
    }
}
