package SupplyStationsSimulation.Utilities;

import jade.lang.acl.UnreadableException;
import sajas.core.AID;
import sajas.core.Agent;
import jade.lang.acl.ACLMessage;

import java.io.IOException;
import java.io.Serializable;

public class Message {

    private Agent receiver;
    private boolean isObject = true;
    private ACLMessage message;


    private Agent sender;
    private AID receiverAID;
    private Serializable content;
    private int performative;


    public Message(Agent receiver, ACLMessage message) {
        this.receiver = receiver;
        this.message = message;
    }

    public Message(Agent receiver, ACLMessage message, boolean isObject) {
        this.receiver = receiver;
        this.message = message;
        this.isObject = isObject;
    }

    public Message(Agent sender, AID receiverAID, int performative, Serializable content) {
        this.sender = sender;
        this.receiverAID = receiverAID;
        this.content = content;
        this.performative = performative;
    }

    @Override
    public String toString() {
        String receiver = this.receiver.getLocalName();
        String sender = message.getSender().getLocalName();
        String performative = ACLMessage.getPerformative(message.getPerformative());
        try {
            String content = (isObject) ? message.getContentObject().toString() : message.getContent();
            return receiver + " received " + performative + " from " + sender + " : " + content;

        } catch (UnreadableException e) {
            System.err.println(e.getMessage());
        }

        return "Message{}";
    }

    /*
     * Send message between two agents
     */
    public void send() {
        try {
            ACLMessage message = new ACLMessage(performative);
            message.addReceiver(receiverAID);
            message.setContentObject(content);
            sender.send(message);
        } catch (IOException e) {
            System.err.println(e.getMessage());
        }
    }


}
