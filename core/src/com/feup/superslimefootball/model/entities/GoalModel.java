package com.feup.superslimefootball.model.entities;

import com.feup.superslimefootball.controller.GameController;

import java.io.Serializable;

public class GoalModel extends EntityModel implements Serializable {

    /**
     * Constructs a model with a position and a rotation.
     *
     * @param x The x-coordinate of this entity in pixels.
     * @param y The y-coordinate of this entity in pixels.
     */
    public GoalModel(float x, float y) {
        super(x, y);
    }

    @Override
    public ModelType getType() {
        return  (this.x > GameController.GAME_WIDTH / 2) ? ModelType.GOALRIGHT: ModelType.GOALLEFT;
    }
}
