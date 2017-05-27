package com.feup.superslimefootball.model.entities;

/**
 * Created by afonso on 5/27/17.
 */

public class WallsModel extends EntityModel {

    /**
     * Constructs a model with a position and a rotation.
     *
     * @param x        The x-coordinate of this entity in pixels.
     * @param y        The y-coordinate of this entity in pixels.
     * @param rotation The current rotation of this entity in radians.
     */
    public  WallsModel(float x, float y, float rotation) {
        super(x, y, rotation);
    }

    @Override
    public ModelType getType() {
        return null;
    }
}
