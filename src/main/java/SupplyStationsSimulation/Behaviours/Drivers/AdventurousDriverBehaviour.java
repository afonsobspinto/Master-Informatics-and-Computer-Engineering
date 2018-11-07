package SupplyStationsSimulation.Behaviours.Drivers;

import SupplyStationsSimulation.Agents.DrawableAgent;
import SupplyStationsSimulation.Agents.DriverAgent;
import sajas.core.Agent;
import sajas.core.behaviours.Behaviour;

public class AdventurousDriverBehaviour extends Behaviour {
    private DriverAgent driverAgent;
    private int tick = 0;

    public AdventurousDriverBehaviour(DriverAgent a) {
        super(a);
        this.driverAgent = a;

    }

    @Override
    public void action() {
        driverAgent.setPosition(driverAgent.getPath().getStep(++tick));
    }

    @Override
    public boolean done() {
        return driverAgent.getPath().getLength()-1 == tick;
    }
}
