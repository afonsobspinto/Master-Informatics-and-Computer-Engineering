package SupplyStationsSimulation.Agents;

import SupplyStationsSimulation.DrawableMap;
import SupplyStationsSimulation.Utilities.PathFinder.AStarPathFinder;
import SupplyStationsSimulation.Utilities.PathFinder.Path;
import SupplyStationsSimulation.Utilities.Position;
import sajas.core.behaviours.Behaviour;
import uchicago.src.sim.gui.SimGraphics;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;


public class DriverAgent extends DrawableAgent {
    private String nickname;
    private Color color;
    private Position position;
    private Position destination;
    private Position supplyStation = null;
    private Boolean needsFuel = true;
    private Path path;
    private ArrayList<SupplyStationAgent> knownSupplyStations;
    private DrawableMap map;

    public DriverAgent(String nickname, Color color, Position initialPosition, Position destination, DrawableMap map) {
        this.nickname = nickname;
        this.color = color;
        this.position = initialPosition;
        this.destination = destination;
        this.map = map;
    }

    public void calculatePath(){
        this.path = new AStarPathFinder(map, map.getHeightInTiles()* map.getWidthInTiles(), false).findPath(this, position.getX(), position.getY(), destination.getX(), destination.getY());
    }

    @Override
    public void addBehaviour(Behaviour b) {
        super.addBehaviour(b);
    }

    @Override
    protected void setup() { super.setup();
    }

    @Override
    public void draw(SimGraphics simGraphics) {
        simGraphics.drawCircle(color);
    }

    @Override
    public int getX() {
        return position.getX();
    }

    @Override
    public int getY() {
        return position.getY();
    }

    @Override
    public Type getType() {
        return Type.DRIVER;
    }

    public Boolean getNeedsFuel() {
        return needsFuel;
    }

    public Path getPath() {
        return path;
    }

    public void setPosition(Position position) {
        this.map.getSpace().putObjectAt(this.position.getX(), this.position.getY(), null);
        this.position = position;
        this.map.getSpace().putObjectAt(this.position.getX(), this.position.getY(), this);

    }
}