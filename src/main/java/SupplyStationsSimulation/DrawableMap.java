package SupplyStationsSimulation;

import SupplyStationsSimulation.Agents.DrawableAgent;
import uchicago.src.sim.space.Object2DGrid;
import java.util.ArrayList;

public class DrawableMap {
    private ArrayList<DrawableAgent>agentList = new ArrayList<>();
    private Object2DGrid space;
    public DrawableMap(int width, int height) {
        this.space = new Object2DGrid(width, height);
    }

    public void addAgent(DrawableAgent agent){
        agentList.add(agent);
        space.putObjectAt(agent.getX(), agent.getY(), agent);
    }


    public Object2DGrid getSpace(){
        return space;
    }

    public ArrayList<DrawableAgent> getAgentList() {
        return agentList;
    }
}
