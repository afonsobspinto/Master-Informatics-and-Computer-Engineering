package jadetest;

import java.util.Vector;

import jadetest.alterego.AlterEgo;
import jadetest.alterego.AlterEgoOntology;
import jadetest.alterego.SendAlterEgo;

import jade.content.ContentElement;
import jade.content.lang.Codec;
import jade.content.lang.Codec.CodecException;
import jade.content.lang.leap.LEAPCodec;
import jade.content.lang.sl.SLCodec;
import jade.content.onto.Ontology;
import jade.content.onto.OntologyException;
import jade.content.onto.basic.Action;
import jade.core.AID;
import jade.core.Agent;
import jade.lang.acl.ACLMessage;
import jade.proto.AchieveREInitiator;

public class AlterEgoRequesterAgent extends Agent {
	
	private Codec codec;
	private Ontology alterEgoOntology;

	protected void setup() {
		codec = new SLCodec();   // LEAPCodec();
		alterEgoOntology = AlterEgoOntology.getInstance();
		getContentManager().registerLanguage(codec);
		getContentManager().registerOntology(alterEgoOntology);

		addBehaviour(new SendAlterEgoInit(this, new ACLMessage(ACLMessage.REQUEST)));
	}
	
	class SendAlterEgoInit extends AchieveREInitiator {

		public SendAlterEgoInit(Agent a, ACLMessage msg) {
			super(a, msg);
		}

		protected Vector<ACLMessage> prepareRequests(ACLMessage msg) {
			Vector<ACLMessage> v = new Vector<ACLMessage>();
			
			msg.setLanguage(codec.getName());
			msg.setOntology(alterEgoOntology.getName());

			AID to = new AID("aeagent", false);
			msg.addReceiver(to);
			
			SendAlterEgo sae = new SendAlterEgo();
			Action action = new Action(to, sae);
			try {
				getContentManager().fillContent(msg, action);
			} catch (CodecException e) {
				e.printStackTrace();
			} catch (OntologyException e) {
				e.printStackTrace();
			}
			
			v.add(msg);
			return v;
		}
		
		protected void handleInform(ACLMessage inform) {
			try {
				ContentElement ce = getContentManager().extractContent(inform);
				if(ce instanceof AlterEgo) {
					AlterEgo ae = (AlterEgo) ce;
					System.out.print(ae.getName() + " -> " + ae.getOtherName());
				}
			} catch (CodecException e) {
				e.printStackTrace();
			} catch (OntologyException e) {
				e.printStackTrace();
			}
		}

	}
	
}
