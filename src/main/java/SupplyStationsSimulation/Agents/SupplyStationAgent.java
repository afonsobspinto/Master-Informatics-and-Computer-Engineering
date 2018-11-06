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

    public SupplyStationAgent(String nickname, Color color, Position initialPosition) {
        this.nickname = nickname;
        this.color = color;
        this.position = initialPosition;
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
}
