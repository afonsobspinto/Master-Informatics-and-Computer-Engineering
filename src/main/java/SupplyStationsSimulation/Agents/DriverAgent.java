package SupplyStationsSimulation.Agents;

import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Behaviours.Drivers.SearchForSupplyStationServicesBehaviour;
import SupplyStationsSimulation.Behaviours.ListeningBehaviour;
import SupplyStationsSimulation.DrawableMap;
import SupplyStationsSimulation.Utilities.PathFinder.AStarPathFinder;
import SupplyStationsSimulation.Utilities.PathFinder.Path;
import SupplyStationsSimulation.Utilities.Position;
import jade.core.AID;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;
import uchicago.src.sim.gui.SimGraphics;

import java.awt.*;
import java.util.ArrayList;


public class DriverAgent extends DrawableAgent {
    private String nickname;
    private Color color;
    private Position position;
    private Position destination;
    private Boolean needsFuel = true;
    private Path path;
    private DrawableMap map;
    private ArrayList<ACLMessageBehaviour> behaviours = new ArrayList<>();
    private int expectedTravelDuration;
    private ArrayList<AID> supplyStationsServices = new ArrayList<>();

    public DriverAgent(String nickname, Color color, Position initialPosition, Position destination, DrawableMap map) {
        this.nickname = nickname;
        this.color = color;
        this.position = initialPosition;
        this.destination = destination;
        this.map = map;
    }

    public void calculatePath(){
        this.path = new AStarPathFinder(map, map.getHeightInTiles()* map.getWidthInTiles(), false).findPath(this, position.getX(), position.getY(), destination.getX(), destination.getY());
        this.expectedTravelDuration = path.getLength();
    }

    @Override
    public void addBehaviour(Behaviour b) {
        super.addBehaviour(b);
        if(b instanceof ACLMessageBehaviour)
            behaviours.add((ACLMessageBehaviour)b);
    }

    @Override
    protected void setup() {
        super.setup();
        addBehaviour(new ListeningBehaviour(this));
        addBehaviour(new SearchForSupplyStationServicesBehaviour(this, 5));
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

    @Override
    public void handleMessage(ACLMessage message) {
        for(ACLMessageBehaviour behaviour: behaviours){
            behaviour.handleMessage(message);
        }
    }

    public Path getPath() {
        return path;
    }

    public void setPosition(Position position) {
        this.map.getSpace().putObjectAt(this.position.getX(), this.position.getY(), null);
        this.position = position;
        this.map.getSpace().putObjectAt(this.position.getX(), this.position.getY(), this);

    }

    public void setSupplyStationsServices(ArrayList<AID> supplyStationsServices) {
        this.supplyStationsServices = supplyStationsServices;
    }

    public Boolean getNeedsFuel() {
        return needsFuel;
    }

    public ArrayList<AID> getSupplyStationsServices() {
        return supplyStationsServices;
    }
}