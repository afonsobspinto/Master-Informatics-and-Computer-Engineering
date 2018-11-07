package jadetest;

import jadetest.alterego.AlterEgo;
import jadetest.alterego.AlterEgoOntology;
import jadetest.alterego.SendAlterEgo;

import jade.content.AgentAction;
import jade.content.ContentElement;
import jade.content.lang.Codec;
import jade.content.lang.Codec.CodecException;
import jade.content.lang.leap.LEAPCodec;
import jade.content.lang.sl.SLCodec;
import jade.content.onto.Ontology;
import jade.content.onto.OntologyException;
import jade.content.onto.basic.Action;
import jade.core.Agent;
import jade.lang.acl.ACLMessage;
import jade.lang.acl.MessageTemplate;
import jade.proto.AchieveREResponder;

public class AlterEgoAgent extends Agent {
	
	private Codec codec;
	private Ontology alterEgoOntology;
	private String otherName;

	protected void setup() {
		codec = new SLCodec();   // LEAPCodec();
		alterEgoOntology = AlterEgoOntology.getInstance();
		getContentManager().registerLanguage(codec);
		getContentManager().registerOntology(alterEgoOntology);

		Object[] args = getArguments();
		if(args != null && args.length > 0) {
			otherName = (String) args[0];
		}
		
		MessageTemplate mt = MessageTemplate.and(	MessageTemplate.MatchOntology(alterEgoOntology.getName()),
													MessageTemplate.MatchPerformative(ACLMessage.REQUEST));
		addBehaviour(new SendAlterEgoResp(this, mt));
	}
	
	class SendAlterEgoResp extends AchieveREResponder {

		public SendAlterEgoResp(Agent a, MessageTemplate mt) {
			super(a, mt);
		}
		
		protected ACLMessage prepareResponse(ACLMessage request) {
			return null;
		}
		
		protected ACLMessage prepareResultNotification(ACLMessage request, ACLMessage response) {
			ACLMessage result = request.createReply();
			
			result.setPerformative(ACLMessage.NOT_UNDERSTOOD);
			try {
				ContentElement ce = getContentManager().extractContent(request);
				if(ce instanceof Action) {
					AgentAction action = (AgentAction) ((Action) ce).getAction();
					if(action instanceof SendAlterEgo) {
						SendAlterEgo sae = (SendAlterEgo) action;   // not used in this case
						result.setPerformative(ACLMessage.INFORM);
						AlterEgo ae = new AlterEgo();
						ae.setName(getLocalName());
						ae.setOtherName(otherName);
						try {
							getContentManager().fillContent(result, ae);
						} catch (CodecException e) {
							e.printStackTrace();
						} catch (OntologyException e) {
							e.printStackTrace();
						}
					}
				}
			} catch (CodecException e) {
				e.printStackTrace();
			} catch (OntologyException e) {
				e.printStackTrace();
			}

			return result;
		}

	}
	
}
