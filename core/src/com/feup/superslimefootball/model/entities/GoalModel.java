package com.feup.superslimefootball.model.entities;

/**
 * A model representing a goal.
 */
public class GoalModel extends EntityModel {

    /**
     * Creates a new goal model in a certain position.
     *
     * @param x the x-coordinate in meters
     * @param y the y-coordinate in meters
     */
    public GoalModel(float x, float y) {
        super(x, y);
    }

    @Override
    public ModelType getType() {
        return ModelType.GOAL;
    }
}
