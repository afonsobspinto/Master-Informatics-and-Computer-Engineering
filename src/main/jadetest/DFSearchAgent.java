package jadetest;

import jade.core.Agent;
import jade.domain.DFService;
import jade.domain.FIPAAgentManagement.DFAgentDescription;
import jade.domain.FIPAAgentManagement.ServiceDescription;
import jade.domain.FIPAException;

public class DFSearchAgent extends Agent {

	protected void setup() {
		DFAgentDescription template = new DFAgentDescription();
		ServiceDescription sd = new ServiceDescription();
		sd.setType("book-selling");
		template.addServices(sd);
		try {
			DFAgentDescription[] result = DFService.search(this, template);
			for(int i=0; i<result.length; ++i) {
				System.out.println("Found " + result[i].getName());
			}
		} catch(FIPAException fe) {
			fe.printStackTrace();
		}
	}

}
