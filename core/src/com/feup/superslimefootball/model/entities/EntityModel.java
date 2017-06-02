package com.feup.superslimefootball.model.entities;

/**
 * Created by afonso on 5/26/17.
 */

public abstract class EntityModel {

    public enum ModelType {BLUESLIMERIGHT, BLUESLIMELEFT,REDSLIMERIGHT, REDSLIMELEFT, BALL, GOALRIGHT, GOALLEFT, SPEED};

    /**
     * The x-coordinate of this model in meters.
     */
    protected float x;

    /**
     * The y-coordinate of this model in meters.
     */
    protected float y;

    /**
     * Has this model been flagged for removal?
     */
    private boolean flaggedForRemoval = false;

    /**
     * Constructs a model with a position and a rotation.
     *
     * @param x        The x-coordinate of this entity in pixels.
     * @param y        The y-coordinate of this entity in pixels.
     */
    EntityModel(float x, float y) {
        this.x = x;
        this.y = y;
    }


    /**
     * Returns the x-coordinate of this entity.
     *
     * @return The x-coordinate of this entity in meters.
     */
    public float getX() {
        return x;
    }

    /**
     * Returns the y-coordinate of this entity.
     *
     * @return The y-coordinate of this entity in meters.
     */
    public float getY() {
        return y;
    }


    /**
     * Sets the position of this entity.
     *
     * @param x The x-coordinate of this entity in pixels.
     * @param y The y-coordinate of this entity in pixels.
     */
    public void setPosition(float x, float y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Returns if this entity has been flagged for removal
     *
     * @return
     */
    public boolean isFlaggedToBeRemoved() {
        return flaggedForRemoval;
    }

    /**
     * Makes this model flagged for removal on next step
     */
    public void setFlaggedForRemoval(boolean flaggedForRemoval) {
        System.out.println("Flag");
        this.flaggedForRemoval = flaggedForRemoval;
    }

    public abstract ModelType getType();


}
