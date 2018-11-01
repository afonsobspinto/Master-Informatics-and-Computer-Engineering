package SupplyStationsSimulation.Agents;

import sajas.core.Agent;
import sajas.core.behaviours.Behaviour;

public class Driver extends Agent {
    public Driver() {
    }

    @Override
    public void addBehaviour(Behaviour b) {
        super.addBehaviour(b);
    }

    @Override
    protected void setup() {
        super.setup();
        System.out.println("Driver Agent Launch");
    }

}