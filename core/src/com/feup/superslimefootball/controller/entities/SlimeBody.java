package com.feup.superslimefootball.controller.entities;

import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.physics.box2d.World;
import com.feup.superslimefootball.controller.entities.SlimeBodyBehaviours.SlimeBodyBehaviour;
import com.feup.superslimefootball.controller.entities.SlimeBodyBehaviours.SlimeBodyNormalBehaviour;
import com.feup.superslimefootball.controller.entities.SlimeBodyBehaviours.SlimeBodySpeedBehaviour;
import com.feup.superslimefootball.model.entities.PowerModel;
import com.feup.superslimefootball.model.entities.SlimeModel;

import java.util.Timer;
import java.util.TimerTask;

public class SlimeBody extends EntityBody {

    /**
     * The behaviour of the Slime
     */
    private SlimeBodyBehaviour slimeBodyBehaviour;


    /**
     * Constructs a body representing a model in a certain world.
     *
     * @param world The world this body lives on.
     * @param model The model representing the body.
     */
    public SlimeBody(World world, SlimeModel model) {
        super(world, model, true, 1.0f);


        this.slimeBodyBehaviour = new SlimeBodyNormalBehaviour(this.body);

        float density = 1.0f;
        float restitution = 0.01f;
        float friction = 0.1f;

        Vector2[] vertexes = new Vector2[8];

        vertexes[0] = new Vector2(-1.35f, -0.7f);
        vertexes[1] = new Vector2(0.1f, -0.7f);
        vertexes[2] = new Vector2(0.1f, 0.7f);
        vertexes[3] = new Vector2(-0.6f, 0.5f);
        vertexes[4] = new Vector2(-1.0f, 0.25f);
        vertexes[5] = new Vector2(-1.1f, 0.0f);
        vertexes[6] = new Vector2(-1.3f, -0.2f);
        vertexes[7] = new Vector2(-1.2f, -0.7f);

        createFixture(body,vertexes, density, friction, restitution, false);

        vertexes[0] = new Vector2(1.35f, -0.7f);
        vertexes[1] = new Vector2(-0.1f, -0.7f);
        vertexes[2] = new Vector2(-0.1f, 0.7f);
        vertexes[3] = new Vector2(0.6f, 0.5f);
        vertexes[4] = new Vector2(1.0f, 0.25f);
        vertexes[5] = new Vector2(1.1f, 0.0f);
        vertexes[6] = new Vector2(1.3f, -0.2f);
        vertexes[7] = new Vector2(1.2f, -0.7f);

        createFixture(body,vertexes, density, friction, restitution, false);
    }

    /**
     * Moves the slime to the right
     *
     */
    public void moveRight(){
        slimeBodyBehaviour.moveRight();
        ((SlimeModel)this.getUserData()).setOrientationState(SlimeModel.OrientationState.RIGHT);
    }

    /**
     * Moves the slime to the left
     *
     */
    public void moveLeft(){
        slimeBodyBehaviour.moveLeft();
        ((SlimeModel)this.getUserData()).setOrientationState(SlimeModel.OrientationState.LEFT);
    }

    /**
     * Makes the slime jump
     *
     */
    public void jump() {
        if(((SlimeModel)this.getUserData()).getSlimeState() != SlimeModel.SlimeState.JUMPING)
            slimeBodyBehaviour.jump();

    }

    /**
     * Sets the behaviour of the Slime
     *
     * @param powerType the type of the power of the slime
     */
    public void setSlimeBodyBehaviour(PowerModel.PowerType powerType) {
        if (powerType == PowerModel.PowerType.SPEED) {
            slimeBodyBehaviour = new SlimeBodySpeedBehaviour(body);
        }

        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                slimeBodyBehaviour = new SlimeBodyNormalBehaviour(body);
            }
        }, 3000);
    }

    /**
     * Returns the slime behaviour
     *
     * @return slimeBodyBehaviour
     */
    public SlimeBodyBehaviour getSlimeBodyBehaviour(){
        return slimeBodyBehaviour;
    }

}
