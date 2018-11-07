package SupplyStationsSimulation.Utilities.PathFinder;

public interface PathFinder {

    public Path findPath(Mover mover, int sx, int sy, int tx, int ty);
}