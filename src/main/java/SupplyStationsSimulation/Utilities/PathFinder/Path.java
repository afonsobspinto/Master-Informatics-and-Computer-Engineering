package SupplyStationsSimulation.Utilities.PathFinder;

import SupplyStationsSimulation.Utilities.Locations.Position;

import java.util.ArrayList;

public class Path {
    /**
     * The list of steps building up this path
     */
    private ArrayList steps = new ArrayList();

    /**
     * Create an empty path
     */
    public Path() {

    }

    /**
     * Get the length of the path, i.e. the number of steps
     *
     * @return The number of steps in this path
     */
    public int getLength() {
        return steps.size();
    }

    /**
     * Get the Position at a given index in the path
     *
     * @param index The index of the Position to retrieve. Note this should
     *              be >= 0 and < getLength();
     * @return The Position information, the position on the map.
     */
    public Position getStep(int index) {
        return (Position) steps.get(index);
    }

    /**
     * Get the x coordinate for the Position at the given index
     *
     * @param index The index of the Position whose x coordinate should be retrieved
     * @return The x coordinate at the Position
     */
    public int getX(int index) {
        return getStep(index).getX();
    }

    /**
     * Get the y coordinate for the Position at the given index
     *
     * @param index The index of the Position whose y coordinate should be retrieved
     * @return The y coordinate at the Position
     */
    public int getY(int index) {
        return getStep(index).getY();
    }

    /**
     * Append a Position to the path.
     *
     * @param x The x coordinate of the new Position
     * @param y The y coordinate of the new Position
     */
    public void appendStep(int x, int y) {
        steps.add(new Position(x, y));
    }

    /**
     * Prepend a Position to the path.
     *
     * @param x The x coordinate of the new Position
     * @param y The y coordinate of the new Position
     */
    public void prependStep(int x, int y) {
        steps.add(0, new Position(x, y));
    }

    /**
     * Check if this path contains the given Position
     *
     * @param x The x coordinate of the Position to check for
     * @param y The y coordinate of the Position to check for
     * @return True if the path contains the given Position
     */
    public boolean contains(int x, int y) {
        return steps.contains(new Position(x, y));
    }


}
