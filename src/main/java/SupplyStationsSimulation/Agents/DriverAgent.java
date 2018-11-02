package SupplyStationsSimulation.Agents;

import sajas.core.behaviours.Behaviour;
import uchicago.src.sim.gui.SimGraphics;

import java.awt.*;
import java.util.List;


public class DriverAgent extends DrawableAgent {
    private String nickname;
    private Color color;
    private List<Integer> position;
    public DriverAgent(String nickname, Color color, List initialPosition) {
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
        return position.get(0);
    }

    @Override
    public int getY() {
        return position.get(1);
    }
}