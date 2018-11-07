package jadetest;

import jade.core.Agent;
import jade.lang.acl.ACLMessage;
import jade.lang.acl.MessageTemplate;
import jade.proto.AchieveREResponder;

public class FIPARequestResponderAgent extends Agent {

	public void setup() {
		addBehaviour(new FIPARequestResp(this, MessageTemplate.MatchPerformative(ACLMessage.REQUEST)));
	}
	
	class FIPARequestResp extends AchieveREResponder {

		public FIPARequestResp(Agent a, MessageTemplate mt) {
			super(a, mt);
		}
		
		protected ACLMessage handleRequest(ACLMessage request) {
			ACLMessage reply = request.createReply();
			// ...
			return reply;
		}
		
		protected ACLMessage prepareResultNotification(ACLMessage request, ACLMessage response) {
			ACLMessage result = request.createReply();
			// ...
			return result;
		}

	}
	
}
