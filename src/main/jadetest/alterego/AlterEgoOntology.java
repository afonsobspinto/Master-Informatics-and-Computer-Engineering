package jadetest.alterego;

import jade.content.onto.BeanOntology;
import jade.content.onto.BeanOntologyException;
import jade.content.onto.Ontology;

public class AlterEgoOntology extends BeanOntology {
	
	public static final String ONTOLOGY_NAME = "alter-ego";
	
	// Singleton instance of this ontology
	private static Ontology theInstance = new AlterEgoOntology();
	
	// Method to access the singleton ontology object
	public static Ontology getInstance() {
		return theInstance;
	}
	
	// Private constructor
	private AlterEgoOntology() {
		super(ONTOLOGY_NAME);
		
		try {
			// add all Concept, Predicate and AgentAction in the current package
			add(this.getClass().getPackage().getName());
			
		} catch(BeanOntologyException boe) {
			boe.printStackTrace();
		}
	}
	
}
