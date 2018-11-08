package SupplyStationsSimulation.Utilities.Locations;

public class EuclideanDistance {
    public float getDistance(int x1, int y1, int x2, int y2){
        float dx = x2 - x1;
        float dy = y2 - y1;

        return (float) (Math.sqrt((dx*dx)+(dy*dy)));
    }
}
