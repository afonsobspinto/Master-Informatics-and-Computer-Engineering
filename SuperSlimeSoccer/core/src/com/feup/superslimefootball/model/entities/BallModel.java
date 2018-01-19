package com.feup.superslimefootball.model.entities;

import java.io.Serializable;

/**
 * The type Ball model.
 */
public class BallModel extends EntityModel implements Serializable {

    private float timer;

    /**
     * Constructs a model with a position and a rotation.
     *
     * @param x The x-coordinate of this entity in pixels.
     * @param y The y-coordinate of this entity in pixels.
     */
    public BallModel(float x, float y) {
        super(x, y);
        this.timer = 0;
    }

    @Override
    public ModelType getType() {
        return ModelType.BALL;
    }

    /**
     * Increases this ball's time by delta seconds
     *
     * @param n the n
     * @return
     */
    public void setTimer(int n) {
        if(n == 1)
            timer += n;
        else
            timer = 0;
    }

    /**
     * Returns the timer
     *
     * @return float
     */
    public float getTimer(){
        return timer;
    }
}
