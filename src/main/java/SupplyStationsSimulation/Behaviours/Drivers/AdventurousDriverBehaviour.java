package SupplyStationsSimulation.Behaviours.Drivers;

import sajas.core.Agent;
import sajas.core.behaviours.Behaviour;

public class AdventurousDriverBehaviour extends Behaviour {
    private boolean isDone = false;

    public AdventurousDriverBehaviour(Agent a) {
        super(a);

    }

    @Override
    public void action() {
        System.out.println("Adventurous Driver Behaviour Action");

    }

    @Override
    public boolean done() {
        return isDone;
    }
}
