package SupplyStationsSimulation.Agents;

import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Behaviours.Drivers.SearchForSupplyStationServicesBehaviour;
import SupplyStationsSimulation.Behaviours.ListeningBehaviour;
import SupplyStationsSimulation.Behaviours.StatisticsBehaviour;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import sajas.core.behaviours.Behaviour;
import uchicago.src.sim.gui.SimGraphics;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class StatisticsAgent extends DrawableAgent {

    private ArrayList<DrawableAgent> agentList;

    public StatisticsAgent(ArrayList<DrawableAgent> agentList) {
        this.agentList = agentList;
    }

    @Override
    protected void setup() {
        super.setup();
        addBehaviour(new StatisticsBehaviour(this, agentList));
    }

    @Override
    public Type getType() {
        return null;
    }

    @Override
    public void handleMessage(Message message) {

    }

    @Override
    public void draw(SimGraphics simGraphics) {

    }

    @Override
    public int getX() {
        return 0;
    }

    @Override
    public int getY() {
        return 0;
    }

    @Override
    public void saveStatistics() {

    }

    @Override
    public void addBehaviour(Behaviour b) {
        super.addBehaviour(b);
    }

    @Override
    public boolean isDone(){
        return false;
    }
}
