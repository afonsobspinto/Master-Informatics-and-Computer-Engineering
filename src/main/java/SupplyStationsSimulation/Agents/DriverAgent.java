package SupplyStationsSimulation.Agents;

import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Behaviours.Drivers.SearchForSupplyStationServicesBehaviour;
import SupplyStationsSimulation.Behaviours.ListeningBehaviour;
import SupplyStationsSimulation.DrawableMap;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import SupplyStationsSimulation.Utilities.Messaging.MessageType;
import SupplyStationsSimulation.Utilities.PathFinder.AStarPathFinder;
import SupplyStationsSimulation.Utilities.PathFinder.Path;
import SupplyStationsSimulation.Utilities.Locations.Position;
import jade.core.AID;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;
import uchicago.src.sim.gui.SimGraphics;

import java.awt.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


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
    private ArrayList<AID> supplyStationsServicesAIDs = new ArrayList<>();
    private Map<AID, Position> supplyStationsLocation = new HashMap<>();
    private AID targetSupplyStation;

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
    public void handleMessage(Message message) {
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

    public void setSupplyStationsServicesAIDs(ArrayList<AID> supplyStationsServicesAIDs) {
        this.supplyStationsServicesAIDs = supplyStationsServicesAIDs;
        for(AID aid: supplyStationsServicesAIDs){
            new Message(this, aid, ACLMessage.REQUEST, MessageType.POSITION.getTypeStr()).send();
        }

    }

    public Boolean getNeedsFuel() {
        return needsFuel;
    }

    public ArrayList<AID> getSupplyStationsServicesAIDs() {
        return supplyStationsServicesAIDs;
    }

    public AID getTargetSupplyStation() {
        return targetSupplyStation;
    }

    public void setTargetSupplyStation(AID targetSupplyStation) {
        this.targetSupplyStation = targetSupplyStation;
    }

    public Map<AID, Position> getSupplyStationsLocation() {
        return supplyStationsLocation;
    }

    public void addSupplyStationsLocation(AID aid, Position supplyStationsLocation) {
        this.supplyStationsLocation.put(aid, supplyStationsLocation);
    }
}