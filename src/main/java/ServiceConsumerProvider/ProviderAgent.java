package ServiceConsumerProvider;

import sajas.domain.DFService;
import jade.domain.FIPAException;
import jade.domain.FIPANames;
import jade.domain.FIPAAgentManagement.DFAgentDescription;
import jade.domain.FIPAAgentManagement.ServiceDescription;
import jade.lang.acl.ACLMessage;
import jade.lang.acl.MessageTemplate;
import sajas.proto.AchieveREInitiator;
import sajas.proto.AchieveREResponder;
import sajas.proto.ContractNetResponder;
import sajas.proto.SSContractNetResponder;
import sajas.proto.SSIteratedAchieveREResponder;
import sajas.proto.SSResponderDispatcher;
import ServiceConsumerProvider.draw.Edge;
import ServiceConsumerProvider.onto.ServiceExecutionRequest;
import ServiceConsumerProvider.onto.ServiceOntology;
import ServiceConsumerProvider.onto.ServiceProposal;
import ServiceConsumerProvider.onto.ServiceProposalRequest;
import uchicago.src.sim.network.DefaultDrawableNode;

import java.awt.Color;
import java.util.Random;

import jade.content.AgentAction;
import jade.content.ContentElement;
import jade.content.lang.Codec;
import jade.content.lang.Codec.CodecException;
import jade.content.lang.sl.SLCodec;
import jade.content.onto.Ontology;
import jade.content.onto.OntologyException;
import jade.content.onto.basic.Action;
import jade.core.AID;
import sajas.core.Agent;
import sajas.core.behaviours.Behaviour;

public class ProviderAgent extends Agent {
	
	private static final long serialVersionUID = 1L;

	private static final Random random = new Random(System.currentTimeMillis());
	
	private String providedService = "bla";
	
	private double failureProbability;// = random.nextDouble();
	private boolean subContract = false;
	
	private Codec codec;
	private Ontology serviceOntology;

	DefaultDrawableNode myNode;
	
	public ProviderAgent(double failureProbability) {
		this.failureProbability = failureProbability;
	}
	
	@Override
	public void setup() {
		
		// register language and ontology
		codec = new SLCodec();
		serviceOntology = ServiceOntology.getInstance();
		getContentManager().registerLanguage(codec);
		getContentManager().registerOntology(serviceOntology);
		
		// register provider at DF
		DFAgentDescription dfd = new DFAgentDescription();
		dfd.setName(getAID());
		dfd.addProtocols(FIPANames.InteractionProtocol.FIPA_CONTRACT_NET);
		ServiceDescription sd = new ServiceDescription();
		sd.setName(getLocalName() + "-service-provider");
		sd.setType("service-provider");
		dfd.addServices(sd);
		try {
			DFService.register(this, dfd);
		} catch (FIPAException e) {
			System.err.println(e.getMessage());
		}
		
		// behaviours
		addBehaviour(new CNetResponderDispatcher(this));
		addBehaviour(new RequestResponderDispatcher(this));
	}
	
	@Override
	protected void takeDown() {
		try {
			DFService.deregister(this);
		} catch (FIPAException e) {
			e.printStackTrace();
		}
	}
	
	
	private class CNetResponderDispatcher extends SSResponderDispatcher {

		private static final long serialVersionUID = 1L;

		public CNetResponderDispatcher(Agent agent) {
			super(agent, 
					MessageTemplate.and(
							ContractNetResponder.createMessageTemplate(FIPANames.InteractionProtocol.FIPA_CONTRACT_NET),
							MessageTemplate.MatchOntology(ServiceOntology.ONTOLOGY_NAME)));
		}

		@Override
		protected Behaviour createResponder(ACLMessage cfp) {
			return new CNetResp(myAgent, cfp);
		}

	}
	
	
	private class CNetResp extends SSContractNetResponder {

		private static final long serialVersionUID = 1L;

		private boolean expectedSuccessfulExecution;
		
		public CNetResp(Agent a, ACLMessage cfp) {
			super(a, cfp);
		}

		@Override
		protected ACLMessage handleCfp(ACLMessage cfp) {
			ACLMessage reply = cfp.createReply();

			ServiceProposalRequest serviceProposalRequest = null;
			try {
				serviceProposalRequest = (ServiceProposalRequest) getContentManager().extractContent(cfp);
			} catch (CodecException | OntologyException e) {
				e.printStackTrace();
			}

			if(serviceProposalRequest != null && serviceProposalRequest.getServiceName().equals(providedService)) {
				reply.setPerformative(ACLMessage.PROPOSE);
				// propose random price
				double proposedPrice = (1-failureProbability) * random.nextDouble();   // tends to make better (lower) proposals if more prone to failure
				ServiceProposal serviceProposal = new ServiceProposal(providedService, proposedPrice);
				try {
					getContentManager().fillContent(reply, serviceProposal);
				} catch (CodecException | OntologyException e) {
					e.printStackTrace();
				}

				// randomize execution in case this proposal is accepted
				randomizeExecution(serviceProposalRequest);
			} else {
				reply.setPerformative(ACLMessage.REFUSE);
			}

			return reply;
		}
		
		@Override
		protected ACLMessage handleAcceptProposal(ACLMessage cfp, ACLMessage propose, ACLMessage accept) {
			ACLMessage result = accept.createReply();
			
			// random service execution
			if(expectedSuccessfulExecution) {
				result.setPerformative(ACLMessage.INFORM);
			} else {
				result.setPerformative(ACLMessage.FAILURE);
			}
			
			return result;
		}
		
		@Override
		protected void handleRejectProposal(ACLMessage cfp, ACLMessage propose, ACLMessage accept) {
		}
		
		private void randomizeExecution(ServiceProposalRequest serviceProposalRequest) {
			// random service execution
			if(random.nextDouble() < failureProbability) {
				expectedSuccessfulExecution = false;

				// going to fail if accepted -- subcontract?
				if(subContract) {
					// search provider
					DFAgentDescription template = new DFAgentDescription();
					ServiceDescription sd = new ServiceDescription();
					sd.setType("service-provider");
					template.addServices(sd);
					DFAgentDescription[] dfads = null;
					try {
						dfads = DFService.search(myAgent, template);
					} catch (FIPAException e1) {
						e1.printStackTrace();
					}
					if(dfads != null && dfads.length > 0) {
						// randomize subcontracted provider
						AID subcontractedProvider = dfads[(int) (random.nextDouble()*dfads.length)].getName();

						// creqte request message
						ACLMessage request = new ACLMessage(ACLMessage.REQUEST);
						request.setLanguage(codec.getName());
						request.setOntology(serviceOntology.getName());
						request.setProtocol(FIPANames.InteractionProtocol.FIPA_REQUEST);
						request.addReceiver(subcontractedProvider);
						//
						ServiceExecutionRequest serviceExecutionRequest = new ServiceExecutionRequest(serviceProposalRequest.getServiceName());
						Action act = new Action(subcontractedProvider, serviceExecutionRequest);
						try {
							getContentManager().fillContent(request, act);
						} catch (CodecException | OntologyException e) {
							e.printStackTrace();
						}

						// register request protocol for subcontracting, in case the proposal is actually accepted
						registerHandleAcceptProposal(new RequestInit(myAgent, this, request));
					}

				}

				// change subcontract intention so that subcontracting is not always the case
				subContract = !subContract;

			} else {
				expectedSuccessfulExecution = true;
			}
			
		}

	}
	
	
	private class RequestInit extends AchieveREInitiator {

		private static final long serialVersionUID = 1L;
		
		private CNetResp toReply;
		private AID subContractedProvider;
		
		public RequestInit(Agent a, CNetResp toReply, ACLMessage msg) {
			super(a, msg);
			this.toReply = toReply;
			this.subContractedProvider = (AID) msg.getAllReceiver().next();
		}
		
		@Override
		public void onStart() {
			super.onStart();
			
			// create edge
			if(myNode != null) {
				DefaultDrawableNode to = Repast3ServiceConsumerProviderLauncher.getNode(subContractedProvider.getLocalName());
				Edge edge = new Edge(myNode, to);
				edge.setColor(Color.ORANGE);
				myNode.addOutEdge(edge);
			}
		}
		
		@Override
		protected void handleRefuse(ACLMessage refuse) {
			ACLMessage reply = ((ACLMessage) getDataStore().get(toReply.ACCEPT_PROPOSAL_KEY)).createReply();
			reply.setPerformative(ACLMessage.FAILURE);
			getDataStore().put(toReply.REPLY_KEY, reply);
		}

		@Override
		protected void handleFailure(ACLMessage failure) {
			ACLMessage reply = ((ACLMessage) getDataStore().get(toReply.ACCEPT_PROPOSAL_KEY)).createReply();
			reply.setPerformative(ACLMessage.FAILURE);
			getDataStore().put(toReply.REPLY_KEY, reply);
		}

		@Override
		protected void handleInform(ACLMessage inform) {
			ACLMessage reply = ((ACLMessage) getDataStore().get(toReply.ACCEPT_PROPOSAL_KEY)).createReply();
			reply.setPerformative(ACLMessage.INFORM);
			getDataStore().put(toReply.REPLY_KEY, reply);
		}
		
		public int onEnd() {
			// remove edge
			if(myNode != null) {
				myNode.removeEdgesTo(Repast3ServiceConsumerProviderLauncher.getNode(subContractedProvider.getLocalName()));
			}
			
			return super.onEnd();
		}
		
	}

	
	private class RequestResponderDispatcher extends SSResponderDispatcher {

		private static final long serialVersionUID = 1L;

		public RequestResponderDispatcher(Agent agent) {
			super(agent, 
					MessageTemplate.and(
							AchieveREResponder.createMessageTemplate(FIPANames.InteractionProtocol.FIPA_REQUEST),
							MessageTemplate.MatchOntology(ServiceOntology.ONTOLOGY_NAME)));
		}

		@Override
		protected Behaviour createResponder(ACLMessage request) {
			return new RequestResp(myAgent, request);
		}

	}

	
	private class RequestResp extends SSIteratedAchieveREResponder {

		private static final long serialVersionUID = 1L;

		public RequestResp(Agent a, ACLMessage request) {
			super(a, request);
		}

		@Override
		protected ACLMessage handleRequest(ACLMessage request) {
			ACLMessage reply = request.createReply();

			ServiceExecutionRequest serviceExecutionRequest = null;
			try {
				ContentElement ce = getContentManager().extractContent(request);
				if(ce instanceof Action) {
					AgentAction action = (AgentAction) ((Action) ce).getAction();
					if(action instanceof ServiceExecutionRequest) {
						serviceExecutionRequest = (ServiceExecutionRequest) action;
					}
				}
			} catch (CodecException | OntologyException e) {
				e.printStackTrace();
			}

			if(serviceExecutionRequest != null && serviceExecutionRequest.getServiceName().equals(providedService)) {
				if(random.nextDouble() < failureProbability) {
					reply.setPerformative(ACLMessage.FAILURE);
				} else {
					reply.setPerformative(ACLMessage.INFORM);
				}
			} else {
				reply.setPerformative(ACLMessage.REFUSE);
			}
			
			return reply;
		}
		
	}


	public void setNode(DefaultDrawableNode node) {
		this.myNode = node;
	}

}
