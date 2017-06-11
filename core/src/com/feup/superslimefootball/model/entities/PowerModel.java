package com.feup.superslimefootball.model.entities;

import java.io.Serializable;
import java.util.Random;

public class PowerModel extends EntityModel implements Serializable {

    private float timeToLive;


    /**
     * Possible POWER types.
     */
    public enum PowerType {SPEED;

        public static PowerType getRandomPowerType()  {
            return PowerType.values()[new Random().nextInt(PowerType.values().length)];
        }
    }


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
        this.timeToLive = 10f;
    }

    /**
     * Decreases this power's time to leave by delta seconds
     *
     * @param delta
     * @return
     */
    public boolean decreaseTimeToLive(float delta) {
        timeToLive -= delta;
        return  timeToLive < 0;
    }

    /**
     * Sets this power's time to live in seconds
     * @param timeToLive
     */
    public void setTimeToLive(float timeToLive) {
        this.timeToLive = timeToLive;
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
