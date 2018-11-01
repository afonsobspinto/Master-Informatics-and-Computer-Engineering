package SupplyStationsSimulation.Behaviours.Drivers;

import sajas.core.Agent;
import sajas.core.behaviours.Behaviour;

public class CollaborativeDriverBehaviour extends Behaviour {

    private boolean isDone = false;

    public CollaborativeDriverBehaviour(Agent a) {
        super(a);

    }

    @Override
    public void action() {
        System.out.println("Collaborative Driver Behaviour Action");

    }

    @Override
    public boolean done() {
        return isDone;
    }
}
