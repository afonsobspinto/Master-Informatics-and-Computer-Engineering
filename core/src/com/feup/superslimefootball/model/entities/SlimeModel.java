package com.feup.superslimefootball.model.entities;

import com.badlogic.gdx.graphics.Color;
import com.feup.superslimefootball.controller.GameController;

import java.io.Serializable;

/**
 * Created by afonso on 5/26/17.
 */

public class SlimeModel extends EntityModel implements Serializable {

    public enum SlimeState {JUMPING, RUNNING};

    public enum OrientationState {LEFT, RIGHT};

    /**
     * The slime state in this update delta
     */
    private SlimeState slimeState;

    /**
     * The slime orientation state in this update delta
     */
    private OrientationState orientationState;

    /**
     * The slime power type state in this update delta
     */
    private PowerModel.PowerType power;

    /**
     * The slime color
     */


    private transient Color color;


    /**

     * Constructs a model with a position and a rotation.
     *
     * @param x        The x-coordinate of this entity in pixels.
     * @param y        The y-coordinate of this entity in pixels.

     */
    public SlimeModel(float x, float y) {

        super(x, y);

        this.orientationState = (x > GameController.GAME_WIDTH / 2) ? orientationState.LEFT : orientationState.RIGHT;
    }

    /**
     * Gets the slime state in this update delta
     */
    public SlimeState getSlimeState() {
        return slimeState;
    }

    /**
     * Sets the slime state in this update delta
     */
    public void setSlimeState(SlimeState currentState) {
        this.slimeState = currentState;
    }

    /**
     * Gets the orientation slime state in this update delta
     */
    public OrientationState getOrientationState() {
        return orientationState;
    }

    /**
     * Sets the orientation slime state in this update delta
     */
    public void setOrientationState(OrientationState orientationState) {
        this.orientationState = orientationState;
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
        if(power == PowerModel.PowerType.SPEED);
    }

    /**
     * Sets the slime color
     */

    public void setColor(Color color) {
        this.color = color;
    }


    @Override
    public ModelType getType() {
        if(color == Color.BLUE)
            return  (orientationState == OrientationState.RIGHT) ? ModelType.BLUESLIMERIGHT: ModelType.BLUESLIMELEFT;
        if(color == Color.RED)
            return  (orientationState == OrientationState.RIGHT) ? ModelType.REDSLIMERIGHT: ModelType.REDSLIMELEFT;

        return null;
    }


}
