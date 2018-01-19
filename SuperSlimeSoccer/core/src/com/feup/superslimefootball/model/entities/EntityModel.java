package com.feup.superslimefootball.model.entities;

import com.badlogic.gdx.math.Vector2;

import java.io.Serializable;

import static com.feup.superslimefootball.view.GameView.PPM;

/**
 * Created by afonso on 5/26/17.
 */
public abstract class EntityModel implements Serializable {

    /**
     * The enum Model type.
     */
    public enum ModelType {
        /**
         * Blueslimeright model type.
         */
        BLUESLIMERIGHT, /**
         * Blueslimeleft model type.
         */
        BLUESLIMELEFT, /**
         * Redslimeright model type.
         */
        REDSLIMERIGHT, /**
         * Redslimeleft model type.
         */
        REDSLIMELEFT, /**
         * Ball model type.
         */
        BALL, /**
         * Goalright model type.
         */
        GOALRIGHT, /**
         * Goalleft model type.
         */
        GOALLEFT, /**
         * Speed model type.
         */
        SPEED};

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
    private boolean flaggedForReset = false;

    /**
     * Has this model been flagged for removal?
     */
    private boolean flaggedForRemoval = false;

    private final Vector2 initialPos;

    /**
     * Constructs a model with a position and a rotation.
     *
     * @param x The x-coordinate of this entity in pixels.
     * @param y The y-coordinate of this entity in pixels.
     */
    EntityModel(float x, float y) {
        this.x = x;
        this.y = y;
        this.initialPos = new Vector2(x / PPM,y / PPM);
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
     * @return boolean
     */
    public boolean isFlaggedToBeRemoved() {
        return flaggedForRemoval;
    }

    /**
     * Makes this model flagged for removal on next step
     *
     * @param flaggedForRemoval the flagged for removal
     */
    public void setFlaggedForRemoval(boolean flaggedForRemoval) {
        this.flaggedForRemoval = flaggedForRemoval;
    }


    /**
     * Returns if this entity has been flagged for reset
     *
     * @return boolean
     */
    public boolean isFlaggedToBeReseted() {
        return flaggedForReset;
    }

    /**
     * Makes this model flagged for reset on next step
     *
     * @param flaggedForReset the flagged for reset
     */
    public void setFlaggedForReset(boolean flaggedForReset) {
        this.flaggedForReset = flaggedForReset;
    }

    /**
     * Returns the initial pos
     *
     * @return inicial pos
     */
    public Vector2 getInicialPos() {
        return initialPos;
    }

    /**
     * Returns the type of the Model
     *
     * @return type
     */
    public abstract ModelType getType();

    /**
     * Returns the initial X in m
     *
     * @return float
     */
    public float getInitialX(){
        return this.initialPos.x*PPM;
    }

    /**
     * Returns the initial Y in m
     *
     * @return float
     */
    public float getInitialY(){
        return this.initialPos.y*PPM;
    }
}
