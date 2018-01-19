package com.feup.superslimefootball.model.entities;

import java.io.Serializable;

/**
 * The type Walls model.
 */
public class WallsModel extends EntityModel implements Serializable {

    /**
     * Constructs a model with a position and a rotation.
     *
     * @param x The x-coordinate of this entity in pixels.
     * @param y The y-coordinate of this entity in pixels.
     */
    public  WallsModel(float x, float y) {
        super(x, y);
    }

    @Override
    public ModelType getType() {
        return null;
    }
}
