package SupplyStationsSimulation.Utilities.Messaging;

import SupplyStationsSimulation.Utilities.Timestamp;
import jade.core.AID;
import jade.lang.acl.ACLMessage;
import jade.lang.acl.UnreadableException;
import sajas.core.Agent;

import java.io.*;
import java.util.Base64;

public class Message {

    private Agent receiver;
    private Agent sender;
    private AID receiverAID;
    private AID senderAID;

    private ACLMessage message;
    private Serializable content;
    private int performative;
    private boolean isObject = true;

    public Message(Agent receiver, ACLMessage message) {
        this.receiver = receiver;
        this.receiverAID = receiver.getAID();
        this.senderAID = message.getSender();
        this.message = message;
    }

    public Message(Agent sender, AID receiverAID, int performative, Serializable content) {
        this.sender = sender;
        this.senderAID = sender.getAID();
        this.receiverAID = receiverAID;
        this.content = content;
        this.performative = performative;
    }

    //TODO: beautify propagate message -> No need for byteString to be displayed

    @Override
    public String toString() {
        String receiver = this.receiver.getLocalName();
        String sender = message.getSender().getLocalName();
        String performative = ACLMessage.getPerformative(message.getPerformative());
        try {
            String content = (isObject) ? message.getContentObject().toString() : message.getContent();
            return new Timestamp().getCurrentTime() + " - " + receiver + " received " + performative + " from " + sender + " : '" +
                    content.replace("\r\n", " ").replace("\n", " ") + "'";

        } catch (UnreadableException e) {
            System.err.println(e.getMessage());
        }

        return "Message{}";
    }

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

    public int getPerformative() {
        return message.getPerformative();
    }

    public String getContent() {
        try {
            return (isObject) ? message.getContentObject().toString() : message.getContent();
        } catch (UnreadableException e) {
            e.printStackTrace();
        }
        return "";
    }

    public AID getReceiver() {
        return receiver.getAID();
    }

    public AID getSenderAID() {
        return senderAID;
    }
}

