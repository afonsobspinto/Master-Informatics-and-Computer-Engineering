package SupplyStationsSimulation.Utilities;

import jade.lang.acl.UnreadableException;
import sajas.core.AID;
import sajas.core.Agent;
import jade.lang.acl.ACLMessage;

import java.io.IOException;
import java.io.Serializable;

public class Message {


    /*
     * Print information about message received
     */
    public static void printMessage(Agent agent, ACLMessage message, boolean isObject) {
        String receiver = agent.getLocalName();
        String sender = message.getSender().getLocalName();
        String performative = ACLMessage.getPerformative(message.getPerformative());
        try {
            String content;
            if(isObject)
                content = message.getContentObject().toString();
            else
                content = message.getContent();
            System.out.println(receiver + " received " + performative + " from " + sender + " : " + content);
        } catch (UnreadableException e) {
            System.err.println(e.getMessage());
        }
    }

    /*
     * Send message between two agents
     */
    public static void sendMessage(Agent sender, AID receiver, int performative, Serializable content) {
        try {
            ACLMessage message = new ACLMessage(performative);
            message.addReceiver(receiver);
            message.setContentObject(content);
            sender.send(message);
        } catch (IOException e) {
            System.err.println(e.getMessage());
        }
    }



}
