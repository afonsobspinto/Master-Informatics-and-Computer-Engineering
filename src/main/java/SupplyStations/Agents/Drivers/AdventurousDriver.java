package SupplyStations.Agents.Drivers;

import sajas.core.Agent;
import sajas.core.behaviours.Behaviour;

public class AdventurousDriver extends Agent {
    public AdventurousDriver() {
    }

    @Override
    public void addBehaviour(Behaviour b) {
        super.addBehaviour(b);
    }

    @Override
    protected void setup() {
        super.setup();
        System.out.println("Adventurous Driver");
    }

}