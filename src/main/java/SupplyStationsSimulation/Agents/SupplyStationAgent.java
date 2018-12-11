package SupplyStationsSimulation.Agents;

import SupplyStationsSimulation.Behaviours.ACLMessageBehaviour;
import SupplyStationsSimulation.Behaviours.ListeningBehaviour;
import SupplyStationsSimulation.Statistics.DriverInfo;
import SupplyStationsSimulation.Statistics.Statistics;
import SupplyStationsSimulation.Statistics.SupplyStationInfo;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import SupplyStationsSimulation.Utilities.Locations.Position;
import SupplyStationsSimulation.Utilities.Messaging.MessageContent;
import SupplyStationsSimulation.Utilities.Messaging.MessageType;
import jade.core.AID;
import jade.domain.FIPAAgentManagement.DFAgentDescription;
import jade.domain.FIPAAgentManagement.ServiceDescription;
import jade.domain.FIPAException;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;
import sajas.domain.DFService;
import uchicago.src.sim.gui.SimGraphics;

import java.awt.*;
import java.util.*;
import java.util.List;

public class SupplyStationAgent extends DrawableAgent {

    private String nickname;
    private Color color;
    private Position position;

    private static int totalGasMin = 2;
    private static int totalGasMax = 6;
    private int totalGasPumps = new Random().nextInt(totalGasMax) + totalGasMin;

    private static double pricePerLiterDeviation = 1.0;
    private static double pricePerLiterMean = 1.6;
    private double pricePerLiter = Math.abs(new Random().nextGaussian() * pricePerLiterDeviation + pricePerLiterMean);

    private static int maxTicksToFuel = 50;
    private static int minTicksToFuel = 4;
    private int ticksToFuel = new Random().nextInt(maxTicksToFuel) + minTicksToFuel;

    private Map<AID, Integer> currentDriversOnStation = new HashMap<>();
    private Set<AID> currentDriversWaiting = new HashSet<>();
    private ArrayList<ACLMessageBehaviour> behaviours = new ArrayList<>();

    private int totalRequests = 0;
    private int lastUsers = 0;
    private static int fuelAdded = 50;
    private double totalIncoming = 0;
    private int totalDisconfirms = 0;
    private SupplyStationInfo supplyStationInfo;
    private BehaviourType behaviourType;

    public SupplyStationAgent(String nickname, Color color, Position location) {
        this.nickname = nickname;
        this.color = color;
        this.position = location;
        this.pricePerLiter = pricePerLiter;
        this.behaviourType = behaviourType;
        if(this.color == Color.GREEN)
            behaviourType = BehaviourType.STATIC;
        else
            behaviourType = BehaviourType.DYNAMIC;
    }


    @Override
    public void addBehaviour(Behaviour b) {
        super.addBehaviour(b);
        if (b instanceof ACLMessageBehaviour) {
            behaviours.add((ACLMessageBehaviour) b);
        }
    }

    @Override
    protected void setup() {
        super.setup();
        addBehaviour(new ListeningBehaviour(this));

        DFAgentDescription dfd = new DFAgentDescription();
        dfd.setName(getAID());
        ServiceDescription sd = new ServiceDescription();
        sd.setType("fuel-selling");
        sd.setName("SupplyStations");
        dfd.addServices(sd);
        try {
            DFService.register(this, dfd);
        } catch (FIPAException e) {
            e.printStackTrace();
        }
    }


    @Override
    protected void takeDown() {
        super.takeDown();
        try {
            DFService.deregister(this);
        } catch (FIPAException e) {
            e.printStackTrace();
        }
        System.out.println("Supply Station Agent" + getAID().getName() + " terminating.");
    }

    @Override
    public void draw(SimGraphics simGraphics) {
        simGraphics.drawHollowRect(color);
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
        return Type.SUPPLYSTATION;
    }

    public void handleMessage(Message message) {

        switch (message.getPerformative()) {
            case ACLMessage.REQUEST:
                handleRequest(message);
                break;
            case ACLMessage.PROPOSE:
                handlePropose(message);
                break;
            case ACLMessage.CONFIRM:
                handleConfirm(message);
                break;
            case ACLMessage.DISCONFIRM:
                handleDisconfirm(message);
                break;
        }

    }

    @Override
    public boolean isDone() {
        return false;
    }

    private void handleRequest(Message message) {
        if (message.getContent().equals(MessageType.INFO.getTypeStr())) {
            List<String> listOf = List.of(String.valueOf(getX()),
                    String.valueOf(getY()),
                    String.valueOf(getPricePerLiter()));
            new Message(this, message.getSenderAID(), ACLMessage.INFORM,
                    new MessageContent(MessageType.INFO, listOf).getContent()).send();
        }
    }

    private void handlePropose(Message message) {
        if (message.getContent().equals(MessageType.ENTRANCE.getTypeStr())) {
            if (isAvailable()) {
                List<String> listOf = List.of(String.valueOf(getOccupation()),
                        String.valueOf(getTicksToFuel()),
                        String.valueOf(getTotalGasPumps()));
                new Message(this, message.getSenderAID(), ACLMessage.ACCEPT_PROPOSAL,
                        new MessageContent(MessageType.ENTRANCE, listOf).getContent()).send();
            } else {
                List<String> listOf = List.of(String.valueOf(getOccupation()),
                        String.valueOf(getTicksToFuel()),
                        String.valueOf(getWaitingListSize()),
                        String.valueOf(getTotalGasPumps()));
                new Message(this, message.getSenderAID(), ACLMessage.REJECT_PROPOSAL,
                        new MessageContent(MessageType.ENTRANCE, listOf).getContent()).send();
            }
        }
    }

    private void handleConfirm(Message message) {
        if (message.getContent().equals(MessageType.ENTRANCE.getTypeStr())) {
            getCurrentDriversWaiting().remove(message.getSenderAID());
            addDriver(message.getSenderAID());
        }
        if (message.getContent().equals(MessageType.WAITLINE.getTypeStr())) {
            addDriverWaiting(message.getSenderAID());
        }
    }

    private void handleDisconfirm(Message message) {
        if (message.getContent().equals(MessageType.ENTRANCE.getTypeStr())) {
            increaseTotalDisconfirms();
        }
    }

    public Position getPosition() {
        return position;
    }

    public double getPricePerLiter() {
        return pricePerLiter;
    }

    public boolean isAvailable() {
        return (this.totalGasPumps - this.currentDriversOnStation.size()) > 0;
    }

    public int getTicksToFuel() {
        return this.ticksToFuel;
    }

    public int getTotalGasPumps() {
        return this.totalGasPumps;
    }

    public int getOccupation() {
        return this.currentDriversOnStation.size();
    }

    public int getWaitingListSize() {
        return this.currentDriversWaiting.size();
    }

    public int getTotalRequests() { return totalRequests;  }

    public void addDriver(AID driverAID) {
        this.currentDriversOnStation.put(driverAID, ticksToFuel);
        this.totalIncoming += fuelAdded * this.pricePerLiter;
    }

    public void addDriverWaiting(AID driverAID) {
        this.currentDriversWaiting.add(driverAID);
    }

    public void increaseTotalDisconfirms() {
        totalDisconfirms++;
    }

    public void updateDrivers() {
        List<AID> elementsToRemove = new ArrayList<AID>();
        for (Map.Entry<AID, Integer> entry : currentDriversOnStation.entrySet()) {
            if (entry.getValue() == 0) {
                elementsToRemove.add(entry.getKey());
            } else {
                currentDriversOnStation.put(entry.getKey(), entry.getValue() - 1);
            }
        }
        for (AID element : elementsToRemove) {
            currentDriversOnStation.remove(element);
        }
    }

    public Set<AID> getCurrentDriversWaiting() {
        return currentDriversWaiting;
    }

    public void updatePrice() {

        //todo: improve formula -> price should decrease as well.
        double oldPrice = this.pricePerLiter;
        this.pricePerLiter = (totalRequests * 0.05) + oldPrice;
    }

    public void saveStatistics(){
        Statistics statistics = Statistics.getInstance();
        this.supplyStationInfo = new SupplyStationInfo(pricePerLiter, ticksToFuel, totalRequests, behaviourType);
        statistics.updateAgentInfo(this.getAID(), this.supplyStationInfo);
    }
}
