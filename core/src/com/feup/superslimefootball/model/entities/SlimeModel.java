package com.feup.superslimefootball.model.entities;

/**
 * A model representing a slime.
 */
public class SlimeModel extends EntityModel {


    /**
     * Is this slime accelerating in this update delta
     */
    private boolean accelerating = true;


    /**
     * Creates a new slime model in a certain position.
     *
     * @param x the x-coordinate in meters
     * @param y the y-coordinate in meters
     */
    public SlimeModel(float x, float y) {
        super(x, y);
    }


    /**
     * Set the accelerating flag for this slime
     *
     * @param accelerating the accelerating tag
     */
    public void setAccelerating(boolean accelerating) {
        this.accelerating = accelerating;
    }

    /**
     * Is the slime accelerating in this update
     *
     * @return the accelerating flag
     */
    public boolean isAccelerating() {
        return accelerating;
    }

    @Override
    public ModelType getType() {
        return ModelType.SLIME;
    }
}
