package com.feup.superslimefootball.model.entities;

/**
 * A model representing a slime.
 */
public class FloorModel extends EntityModel {

    /**
     * Creates a new Floor
     *
     * @param x the x-coordinate in meters
     * @param y the y-coordinate in meters
     */
    public FloorModel(float x, float y) {
        super(x, y);
    }


    @Override
    public ModelType getType() {
        return ModelType.FLOOR;
    }
}
