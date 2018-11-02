package SupplyStationsSimulation.Utilities;

import java.util.*;

public class RandomPositionsGenerator {
    private Set<List<Integer>> positions = new HashSet<>();
    private int size, height, width;

    public RandomPositionsGenerator(int size, int width, int height) {
        this.size = size;
        this.height = height;
        this.width = width;
    }

    public LinkedList<List<Integer>> getPositions(){
        Random random = new Random(System.currentTimeMillis());

        for(int i = 0; i < size; i++){
            int randomX = random.nextInt(height + 1);
            int randomY = random.nextInt(width + 1);
            List<Integer> pos = List.of(randomX, randomY);

            if(!positions.add(pos)){
                i--;
            }
        }
        return new LinkedList<>(positions);
    }
}
