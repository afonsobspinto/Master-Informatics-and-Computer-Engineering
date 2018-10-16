package ServiceConsumerProvider;

import jade.content.lang.Codec;
import jade.content.lang.Codec.CodecException;
import jade.content.lang.sl.SLCodec;
import jade.content.onto.Ontology;
import jade.content.onto.OntologyException;
import sajas.core.Agent;
import sajas.core.behaviours.CyclicBehaviour;
import ServiceConsumerProvider.onto.ContractOutcome;
import ServiceConsumerProvider.onto.Results;
import ServiceConsumerProvider.onto.ServiceOntology;
import jade.lang.acl.ACLMessage;
import jade.lang.acl.MessageTemplate;
import jade.wrapper.ControllerException;

import java.util.ArrayList;
import java.util.Map;
import java.util.TreeMap;

public class ResultsCollector extends Agent {

	private static final long serialVersionUID = 1L;
	
	private int nResults;
	
	private long startTime = System.currentTimeMillis();
	
	private Map<Integer,ArrayList<ArrayList<ContractOutcome>>> aggregatedResults = new TreeMap<Integer, ArrayList<ArrayList<ContractOutcome>>>();
	
	public ResultsCollector(int nResults) {
		this.nResults = nResults;
	}
	
	private Codec codec;
	private Ontology serviceOntology;
	
	@Override
	public void setup() {
		
		// register language and ontology
		codec = new SLCodec();
		serviceOntology = ServiceOntology.getInstance();
		getContentManager().registerLanguage(codec);
		getContentManager().registerOntology(serviceOntology);

		// results listener
		addBehaviour(new ResultsListener());
	}
	
	protected void printResults() {
		long took = System.currentTimeMillis() - startTime;
		System.out.println("Took: \t" + took);
		
		for(int consumerType : aggregatedResults.keySet()) {
			ArrayList<ArrayList<ContractOutcome>> resultsForConsumerType = aggregatedResults.get(consumerType);						
			for(ArrayList<ContractOutcome> contractOutcomes : resultsForConsumerType) {
				System.out.print(consumerType);
				for(ContractOutcome contractOutcome : contractOutcomes) {
					System.out.print("\t" + contractOutcome.getValue());
				}
				System.out.println();
			}
		}
		
	}

	
	private class ResultsListener extends CyclicBehaviour {

		private static final long serialVersionUID = 1L;
		
		private MessageTemplate template = 
				MessageTemplate.and(
						MessageTemplate.MatchPerformative(ACLMessage.INFORM),
						MessageTemplate.MatchOntology(ServiceOntology.ONTOLOGY_NAME));

		@Override
		public void action() {
			
			ACLMessage inform = myAgent.receive(template);
			if(inform != null) {
				Results results = null;
				try {
					results = (Results) getContentManager().extractContent(inform);
					ArrayList<ArrayList<ContractOutcome>> resultsForConsumerType = aggregatedResults.get(results.getProviderFilterSize());
					if(resultsForConsumerType == null) {
						resultsForConsumerType = new ArrayList<ArrayList<ContractOutcome>>();
						aggregatedResults.put(results.getProviderFilterSize(), resultsForConsumerType);
					}
					resultsForConsumerType.add(results.getContractOutcomes());
				} catch (CodecException | OntologyException e) {
					e.printStackTrace();
				}
				
				if(--nResults == 0) {
					// output results
					printResults();
					
					// shutdown
					try {
						myAgent.getContainerController().getPlatformController().kill();
					} catch (ControllerException e) {
						e.printStackTrace();
					}
				}
			} else {
				block();
			}
			
		}
		
	}

}
