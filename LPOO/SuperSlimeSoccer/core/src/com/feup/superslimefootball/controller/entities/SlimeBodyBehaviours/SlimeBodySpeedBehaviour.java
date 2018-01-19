package com.feup.superslimefootball.controller.entities.SlimeBodyBehaviours;


import com.badlogic.gdx.physics.box2d.Body;

/**
 * Created by afonso on 6/2/17.
 */
public class SlimeBodySpeedBehaviour extends SlimeBodyBehaviour {

    /**
     * Creates a speed behaviour with body slimeBody
     *
     * @param slimeBody the slime body
     */
    public SlimeBodySpeedBehaviour(Body slimeBody) {
        super(slimeBody);
    }

    @Override
    public void moveRight() {
        slimeBody.applyLinearImpulse(4f , 0,slimeBody.getWorldCenter().x, slimeBody.getWorldCenter().y, true);

    }

    @Override
    public void moveLeft() {
        slimeBody.applyLinearImpulse(-4f , 0,slimeBody.getWorldCenter().x, slimeBody.getWorldCenter().y, true);

    }

    @Override
    public void jump() {
        slimeBody.applyLinearImpulse(0, 25f, slimeBody.getWorldCenter().x, slimeBody.getWorldCenter().y, true);
    }
}
