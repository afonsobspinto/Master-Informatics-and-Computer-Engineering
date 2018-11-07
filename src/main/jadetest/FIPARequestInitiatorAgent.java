package jadetest;

import jade.core.Agent;
import jade.lang.acl.ACLMessage;
import jade.proto.AchieveREInitiator;

import java.util.Vector;

public class FIPARequestInitiatorAgent extends Agent {

	public void setup() {
		addBehaviour(new FIPARequestInit(this, new ACLMessage(ACLMessage.REQUEST)));
	}
	
	class FIPARequestInit extends AchieveREInitiator {

		public FIPARequestInit(Agent a, ACLMessage msg) {
			super(a, msg);
		}

		protected Vector<ACLMessage> prepareRequests(ACLMessage msg) {
			Vector<ACLMessage> v = new Vector<ACLMessage>();
			// ...
			return v;
		}
		
		protected void handleAgree(ACLMessage agree) {
			// ...
		}
		
		protected void handleRefuse(ACLMessage refuse) {
			// ...
		}
		
		protected void handleInform(ACLMessage inform) {
			// ...
		}
		
		protected void handleFailure(ACLMessage failure) {
			// ...
		}

	}
	
}
