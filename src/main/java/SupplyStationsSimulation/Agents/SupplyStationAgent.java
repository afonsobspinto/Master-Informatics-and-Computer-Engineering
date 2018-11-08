package SupplyStationsSimulation.Agents;

import SupplyStationsSimulation.Utilities.Position;
import jade.core.Agent;
import jade.domain.FIPAAgentManagement.DFAgentDescription;
import jade.domain.FIPAAgentManagement.ServiceDescription;
import jade.domain.FIPAException;
import jade.lang.acl.ACLMessage;
import sajas.core.behaviours.Behaviour;
import sajas.domain.DFService;
import uchicago.src.sim.gui.SimGraphics;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class SupplyStationAgent extends DrawableAgent {

    private String nickname;
    private Color color;
    private Position position;
    private int totalGasPumps = 4;
    private double pricePerLiter;
    private ArrayList<DriverAgent>currentDriversOnStation = new ArrayList<DriverAgent>();


    public SupplyStationAgent(String nickname, Color color, Position location, double pricePerLiter) {
        this.nickname = nickname;
        this.color = color;
        this.position = location;
        this.pricePerLiter = pricePerLiter;

    }

    public SupplyStationAgent(String nickname, Color color, Position initialPosition, int totalPumps, double pricePerLiter) {
        this.nickname = nickname;
        this.color = color;
        this.position = initialPosition;
        this.totalGasPumps = totalPumps;
        this.pricePerLiter = pricePerLiter;
    }

    @Override
    public void addBehaviour(Behaviour b) {
        super.addBehaviour(b);
    }

    @Override
    protected void setup()
    {
        super.setup();
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
        try{
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

    @Override
    public void handleMessage(ACLMessage message) {

    }

}
