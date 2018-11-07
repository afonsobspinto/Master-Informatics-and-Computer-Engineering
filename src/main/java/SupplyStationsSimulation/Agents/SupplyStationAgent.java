package SupplyStationsSimulation.Agents;

import SupplyStationsSimulation.Utilities.Position;
import sajas.core.behaviours.Behaviour;
import uchicago.src.sim.gui.SimGraphics;

import java.awt.*;
import java.util.List;

public class SupplyStationAgent extends DrawableAgent {

    private String nickname;
    private Color color;
    private Position position;
    private int availableGasPumps;
    private int totalGasPumps;

    public SupplyStationAgent(String nickname, Color color, Position initialPosition, int totalPumps) {
        this.nickname = nickname;
        this.color = color;
        this.position = initialPosition;
        this.totalGasPumps = totalPumps;
        this.availableGasPumps = totalPumps;
    }

    @Override
    public void addBehaviour(Behaviour b) {
        super.addBehaviour(b);
    }

    @Override
    protected void setup() {
        super.setup();
        //System.out.println("DriverAgent Agent Launch");
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

    public int getAvailableGasPumps() {
        return availableGasPumps;
    }

    public int getTotalGasPumps() {
        return totalGasPumps;
    }

    public void setAvailableGasPumps(int availableGasPumps) {
        this.availableGasPumps = availableGasPumps;
    }

    public boolean hasAvailableGasPumps(){
        return this.availableGasPumps > 0;
    }

    @Override
    public Type getType() {
        return Type.SUPPLYSTATION;
    }
}
