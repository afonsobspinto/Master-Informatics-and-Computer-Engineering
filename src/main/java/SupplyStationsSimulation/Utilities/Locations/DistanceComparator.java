package SupplyStationsSimulation.Utilities.Locations;

import SupplyStationsSimulation.Agents.SupplyStationAgent;

import java.util.Comparator;

public class DistanceComparator implements Comparator<SupplyStationAgent> {

    private Position position;

    public DistanceComparator(Position position) {
        this.position = position;
    }

    @Override
    public int compare(SupplyStationAgent o1, SupplyStationAgent o2) {
        float distance1 = new EuclideanDistance().getDistance(o1.getX(), o1.getY(), position.getX(), position.getY());
        float distance2 = new EuclideanDistance().getDistance(o2.getX(), o2.getY(), position.getX(), position.getY());
        return Float.compare(distance1, distance2);
    }
}
