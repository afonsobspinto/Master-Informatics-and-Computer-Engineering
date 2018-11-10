package SupplyStationsSimulation;

import SupplyStationsSimulation.Agents.DrawableAgent;
import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Agents.SupplyStationAgent;
import SupplyStationsSimulation.Agents.Type;
import SupplyStationsSimulation.Utilities.PathFinder.Mover;
import SupplyStationsSimulation.Utilities.PathFinder.TileBasedMap;
import uchicago.src.collection.BaseMatrix;
import uchicago.src.sim.space.Object2DGrid;
import java.util.ArrayList;

public class DrawableMap implements TileBasedMap {
    private ArrayList<DrawableAgent>agentList = new ArrayList<>();
    private Object2DGrid space;
    private int width;
    private int height;
    private boolean[][] visited;

    public DrawableMap(int width, int height) {
        this.space = new Object2DGrid(width, height);
        this.width = width;
        this.height = height;
        visited = new boolean[width][height];

    }

    public void addAgent(DrawableAgent agent){
        agentList.add(agent);
        space.putObjectAt(agent.getX(), agent.getY(), agent);
    }

    public ArrayList<DrawableAgent> getAgentList() {
        return agentList;
    }

    public Object2DGrid getSpace(){
        return space;
    }


    @Override
    public int getWidthInTiles() {
        return this.width;
    }

    @Override
    public int getHeightInTiles() {
        return this.height;
    }

    public void clearVisited() {
        for (int x=0;x<getWidthInTiles();x++) {
            for (int y=0;y<getHeightInTiles();y++) {
                visited[x][y] = false;
            }
        }
    }

    @Override
    public void pathFinderVisited(int x, int y) {
        visited[x][y] = true;

    }

    @Override
    public boolean blocked(Mover mover, int x, int y) {
        for(DrawableAgent agent: agentList){
            if(agent.getX()==x && agent.getY() == y)
                if(agent.getType()== Type.DRIVER)
                    return true;
        }
        return false;
    }

    @Override
    public float getCost(Mover mover, int sx, int sy, int tx, int ty) {
        return 1;
    }
}
