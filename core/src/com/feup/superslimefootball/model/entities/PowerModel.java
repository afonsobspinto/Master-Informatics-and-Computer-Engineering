package com.feup.superslimefootball.model.entities;

/**
 * Created by afonso on 5/29/17.
 */

public class PowerModel extends EntityModel {

    /**
     * Possible POWER types.
     */
    public enum PowerType {SPEED}


    /**
     * This POWER types.
     */
    private PowerType powerType;


    /**
     * Constructs a model with a position and a rotation.
     *
     * @param x The x-coordinate of this entity in pixels.
     * @param y The y-coordinate of this entity in pixels.
     * @param powerType The type of this power.
     */
    public PowerModel(float x, float y, PowerType powerType) {
        super(x, y);
        this.powerType = powerType;
    }

    @Override
    public ModelType getType() {
        if (powerType == PowerType.SPEED)
            return ModelType.SPEED;
        return null;
    }

    /**
     * Returns the type of this power.
     *
     * @return The type of this power.
     */

    public PowerType getPowerType() {
        return powerType;
    }
}
