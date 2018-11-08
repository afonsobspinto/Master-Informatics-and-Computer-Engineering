package SupplyStationsSimulation.Agents;


import SupplyStationsSimulation.Utilities.PathFinder.Mover;
import jade.lang.acl.ACLMessage;
import sajas.core.Agent;
import uchicago.src.sim.gui.Drawable;

public abstract class DrawableAgent extends Agent implements Drawable, Mover {
    public abstract Type getType();
    public abstract void handleMessage(ACLMessage message);
}
