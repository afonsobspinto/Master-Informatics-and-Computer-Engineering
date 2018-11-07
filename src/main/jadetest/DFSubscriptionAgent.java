package jadetest;

import jade.core.AID;
import jade.core.Agent;
import jade.domain.DFService;
import jade.domain.FIPAAgentManagement.DFAgentDescription;
import jade.domain.FIPAAgentManagement.ServiceDescription;
import jade.domain.FIPAException;
import jade.lang.acl.ACLMessage;
import jade.proto.SubscriptionInitiator;

public class DFSubscriptionAgent extends Agent {

	protected void setup() {
		
		DFAgentDescription template = new DFAgentDescription();
		ServiceDescription sd = new ServiceDescription();
		sd.setType("book-selling");
		template.addServices(sd);
		addBehaviour(new DFSubscriptionInit(this, template));

	}
	
	class DFSubscriptionInit extends SubscriptionInitiator {
		
		DFSubscriptionInit(Agent agent, DFAgentDescription dfad) {
			super(agent, DFService.createSubscriptionMessage(agent, getDefaultDF(), dfad, null));
		}
		
		protected void handleInform(ACLMessage inform) {
			try {
				DFAgentDescription[] dfds = DFService.decodeNotification(inform.getContent());
				for(int i=0; i<dfds.length; i++) {
					AID agent = dfds[i].getName();
					System.out.println("New agent in town: " + agent.getLocalName());
				}
			} catch (FIPAException fe) {
				fe.printStackTrace();
			}
		}
		
	}

}
