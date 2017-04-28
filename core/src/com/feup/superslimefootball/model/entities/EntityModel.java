package com.feup.superslimefootball.model.entities;

/**
 * An abstract model representing an entity belonging to a game model.
 */

public abstract class EntityModel {
    /**
     * The x-coordinate of this model in meters.
     */
    private float x;

    /**
     * The y-coordinate of this model in meters.
     */
    private float y;

    /**
     * Constructs a model with a position.
     *
     * @param x The x-coordinate of this entity in meters.
     * @param y The y-coordinate of this entity in meters.
     */
    EntityModel(float x, float y) {
        this.x = x;
        this.y = y;
    }
}
