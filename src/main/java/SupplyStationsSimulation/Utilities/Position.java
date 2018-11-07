package SupplyStationsSimulation.Utilities;

public class Position {
    private int x;
    private int y;

    public Position(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }


    public int hashCode() {
        return x*y;
    }


    public boolean equals(Object other) {
        if (other instanceof Position) {
            Position o = (Position) other;

            return (o.x == x) && (o.y == y);
        }

        return false;
    }
}
