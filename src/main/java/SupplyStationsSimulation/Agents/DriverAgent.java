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
import SupplyStationsSimulation.Utilities.Timestamp;
import SupplyStationsSimulation.Utilities.UtilityComparator;
import SupplyStationsSimulation.Utilities.UtilityFactor;
import jade.core.AID;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;
import uchicago.src.sim.gui.SimGraphics;
import uchicago.src.sim.space.Object2DGrid;

import java.awt.*;
import java.util.*;

import static SupplyStationsSimulation.Agents.DriverAgent.DriverState.REACHING_FUEL;
import static SupplyStationsSimulation.Agents.DriverAgent.DriverState.WAITING;


public class DriverAgent extends DrawableAgent {

    public enum DriverState {
        INITIALIZING, SEARCHING, REACHING_FUEL, WAITING, FUELLING, REACHING_GOAL, TERMINATING
    }

    private String nickname;
    private Color color;
    private Position position;
    private Position destination;
    private DriverState driverState = DriverState.INITIALIZING;
    private Boolean needsFuel = true;
    private Boolean isAttended = false;
    private static int waitingTimeoutDeviation = 2;
    private static int waitingTimeoutMean = 5;
    private int waitingTimeout = Math.abs((int) (new Random().nextGaussian() * waitingTimeoutDeviation + waitingTimeoutMean)) + 1; //TODO: is abs + 1 necessary?
    private int currentWaitingTimeout = waitingTimeout;
    private int ticksToFuel;
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

    public void calculatePath() {
        Path path = new AStarPathFinder(map, map.getHeightInTiles() * map.getWidthInTiles(), false).findPath(this, position.getX(), position.getY(), destination.getX(), destination.getY());
        if (path != null) {
            this.path = path;
            this.expectedTravelDuration = path.getLength();
        }
    }

    private void updatePath() {
        if (this.driverState.equals(DriverState.SEARCHING) || this.driverState.equals(REACHING_FUEL) || this.driverState.equals(WAITING)) {
            Position destination = supplyStationsInfo.get(this.targetSupplyStation).getLocation();
            Path path = new AStarPathFinder(map, map.getHeightInTiles() * map.getWidthInTiles(), false).findPath(this, position.getX(), position.getY(), destination.getX(), destination.getY());
            if (path != null) {
                this.deFactoTravelDuration += this.pathStep;
                this.pathStep = 0;
                this.path = path;
            }
//            else{
//                //TODO: Add behaviour for situations where you can't reach the goal - Currently this cannot happen.
//            }
        }
    }


    private void logTargetSupplyStationChange(AID aid) {
        String oldTarget = "null";
        String newTarget = "null";
        if (targetSupplyStation != null) {
            oldTarget = targetSupplyStation.getLocalName() + " (" + supplyStationsInfo.get(targetSupplyStation).getUtilityFactor().getUtility() + ")";
        }
        if(aid!=null){
            newTarget = aid.getLocalName() + supplyStationsInfo.get(aid).getUtilityFactor();
        }

        System.out.println(new Timestamp().getCurrentTime() + " - " + this.nickname +
                " targetSupplyStation changed from " + oldTarget + " to " + newTarget);
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

    public Position getPosition() {
        return position;
    }

    public double getPriceIntolerance() {
        return priceIntolerance;
    }

    public void update() {

        try {
            this.updateState();
        } catch (Exception e) {
            e.printStackTrace();
        }


        switch (this.driverState) {
            case INITIALIZING:
            case SEARCHING:
                return;
            case REACHING_FUEL:
            case REACHING_GOAL:
                updatePosition();
                break;
            case WAITING:
                updateWaiting();
                break;
            case FUELLING:
                ticksToFuel--;
        }


    }

    private void updatePosition() {
        Object2DGrid space = this.map.getSpace();

        Object objectCurrentPos = space.getObjectAt(this.position.getX(), this.position.getY());
        if (objectCurrentPos == null || !((DrawableAgent) objectCurrentPos).getType().equals(Type.SUPPLYSTATION)) {
            space.putObjectAt(this.position.getX(), this.position.getY(), null);
        }
        this.position = path.getStep(++pathStep);
        Object objectNextPos = space.getObjectAt(this.position.getX(), this.position.getY());
        if (objectNextPos == null || !((DrawableAgent) objectNextPos).getType().equals(Type.SUPPLYSTATION)) {
            space.putObjectAt(this.position.getX(), this.position.getY(), this);
        }
    }

    private void updateWaiting() {
        logWaiting();
        if (currentWaitingTimeout == 0) {
            removeAndupdateTargetSupplyStation();
            currentWaitingTimeout = waitingTimeout;
        }
        currentWaitingTimeout--;
    }

    private void logWaiting() {
        System.out.println(new Timestamp().getCurrentTime() + " - " + this.nickname +
                " is waiting " + currentWaitingTimeout + " ticks for " + this.targetSupplyStation.getLocalName());
    }


    private void updateState() throws Exception {

        if (this.isDone()) {
            setDriverState(DriverState.TERMINATING);
            this.takeDown();
        }

        if ((this.driverState.equals(DriverState.FUELLING) && this.ticksToFuel == 0) || !needsFuel) {
            setDriverState(DriverState.REACHING_GOAL);
            return;
        }

        if (this.targetSupplyStation != null && this.position.equals(this.supplyStationsInfo.get(this.targetSupplyStation).getLocation()) && needsFuel) {
            if (isAttended) {
                setDriverState(DriverState.FUELLING);
            } else {
                setDriverState(DriverState.WAITING);
            }
            return;
        }

        if (this.targetSupplyStation != null && needsFuel) {
            setDriverState(REACHING_FUEL);
            return;
        }

        if (this.targetSupplyStation == null && needsFuel) {
            setDriverState(DriverState.SEARCHING);
            return;
        }


        throw new Exception("Unknown Driver State");
    }

    private void setDriverState(DriverState driverState) {
        logState(driverState);
        this.driverState = driverState;
    }

    private void logState(DriverState nextState) {
        if (!driverState.equals(nextState))
            System.out.println(new Timestamp().getCurrentTime() + " - " + this.nickname + " changed from " + driverState + " to " + nextState);
    }

    public void setSupplyStationsServicesAIDs(ArrayList<AID> supplyStationsServicesAIDs) {
        this.supplyStationsServicesAIDs = supplyStationsServicesAIDs;
        for (AID aid : supplyStationsServicesAIDs) {
            if (supplyStationsInfo.get(aid) == null) {
                new Message(this, aid, ACLMessage.REQUEST, MessageType.INFO.getTypeStr()).send();
            }
        }
    }

    public void addSupplyStationsInfo(SupplyStationInfo newSupplyStationInfo) {
        SupplyStationInfo currentSupplyStationInfo = this.supplyStationsInfo.get(newSupplyStationInfo.getAid());
        if (currentSupplyStationInfo == null || !currentSupplyStationInfo.equals(newSupplyStationInfo)) {
            this.supplyStationsInfo.put(newSupplyStationInfo.getAid(), newSupplyStationInfo);
            addAndUpdateTargetSupplyStation(currentSupplyStationInfo, newSupplyStationInfo);
        }
    }

    private void addAndUpdateTargetSupplyStation(SupplyStationInfo currentSupplyStationInfo, SupplyStationInfo newSupplyStationInfo) {
        if (currentSupplyStationInfo != null) {
            this.supplyStationQueue.remove(currentSupplyStationInfo.getUtilityFactor());
        }
        this.supplyStationQueue.add(new UtilityFactor(newSupplyStationInfo, this.position, this.priceIntolerance, this.destination));
        assert this.supplyStationQueue.peek() != null;
        AID bestSupplyStation = this.supplyStationQueue.peek().getAid();
        if (bestSupplyStation == newSupplyStationInfo.getAid()) {
            logTargetSupplyStationChange(newSupplyStationInfo.getAid());
            this.targetSupplyStation = newSupplyStationInfo.getAid();
            updatePath();
        }
    }

    private void removeAndupdateTargetSupplyStation() {
        if (targetSupplyStation != null) {
            this.supplyStationQueue.remove(this.supplyStationsInfo.get(targetSupplyStation).getUtilityFactor());
        }
        UtilityFactor bestSupplyStation = this.supplyStationQueue.peek();
        if (bestSupplyStation != null) {
            logTargetSupplyStationChange(bestSupplyStation.getAid());
            this.targetSupplyStation = bestSupplyStation.getAid();
            updatePath();
        } else {
            logTargetSupplyStationChange(null);
            this.targetSupplyStation = null;
        }
    }


    public boolean isDone() {
        return this.position.equals(this.destination);
    }

    public Position getDestination() {
        return destination;
    }

    public DriverState getDriverState() {
        return driverState;
    }


}