package SupplyStations.Agents.Drivers;


import sajas.core.Agent;
import sajas.core.behaviours.Behaviour;

public class CollaborativeDriver extends Agent {
    public CollaborativeDriver() {
    }

    @Override
    public void addBehaviour(Behaviour b) {
        super.addBehaviour(b);
    }

    @Override
    protected void setup() {
        super.setup();
        System.out.println("Collaborative Driver");
    }

}
