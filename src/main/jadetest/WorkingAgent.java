package jadetest;

import jade.core.Agent;
import jade.core.behaviours.Behaviour;

public class WorkingAgent extends Agent {

	public void setup() {
		addBehaviour(new WorkingBehaviour());
		
		System.out.println(getLocalName() + ": starting to work!");
	}
	
	public void takeDown() {
		System.out.println(getLocalName() + ": done working.");
	}
	
	class WorkingBehaviour extends Behaviour {
		private int n = 0;
		
		public void action() {
			System.out.println(++n + " I am doing something!");
		}

		public boolean done() {
			return n == 3;
		}
	}
	
}
