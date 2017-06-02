package com.feup.superslimefootball.controller.entities.SlimeBodyBehaviours;

import com.badlogic.gdx.physics.box2d.Body;

/**
 * Created by afonso on 6/2/17.
 */

public abstract class SlimeBodyBehaviour {

    Body slimeBody;

    public SlimeBodyBehaviour(Body slimeBody) {
        this.slimeBody = slimeBody;
    }

    public abstract void moveRight();

    public abstract void  moveLeft();

    public abstract void  jump();

}
