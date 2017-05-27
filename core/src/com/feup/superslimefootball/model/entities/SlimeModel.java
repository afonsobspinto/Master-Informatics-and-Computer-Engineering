package com.feup.superslimefootball.model.entities;

/**
 * Created by afonso on 5/26/17.
 */

public class SlimeModel extends EntityModel {

    /**
     * Constructs a model with a position and a rotation.
     *
     * @param x        The x-coordinate of this entity in meters.
     * @param y        The y-coordinate of this entity in meters.
     * @param rotation The current rotation of this entity in radians.
     */
    public SlimeModel(float x, float y, float rotation) {
        super(x, y, rotation);
    }

    @Override
    public ModelType getType() {
        return ModelType.SLIME;
    }
}
