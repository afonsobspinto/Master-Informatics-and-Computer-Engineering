package com.feup.superslimefootball.model.entities;

/**
 * Created by afonso on 5/26/17.
 */

public abstract class EntityModel {

    public enum ModelType {SLIME, BALL}

    ;

    /**
     * The x-coordinate of this model in meters.
     */
    private float x;

    /**
     * The y-coordinate of this model in meters.
     */
    private float y;

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

    public abstract ModelType getType();


}
