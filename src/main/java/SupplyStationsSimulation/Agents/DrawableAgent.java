package SupplyStationsSimulation.Agents;


import SupplyStationsSimulation.Utilities.Messaging.Message;
import SupplyStationsSimulation.Utilities.PathFinder.Mover;
import sajas.core.Agent;
import uchicago.src.sim.gui.Drawable;

public abstract class DrawableAgent extends Agent implements Drawable, Mover {
    public abstract Type getType();
    public abstract void handleMessage(Message message);
    public abstract void saveStatistics();
    public abstract boolean isDone();
}
