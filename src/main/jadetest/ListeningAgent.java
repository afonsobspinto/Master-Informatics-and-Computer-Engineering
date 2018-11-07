package jadetest;

import jade.core.Agent;
import jade.core.behaviours.CyclicBehaviour;
import jade.lang.acl.ACLMessage;

public class ListeningAgent extends Agent {

	public void setup() {
		addBehaviour(new ListeningBehaviour());
	}
	
	class ListeningBehaviour extends CyclicBehaviour {
		
		public void action() {
			ACLMessage msg = receive();
			if(msg != null) {
				System.out.println(msg);
				ACLMessage reply = msg.createReply();
				reply.setPerformative(ACLMessage.INFORM);
				reply.setContent("Got your message!");
				send(reply);
			} else {
				block();
			}
		}

	}
	
}
