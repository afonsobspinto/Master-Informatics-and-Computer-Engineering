package com.feup.superslimefootball.model.entities;

/**
 * Created by afonso on 5/29/17.
 */

public class GoalModel extends EntityModel {

    private boolean rotation;

    /**
     * Constructs a model with a position and a rotation.
     *
     * @param x The x-coordinate of this entity in pixels.
     * @param y The y-coordinate of this entity in pixels.
     */
    public GoalModel(float x, float y, boolean rotation) {
        super(x, y);
        this.rotation = rotation;
    }

    @Override
    public ModelType getType() {
            return ModelType.GOAL;

    }
}
