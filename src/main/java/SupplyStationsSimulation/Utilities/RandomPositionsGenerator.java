package SupplyStationsSimulation.Utilities;

import java.util.*;

public class RandomPositionsGenerator {
    private Set<Position> positions = new HashSet<>();
    private int size, height, width;

    public RandomPositionsGenerator(int size, int width, int height) {
        this.size = size;
        this.height = height;
        this.width = width;
    }

    public LinkedList<Position> getPositions(){
        Random random = new Random(System.currentTimeMillis());

        for(int i = 0; i < size; i++){
            int randomX = random.nextInt(height);
            int randomY = random.nextInt(width);
            Position pos = new Position(randomX, randomY);

            if(!positions.add(pos)){
                i--;
            }
        }
        return new LinkedList<>(positions);
    }
}
