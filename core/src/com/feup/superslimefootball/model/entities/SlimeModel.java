package com.feup.superslimefootball.model.entities;

/**
 * Created by afonso on 5/26/17.
 */

public class SlimeModel extends EntityModel {

    public enum State {JUMPING, RUNNING, POWER};
    /**
     * The slime state in this update delta
     */
    private State currentState;

    /**
     * The slime power type state in this update delta
     */
    private PowerModel.PowerType power;

    /**
     * Constructs a model with a position and a rotation.
     *
     * @param x        The x-coordinate of this entity in pixels.
     * @param y        The y-coordinate of this entity in pixels.

     */
    public SlimeModel(float x, float y) {

        super(x, y);
        this.currentState = State.RUNNING;
    }

    /**
     * Gets the slime state in this update delta
     */
    public State getCurrentState() {
        return currentState;
    }

    /**
     * Sets the slime state in this update delta
     */
    public void setCurrentState(State currentState) {
        this.currentState = currentState;
    }

    /**
     * Gets the slime power type state in this update delta
     */

    public PowerModel.PowerType getPowerType() {
        return power;
    }

    /**
     * Sets the slime power in this update delta
     */
    public void setPowerType(PowerModel.PowerType power) {
        this.power = power;
    }

    @Override
    public ModelType getType() {
        return ModelType.SLIME;
    }
}
