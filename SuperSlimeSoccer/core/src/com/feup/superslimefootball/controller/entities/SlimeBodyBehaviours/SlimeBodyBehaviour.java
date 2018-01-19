package com.feup.superslimefootball.controller.entities.SlimeBodyBehaviours;

import com.badlogic.gdx.physics.box2d.Body;

/**
 * Created by afonso on 6/2/17.
 */
public abstract class SlimeBodyBehaviour {

    /**
     * The slime's body
     */
    Body slimeBody;

    /**
     * Creates a behaviour with body slimeBody
     *
     * @param slimeBody the slime body
     */
    public SlimeBodyBehaviour(Body slimeBody) {
        this.slimeBody = slimeBody;
    }

    /**
     * Moves the slime to the right
     */
    public abstract void moveRight();

    /**
     * Moves the slime to the left
     */
    public abstract void  moveLeft();

    /**
     * Makes the slime jump
     */
    public abstract void  jump();

}
