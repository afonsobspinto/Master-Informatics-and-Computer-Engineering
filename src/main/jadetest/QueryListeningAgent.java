package jadetest;

import jade.core.Agent;
import jade.core.behaviours.CyclicBehaviour;
import jade.lang.acl.ACLMessage;
import jade.lang.acl.MessageTemplate;

public class QueryListeningAgent extends Agent {

	public void setup() {
		addBehaviour(new QueryListeningBehaviour());
	}
	
	class QueryListeningBehaviour extends CyclicBehaviour {
		MessageTemplate mt = MessageTemplate.MatchPerformative(ACLMessage.QUERY_IF);

		public void action() {
			ACLMessage msg = receive(mt);
			if(msg != null) {
				System.out.println(msg);
				ACLMessage reply = msg.createReply();
				reply.setPerformative(ACLMessage.INFORM);
				reply.setContent("Don't have a clue...");
				send(reply);
			} else {
				block();
			}
		}

	}
	
}
