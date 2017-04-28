package com.feup.superslimefootball.model.entities;

/**
 * A model representing a power.
 */
public class PowerModel extends EntityModel {

    public enum PowerType {SPEED, SHRINK, ENLARGE, STOP, EXPLODE, ATTRACTION};

    /**
     * The ammount of time that the power stays available in game.
     */

    private float timeToLive;

    /**
     * The power type of this model.
     */

    private PowerType power;

    /**
     * Creates a new power model in a certain position.
     *
     * @param x the x-coordinate in meters
     * @param y the y-coordinate in meters
     */
    public PowerModel(float x, float y) {
        super(x, y);
    }

    public boolean decreaseTimeToLive(float delta){
        timeToLive -= delta;
        return timeToLive <= 0;
    }

    public void setTimeToLive(float timeToLive){
        this.timeToLive = timeToLive;
    }

    @Override
    public ModelType getType() {
        return ModelType.POWER;
    }

    public PowerType getPowerType() {
        return power;
    }
}
