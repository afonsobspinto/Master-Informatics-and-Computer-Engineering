package ServiceConsumerProvider;

import jade.content.lang.Codec;
import jade.content.lang.Codec.CodecException;
import jade.content.lang.sl.SLCodec;
import jade.content.onto.Ontology;
import jade.content.onto.OntologyException;
import sajas.core.Agent;
import jade.core.AID;
import sajas.core.behaviours.Behaviour;
import sajas.core.behaviours.WakerBehaviour;
import sajas.core.behaviours.WrapperBehaviour;
import sajas.domain.DFService;
import jade.domain.FIPAException;
import jade.domain.FIPANames;
import jade.domain.FIPAAgentManagement.DFAgentDescription;
import jade.domain.FIPAAgentManagement.ServiceDescription;
import jade.lang.acl.ACLMessage;
import sajas.proto.ContractNetInitiator;
import sajas.proto.SubscriptionInitiator;
import ServiceConsumerProvider.draw.Edge;
import ServiceConsumerProvider.onto.ContractOutcome;
import ServiceConsumerProvider.onto.Results;
import ServiceConsumerProvider.onto.ServiceOntology;
import ServiceConsumerProvider.onto.ServiceProposal;
import ServiceConsumerProvider.onto.ServiceProposalRequest;
import uchicago.src.sim.network.DefaultDrawableNode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

public class ConsumerAgent extends Agent {

	private static final long serialVersionUID = 1L;
	
	private String requiredService = "bla";
	
	private int nContracts;
	private ArrayList<ContractOutcome> contractOutcomes = new ArrayList<ContractOutcome>();
	private AID resultsCollector;
	
	// providers and their values
	private int nBestProviders;
	private Map<AID,ProviderValue> providersTable = new HashMap<AID,ProviderValue>();
	private ArrayList<ProviderValue> providersList = new ArrayList<ProviderValue>();
	
	private AID contractedProvider;
	
	private Codec codec;
	private Ontology serviceOntology;
	
	protected ACLMessage myCfp;

	DefaultDrawableNode myNode;

	public ConsumerAgent(int nBestProviders, int nContracts, AID resultsCollector) {
		this.nBestProviders = nBestProviders;
		this.nContracts = nContracts;
		this.resultsCollector = resultsCollector;
	}
	
	public double getMovingAverage(int n) {
		int count = 0;
		for(int i=Math.max(0, contractOutcomes.size()-n); i<contractOutcomes.size(); i++) {
			count += contractOutcomes.get(i).getValue() == ContractOutcome.Value.SUCCESS ? 1 : 0;
		}
		
		return ((double) count) / n;
	}
	
	
	@Override
	public void setup() {

		// register language and ontology
		codec = new SLCodec();
		serviceOntology = ServiceOntology.getInstance();
		getContentManager().registerLanguage(codec);
		getContentManager().registerOntology(serviceOntology);
		
		// subscribe DF
		DFAgentDescription template = new DFAgentDescription();
		ServiceDescription sd = new ServiceDescription();
		sd.setType("service-provider");
		template.addServices(sd);
		addBehaviour(new DFSubscInit(this, template));

		// prepare cfp message
		myCfp = new ACLMessage(ACLMessage.CFP);
		myCfp.setLanguage(codec.getName());
		myCfp.setOntology(serviceOntology.getName());
		myCfp.setProtocol(FIPANames.InteractionProtocol.FIPA_CONTRACT_NET);
		//
		ServiceProposalRequest serviceProposalRequest = new ServiceProposalRequest(requiredService);
		try {
			getContentManager().fillContent(myCfp, serviceProposalRequest);
		} catch (CodecException | OntologyException e) {
			e.printStackTrace();
		}
		
		// waker behaviour for starting CNets
		addBehaviour(new StartCNets(this, 2000));
	}
	
	protected void addProvider(AID provider) {
		ProviderValue pv = new ProviderValue(provider);
		
		// add to providers table for easy access
		providersTable.put(provider, pv);
		
		// add to list
		providersList.add(pv);
	}
	
	protected void addProviderOutcome(AID provider, ContractOutcome.Value outcome) {
		ProviderValue pv = providersTable.get(provider);
		pv.addOutcome(outcome);
	}
	
	protected ArrayList<AID> getBestProviders() {
		
		ArrayList<AID> bestProviders = new ArrayList<AID>();
		
		Collections.sort(providersList);
		for(int i = 0; i < nBestProviders && i < providersList.size(); i++) {
			bestProviders.add(providersList.get(i).getProvider());
		}
		
		return bestProviders;
	}
	
	
	private class ProviderValue implements Comparable<ProviderValue> {
		private final double INITIAL_VALUE = 0.5;

		private AID provider;
		private int nSuccess = 0;
		private int nFailure = 0;
		private double value;
		
		ProviderValue(AID provider) {
			this.provider = provider;
			this.value = INITIAL_VALUE;
		}
		
		public AID getProvider() {
			return provider;
		}
		
		public void addOutcome(ContractOutcome.Value outcome) {
			switch(outcome) {
			case SUCCESS:
				nSuccess++;
				break;
			case FAILURE:
				nFailure++;
				break;
			}
			value = (double) nSuccess/(nSuccess+nFailure);
		}
		
		public double getValue() {
			return value;
		}
		
		@Override
		public int compareTo(ProviderValue o) {
			// descending order
			if(o.value < value) {
				return -1;
			} else if(o.value > value) {
				return 1;
			} else {
				return provider.compareTo(o.getProvider());
			}
		}
		
	}
	
	
	private class DFSubscInit extends SubscriptionInitiator {
		
		private static final long serialVersionUID = 1L;

		DFSubscInit(Agent agent, DFAgentDescription dfad) {
			super(agent, DFService.createSubscriptionMessage(agent, getDefaultDF(), dfad, null));
		}
		
		protected void handleInform(ACLMessage inform) {
			try {
				DFAgentDescription[] dfads = DFService.decodeNotification(inform.getContent());
				for(int i = 0; i < dfads.length; i++) {
					AID agent = dfads[i].getName();
					((ConsumerAgent) myAgent).addProvider(agent);
				}
			} catch (FIPAException fe) {
				fe.printStackTrace();
			}

		}
		
	}
	
	
	private class StartCNets extends WakerBehaviour {

		private static final long serialVersionUID = 1L;

		public StartCNets(Agent a, long timeout) {
			super(a, timeout);
		}
		
		@Override
		public void onWake() {
			// initiate CNet protocol
			CNetInit cNetInit = new CNetInit(myAgent, (ACLMessage) myCfp.clone());
			addBehaviour(new CNetInitWrapper(cNetInit));
		}

	}

	
	private class CNetInitWrapper extends WrapperBehaviour {

		private static final long serialVersionUID = 1L;

		public CNetInitWrapper(Behaviour wrapped) {
			super(wrapped);
		}
		
		public int onEnd() {
			if(--nContracts > 0) {
				// initiate new CNet protocol
				CNetInit cNetInit = new CNetInit(myAgent, (ACLMessage) myCfp.clone());
				addBehaviour(new CNetInitWrapper(cNetInit));
				return 1;
			} else {
				if(resultsCollector != null) {
					ACLMessage inform = new ACLMessage(ACLMessage.INFORM);
					inform.addReceiver(resultsCollector);
					inform.setLanguage(codec.getName());
					inform.setOntology(serviceOntology.getName());
					//
					Results results = new Results(nBestProviders, contractOutcomes);
					try {
						getContentManager().fillContent(inform, results);
					} catch (CodecException | OntologyException e) {
						e.printStackTrace();
					}
					myAgent.send(inform);
				}
				return 0;
			}
		}
		
	}
	
	
	private class CNetInit extends ContractNetInitiator {

		private static final long serialVersionUID = 1L;

		public CNetInit(Agent owner, ACLMessage cfp) {
			super(owner, cfp);
		}

		@Override
		public Vector prepareCfps(ACLMessage cfp) {
			// select best providers
			ArrayList<AID> bestProviders = ((ConsumerAgent) myAgent).getBestProviders();
			for(AID provider : bestProviders) {
				cfp.addReceiver(provider);
			}
			
			return super.prepareCfps(cfp);
		}

		@Override
		protected void handleRefuse(ACLMessage refuse) {
		}

		@Override
		protected void handlePropose(ACLMessage propose, Vector acceptances) {
		}

		@Override
		protected void handleAllResponses(Vector responses, Vector acceptances) {

			double servicePrice;
			double bestServicePrice = Double.MAX_VALUE;
			ACLMessage response;
			ACLMessage bestServiceProposalMessage = null;
			for(Object obj : responses) {
				response = (ACLMessage) obj;
				if (response.getPerformative() == ACLMessage.PROPOSE) {
					
					try {
						servicePrice = ((ServiceProposal) getContentManager().extractContent(response)).getPrice();
						if(servicePrice < bestServicePrice) {
							// new best proposal
							if(bestServiceProposalMessage != null) {
								// reject previous best
								ACLMessage reject = bestServiceProposalMessage.createReply();
								reject.setPerformative(ACLMessage.REJECT_PROPOSAL);
								acceptances.add(reject);
							}
							// update best
							bestServicePrice = servicePrice;
							bestServiceProposalMessage = response;
						} else {
							// reject proposal
							ACLMessage reject = response.createReply();
							reject.setPerformative(ACLMessage.REJECT_PROPOSAL);
							acceptances.add(reject);
						}
					} catch (CodecException | OntologyException e) {
						e.printStackTrace();
					}
				}
			}

			if(bestServiceProposalMessage != null) {
				// accept winner
				ACLMessage accept = bestServiceProposalMessage.createReply();
				accept.setPerformative(ACLMessage.ACCEPT_PROPOSAL);
				acceptances.add(accept);
				
				// update edge(s)
				if(myNode != null) {
					if(contractedProvider != null) {
						myNode.removeEdgesTo(Repast3ServiceConsumerProviderLauncher.getNode(contractedProvider.getLocalName()));
					}
					contractedProvider = bestServiceProposalMessage.getSender();
					DefaultDrawableNode to = Repast3ServiceConsumerProviderLauncher.getNode(contractedProvider.getLocalName());
					Edge edge = new Edge(myNode, to);
					myNode.addOutEdge(edge);
				}
				
			} else {
				System.out.println(myAgent.getLocalName() + ": no provider available");
				contractOutcomes.add(new ContractOutcome(ContractOutcome.Value.FAILURE));
			}
		}

		@Override
		protected void handleFailure(ACLMessage failure) {
			((ConsumerAgent) myAgent).addProviderOutcome(failure.getSender(), ContractOutcome.Value.FAILURE);
			contractOutcomes.add(new ContractOutcome(ContractOutcome.Value.FAILURE));
		}

		@Override
		protected void handleInform(ACLMessage inform) {
			((ConsumerAgent) myAgent).addProviderOutcome(inform.getSender(), ContractOutcome.Value.SUCCESS);
			contractOutcomes.add(new ContractOutcome(ContractOutcome.Value.SUCCESS));
		}
		
		@Override
		protected void handleAllResultNotifications(Vector resultNotifications) {
		}
		
	}
	
	
	public void setNode(DefaultDrawableNode node) {
		this.myNode = node;
	}
	
}
