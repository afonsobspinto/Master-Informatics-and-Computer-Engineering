package SupplyStationsSimulation.Utilities;

import sajas.core.AID;
import sajas.core.Agent;
import jade.lang.acl.ACLMessage;

import java.io.IOException;
import java.io.Serializable;

public class Message {


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
