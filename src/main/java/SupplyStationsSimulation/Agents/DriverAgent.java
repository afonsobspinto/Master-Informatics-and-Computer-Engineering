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
import SupplyStationsSimulation.Utilities.SupplyStationInfo;
import SupplyStationsSimulation.Utilities.UtilityComparator;
import SupplyStationsSimulation.Utilities.UtilityFactor;
import jade.core.AID;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;
import uchicago.src.sim.gui.SimGraphics;
import uchicago.src.sim.space.Object2DGrid;

import java.awt.*;
import java.util.*;


public class DriverAgent extends DrawableAgent {


    public enum DriverState {
        INITIALIZING, SEARCHING, REACHING_FUEL, FUELLING, REACHING_GOAL, TERMINATING
    }

    private DriverState driverState = DriverState.INITIALIZING;
    private Boolean needsFuel = true;
    private int ticksToFuel;
    private String nickname;
    private Color color;
    private Position position;
    private Position destination;
    private static double priceIntoleranceDeviation = 0.2;
    private static double priceIntoleranceMean = 1.0;
    private double priceIntolerance = new Random().nextGaussian() * priceIntoleranceDeviation + priceIntoleranceMean;
    private Path path;
    private int pathStep;
    private DrawableMap map;
    private ArrayList<ACLMessageBehaviour> behaviours = new ArrayList<>();
    private int expectedTravelDuration;
    private int deFactoTravelDuration = 0;
    private ArrayList<AID> supplyStationsServicesAIDs = new ArrayList<>();
    private Map<AID, SupplyStationInfo> supplyStationsInfo = new HashMap<>();
    private PriorityQueue<UtilityFactor> supplyStationQueue = new PriorityQueue<>(1, new UtilityComparator());
    private AID targetSupplyStation;

    public DriverAgent(String nickname, Color color, Position initialPosition, Position destination, DrawableMap map) {
        this.nickname = nickname;
        this.color = color;
        this.position = initialPosition;
        this.destination = destination;
        this.map = map;
    }

    public void calculatePath() throws Exception {
        Path path = new AStarPathFinder(map, map.getHeightInTiles() * map.getWidthInTiles(), false).findPath(this, position.getX(), position.getY(), destination.getX(), destination.getY());
        if (validatePath(path)) {
            this.path = path;
            this.expectedTravelDuration = path.getLength();
        }
    }

    private void updatePath() {
        if (this.driverState.equals(DriverState.SEARCHING) || this.driverState.equals(DriverState.REACHING_FUEL)) {
            Position destination = supplyStationsInfo.get(this.targetSupplyStation).getLocation();
            Path path = new AStarPathFinder(map, map.getHeightInTiles() * map.getWidthInTiles(), false).findPath(this, position.getX(), position.getY(), destination.getX(), destination.getY());
            try {
                if (validatePath(path)) {
                    this.deFactoTravelDuration += this.pathStep;
                    this.pathStep = 0;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

        }

    }

    private boolean validatePath(Path path) throws Exception {
        if (path != null) {
            this.path = path;
            return true;
        }
        if (this.targetSupplyStation != null) {
            this.supplyStationQueue.remove(this.supplyStationsInfo.get(targetSupplyStation).getUtilityFactor());
            if (this.supplyStationQueue.peek() != null) {
                this.targetSupplyStation = this.supplyStationQueue.peek().getAid();
            }
        }

        throw new Exception("Invalid Path");
    }

    @Override
    public void addBehaviour(Behaviour b) {
        super.addBehaviour(b);
        if (b instanceof ACLMessageBehaviour)
            behaviours.add((ACLMessageBehaviour) b);
    }

    @Override
    protected void setup() {
        super.setup();
        addBehaviour(new ListeningBehaviour(this));
        addBehaviour(new SearchForSupplyStationServicesBehaviour(this, 5));
    }

    @Override
    public void takeDown() {
        super.takeDown();
        System.out.println("Agent " + getAID() + " is terminating...");
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
        for (ACLMessageBehaviour behaviour : behaviours) {
            behaviour.handleMessage(message);
        }
    }

    public Path getPath() {
        return path;
    }

    public Position getPosition() {
        return position;
    }

    public double getPriceIntolerance() {
        return priceIntolerance;
    }

    public void updatePosition() {
        Object2DGrid space = this.map.getSpace();

        space.putObjectAt(this.position.getX(), this.position.getY(), null);
        this.position = path.getStep(++pathStep);
        Object objectNextPos = space.getObjectAt(this.position.getX(), this.position.getY());
        if (objectNextPos == null || !((DrawableAgent) objectNextPos).getType().equals(Type.SUPPLYSTATION)) {
            space.putObjectAt(this.position.getX(), this.position.getY(), this);
        }

    }


    public void updateState() throws Exception {
        if(this.targetSupplyStation == null && this.needsFuel){
            this.driverState = DriverState.SEARCHING;
            return;
        }

        if(this.targetSupplyStation != null && needsFuel){
            this.driverState = DriverState.REACHING_FUEL;
            return;
        }

        if(this.position.equals(this.supplyStationsInfo.get(this.targetSupplyStation).getLocation())){
            this.driverState = DriverState.FUELLING;
            return;
        }
        if(this.driverState.equals(DriverState.FUELLING) && this.ticksToFuel==0){
            this.driverState = DriverState.REACHING_GOAL;
            return;
        }

        if(this.isDone()){
            this.driverState = DriverState.TERMINATING;
            this.takeDown();
        }

        throw new Exception("Unknonw Driver State");
    }


    public void setSupplyStationsServicesAIDs(ArrayList<AID> supplyStationsServicesAIDs) {
        this.supplyStationsServicesAIDs = supplyStationsServicesAIDs;
        for (AID aid : supplyStationsServicesAIDs) {
            new Message(this, aid, ACLMessage.REQUEST, MessageType.INFO.getTypeStr()).send();
        }

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

    public void addSupplyStationsInfo(AID aid, SupplyStationInfo supplyStationInfo) {
        SupplyStationInfo currentSupplyStationInfo = this.supplyStationsInfo.get(aid);

        if (currentSupplyStationInfo == null || !currentSupplyStationInfo.equals(supplyStationInfo)) {
            this.supplyStationsInfo.put(aid, supplyStationInfo);
            if (currentSupplyStationInfo != null) {
                this.supplyStationQueue.remove(currentSupplyStationInfo.getUtilityFactor());
            }
            this.supplyStationQueue.add(new UtilityFactor(supplyStationInfo, this.position, this.priceIntolerance, this.destination));
            UtilityFactor bestUtilityFactor = this.supplyStationQueue.peek();
            if (bestUtilityFactor == null || bestUtilityFactor.getAid().equals(aid)) {
                this.targetSupplyStation = aid;
                updatePath();
            }

        }
    }


    public boolean isDone() {

        return path.getLength()-1 == pathStep;

        //TODO: return this.position.equals(this.destination);
    }

    public Position getDestination() {
        return destination;
    }

    public DriverState getDriverState() {
        return driverState;
    }


}