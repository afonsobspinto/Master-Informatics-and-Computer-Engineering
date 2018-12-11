package SupplyStationsSimulation.Agents;

import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Behaviours.Drivers.SearchForSupplyStationServicesBehaviour;
import SupplyStationsSimulation.Behaviours.ListeningBehaviour;
import SupplyStationsSimulation.DrawableMap;
import SupplyStationsSimulation.Launcher;
import SupplyStationsSimulation.Statistics.DriverInfo;
import SupplyStationsSimulation.Statistics.Statistics;
import SupplyStationsSimulation.Utilities.Locations.Position;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import SupplyStationsSimulation.Utilities.Messaging.MessageContent;
import SupplyStationsSimulation.Utilities.Messaging.MessageType;
import SupplyStationsSimulation.Utilities.*;
import SupplyStationsSimulation.Utilities.PathFinder.AStarPathFinder;
import SupplyStationsSimulation.Utilities.PathFinder.Path;
import jade.core.AID;
import jade.lang.acl.ACLMessage;
import sajas.core.Agent;
import sajas.core.behaviours.Behaviour;
import uchicago.src.sim.gui.SimGraphics;
import uchicago.src.sim.space.Object2DGrid;

import java.awt.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

import static SupplyStationsSimulation.Agents.DriverAgent.DriverState.*;


public class DriverAgent extends DrawableAgent {


    public enum DriverState {
        INITIALIZING, SEARCHING, REACHING_FUEL, WAITING_REPLY, WAITING_LINE, FUELLING, REACHING_GOAL, TERMINATING
    }

    private String nickname;
    private Color color;
    private Position position;
    private Position destination;
    private DriverState driverState = DriverState.INITIALIZING;
    private Boolean needsFuel = true;
    private Boolean isAttended = false;
    private boolean isWaitingLine = false;
    private static int waitingTimeout = 15;
    private int currentWaitingTimeout = waitingTimeout;
    private static int unresponsiveWaitingTimeout = 100;
    private int ticksToFuel;
    private static double priceIntoleranceDeviation = 0.2;
    private static double priceIntoleranceMean = 1.0;
    private double priceIntolerance = new Random().nextGaussian() * priceIntoleranceDeviation + priceIntoleranceMean;
    private static int maxFuel = 100;
    private static int minFuel = 50;
    private int fuelToBuy = new Random().nextInt(maxFuel) + minFuel;
    private double moneySpent;
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
    private DriverInfo driverInfo;
    private BehaviourType behaviourType;

    public DriverAgent(String nickname, Color color, Position initialPosition, Position destination, DrawableMap map) {
        this.nickname = nickname;
        this.color = color;
        this.position = initialPosition;
        this.destination = destination;
        this.map = map;
        if(this.color == Color.RED)
            behaviourType = BehaviourType.ADVENTUROUS;
        else
            behaviourType = BehaviourType.COLLABORATIVE;
    }

    public void calculateInitialPath() {
        Path path = calculatePath(position, destination);
        if (path != null) {
            this.expectedTravelDuration = path.getLength();
        }
    }

    private void updatePathToFuel() {
        if (this.driverState.equals(DriverState.SEARCHING) || this.driverState.equals(REACHING_FUEL) || this.driverState.equals(WAITING_REPLY) || this.driverState.equals(WAITING_LINE)) {
            Position destination = supplyStationsInfo.get(this.targetSupplyStation).getLocation();
            calculatePath(position, destination);
        }
    }

    private Path calculatePath(Position source, Position destination) {

        Path path = new AStarPathFinder(map, map.getHeightInTiles() * map.getWidthInTiles(), false).findPath(this, source.getX(), source.getY(), destination.getX(), destination.getY());
        if (path != null) {
            this.deFactoTravelDuration += this.pathStep;
            this.pathStep = 0;
            this.path = path;
        }
/*        else{
            //TODO: deal with this (if needed)
            if(source.equals(destination));
            else(somethingWentWrong)
        }*/

        return path;
    }


    private void logTargetSupplyStationChange(AID aid) {
        String oldTarget = "null";
        String newTarget = "null";
        if (targetSupplyStation != null) {
            oldTarget = targetSupplyStation.getLocalName() + " (" + supplyStationsInfo.get(targetSupplyStation).getUtilityFactor().getUtility() + ")";
        }
        if (aid != null) {
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
        this.deFactoTravelDuration += this.pathStep;
        double truncatedMoneySpent = BigDecimal.valueOf(moneySpent).setScale(2, RoundingMode.HALF_UP).doubleValue();
        System.out.println("Agent " + getLocalName() + " was taken down. Expected: " + expectedTravelDuration
                + " ticks; DeFacto: " + deFactoTravelDuration + " ticks; Diff: " + Math.abs(expectedTravelDuration - deFactoTravelDuration)
                + " additional ticks; Money spent: " + truncatedMoneySpent + "€");

        this.color = Color.BLACK;
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

    public int getFuelToBuy() {
        return fuelToBuy;
    }

    public int getExpectedTravelDuration() {
        return expectedTravelDuration;
    }

    public int getDeFactoTravelDuration() {
        return deFactoTravelDuration;
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
            case WAITING_REPLY:
                updateWaitingReply();
            case WAITING_LINE:
                updateWaitingLine();
                break;
            case FUELLING:
                updateFuelling();
                break;
        }
    }


    private void updateState() throws Exception {

        if ((this.driverState.equals(DriverState.FUELLING) && this.ticksToFuel == 0) || !needsFuel) {
            if (!driverState.equals(REACHING_GOAL)) {
                this.path = calculatePath(position, destination);
                this.needsFuel = false;
                this.moneySpent = supplyStationsInfo.get(targetSupplyStation).getPricePerLiter() * fuelToBuy;
                this.targetSupplyStation = null;
                //TODO: Remove all supplyServiceEntrys - currently not necessary as drivers only stop once.
            }
            setDriverState(DriverState.REACHING_GOAL);
            return;
        }

        if (this.targetSupplyStation != null && this.position.equals(this.supplyStationsInfo.get(this.targetSupplyStation).getLocation()) && needsFuel) {
            if (isAttended) {
                if (!driverState.equals(FUELLING)) {
                    this.ticksToFuel = this.supplyStationsInfo.get(this.targetSupplyStation).getTicksToFuel();
                }
                setDriverState(DriverState.FUELLING);

            } else {
                if (isWaitingLine) {
                    setDriverState(WAITING_LINE);
                    return;
                }
                if (!driverState.equals(WAITING_REPLY)) {
                    currentWaitingTimeout = waitingTimeout;
                    new Message(this, this.targetSupplyStation, ACLMessage.PROPOSE, MessageType.ENTRANCE.getTypeStr()).send();
                }
                setDriverState(DriverState.WAITING_REPLY);

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


    private void updatePosition() {
        //TODO: Don't let drivers delete other drivers
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


    private void updateFuelling() {
        logFuelling();
        ticksToFuel--;

    }

    private void updateWaitingLine() {

        logWaiting();
        if (currentWaitingTimeout == 0) {
            currentWaitingTimeout = waitingTimeout;
            isWaitingLine = false;
        }
        currentWaitingTimeout--;
    }

    private void updateWaitingReply() {

        logWaiting();
        if (currentWaitingTimeout == 0) {
            updateTicksTargetSupplyStation(this.supplyStationsInfo.get(targetSupplyStation).getTicksToFuel() + unresponsiveWaitingTimeout);
            updatePathToFuel();
            currentWaitingTimeout = waitingTimeout;
            return;

        }
        currentWaitingTimeout--;
    }

    private void logWaiting() {
        System.out.println(new Timestamp().getCurrentTime() + " - " + this.nickname +
                " is waiting " + currentWaitingTimeout + " ticks for " + this.targetSupplyStation.getLocalName());
    }

    private void logFuelling() {
        System.out.println(new Timestamp().getCurrentTime() + " - " + this.nickname +
                " is fuelling for the next " + ticksToFuel + " ticks");
    }

    private void setDriverState(DriverState driverState) {
        if (!this.driverState.equals(driverState)) {
            logState(driverState);
            this.driverState = driverState;
        }
    }

    private void logState(DriverState nextState) {
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
        if(this.driverState.equals(FUELLING) || this.driverState.equals(REACHING_GOAL)){
            return;
        }
        SupplyStationInfo currentSupplyStationInfo = this.supplyStationsInfo.get(newSupplyStationInfo.getAid());
        if (currentSupplyStationInfo == null || !currentSupplyStationInfo.equals(newSupplyStationInfo)) {
            this.supplyStationsInfo.put(newSupplyStationInfo.getAid(), newSupplyStationInfo);
            addAndUpdateTargetSupplyStation(currentSupplyStationInfo, newSupplyStationInfo);
        }
    }

    private void addAndUpdateTargetSupplyStation(SupplyStationInfo currentSupplyStationInfo, SupplyStationInfo newSupplyStationInfo) {
        if(this.driverState.equals(FUELLING) || this.driverState.equals(REACHING_GOAL)){
            return;
        }
        if (currentSupplyStationInfo != null) {
            this.supplyStationQueue.remove(currentSupplyStationInfo.getUtilityFactor());
        }
        this.supplyStationQueue.add(new UtilityFactor(newSupplyStationInfo, this.position, this.priceIntolerance, this.destination, this.fuelToBuy));
        assert this.supplyStationQueue.peek() != null;
        AID bestSupplyStation = this.supplyStationQueue.peek().getAid();
        if (bestSupplyStation == newSupplyStationInfo.getAid()) {
            logTargetSupplyStationChange(newSupplyStationInfo.getAid());
            this.targetSupplyStation = newSupplyStationInfo.getAid();
            updatePathToFuel();
        }
    }

    @Override
    public boolean isDone() {
        if (this.position.equals(this.destination)) {
            this.setDriverState(TERMINATING);
            takeDown();
            return true;
        }
        return false;
    }

    public Position getDestination() {
        return destination;
    }

    public DriverState getDriverState() {
        return driverState;
    }

    public void handleInform(Message message) {
        MessageContent messageContent = new MessageContent(message);
        if (messageContent.getMessageType() == MessageType.INFO) {
            List<String> contentObjects = messageContent.getContetObjects();
            int x = Integer.parseInt(contentObjects.get(0));
            int y = Integer.parseInt(contentObjects.get(1));
            double price = Double.parseDouble(contentObjects.get(2));
            this.addSupplyStationsInfo(new SupplyStationInfo(message.getSenderAID(),
                    new Position(x, y), price, this.getPosition(),
                    this.getPriceIntolerance(), this.getDestination()));

        }
    }


    public void handleAccept(Message message) {
        MessageContent messageContent = new MessageContent(message);
        if (messageContent.getMessageType() == MessageType.ENTRANCE) {
            List<String> contentObjects = messageContent.getContetObjects();
            int ticksToFuel = Integer.parseInt(contentObjects.get(1));
            this.handleAccept(ticksToFuel);
        }
    }

    private void handleAccept(int ticksToFuel) {
        if (updateTicksTargetSupplyStation(ticksToFuel)) {
            updatePathToFuel();
            disconfirm();
        } else
            acknowledgeAccpet();
    }

    public void handleReject(Message message, MethodInterface methodInterface) {
        MessageContent messageContent = new MessageContent(message);
        if (messageContent.getMessageType() == MessageType.ENTRANCE) {
            List<String> contentObjects = messageContent.getContetObjects();
            int ticksToFuel = Integer.parseInt(contentObjects.get(1));
            int waitingLine = Integer.parseInt(contentObjects.get(2));
            int totalGasPumps = Integer.parseInt(contentObjects.get(3));
            this.handleReject(methodInterface.averageWaitingTime(totalGasPumps, ticksToFuel, waitingLine));
        }
    }

    private void handleReject(int ticks) {
        if (updateTicksTargetSupplyStation(ticks)) {
            updatePathToFuel();
            disconfirm();
        } else
            acknowledgeReject(ticks);
    }

    public boolean updateTicksTargetSupplyStation(int ticks) {
        SupplyStationInfo currentSupplyStationInfo = this.supplyStationsInfo.get(targetSupplyStation);
        SupplyStationInfo newSupplyStationInfo = new SupplyStationInfo(currentSupplyStationInfo.getAid(),
                currentSupplyStationInfo.getLocation(), currentSupplyStationInfo.getPricePerLiter(),
                this.getPosition(), this.priceIntolerance, this.destination, ticks);


        this.supplyStationQueue.remove(currentSupplyStationInfo.getUtilityFactor());
        this.supplyStationQueue.add(new UtilityFactor(newSupplyStationInfo, this.position, this.priceIntolerance, this.destination, this.fuelToBuy));
        assert this.supplyStationQueue.peek() != null;
        AID bestSupplyStation = this.supplyStationQueue.peek().getAid();
        if (bestSupplyStation != newSupplyStationInfo.getAid()) {
            logTargetSupplyStationChange(bestSupplyStation);
            this.targetSupplyStation = bestSupplyStation;
            return true;
        } else {
            return false;
        }
    }

    public void acknowledgeAccpet() {
        new Message(this, this.targetSupplyStation, ACLMessage.CONFIRM, MessageType.ENTRANCE.getTypeStr()).send();
        this.isAttended = true;
    }

    public void acknowledgeReject(int waitingLine) {
        new Message(this, this.targetSupplyStation, ACLMessage.CONFIRM, MessageType.WAITLINE.getTypeStr()).send();
        this.currentWaitingTimeout = waitingLine;
        this.isWaitingLine = true;
    }

    public void disconfirm() {
        new Message(this, this.targetSupplyStation, ACLMessage.DISCONFIRM, MessageType.ENTRANCE.getTypeStr()).send();
    }


    public ArrayList<DrawableAgent> getAgentList() {
        return this.map.getAgentList();
    }

    public List<AID> getDriversList() {
        return getAgentList().stream().filter(drawableAgent -> drawableAgent.getType() == Type.DRIVER).map(Agent::getAID).collect(Collectors.toList());

    }

    public SupplyStationInfo getTargetSupplyStationInfo() {
        return this.supplyStationsInfo.get(this.targetSupplyStation);
    }

    public void saveStatistics(){
        Statistics statistics = Statistics.getInstance();
        this.driverInfo = new DriverInfo(priceIntolerance, fuelToBuy, destination,
                driverState, Math.abs(expectedTravelDuration - deFactoTravelDuration), behaviourType);
        statistics.updateAgentInfo(this.getAID(), this.driverInfo);
    }

}