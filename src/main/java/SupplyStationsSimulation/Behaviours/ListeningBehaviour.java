package SupplyStationsSimulation.Behaviours;

import SupplyStationsSimulation.Agents.DrawableAgent;
import SupplyStationsSimulation.Utilities.Message;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.CyclicBehaviour;

public class ListeningBehaviour extends CyclicBehaviour {
    private static final long serialVersionUID = 1L;
    private DrawableAgent agent;

    public ListeningBehaviour(DrawableAgent agent) {
        super(agent);
        this.agent = agent;
    }

    @Override
    public void action() {

        ACLMessage msg = myAgent.receive();
        if (msg == null)
            return;

        System.out.println(new Message(this.agent, msg));

    }
}
