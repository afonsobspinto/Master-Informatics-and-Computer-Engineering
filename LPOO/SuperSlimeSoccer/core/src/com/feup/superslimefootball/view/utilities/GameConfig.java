package com.feup.superslimefootball.view.utilities;

import com.badlogic.gdx.graphics.Color;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by afonso on 6/2/17.
 */
public class GameConfig {

    /**
     * The singleton instance of this controller
     */
    private static GameConfig instance;


    private Integer goalLimit;
    private boolean comments;
    private boolean sound;
    private Score score;
    private ColorPair colors;
    private List<Color> colorList;

    private GameConfig() {
        this.goalLimit = 3;
        this.comments = true;
        this.sound = true;
        this.score = new Score(0,0);
        this.colors = new ColorPair(Color.BLUE, Color.RED);
        this.colorList = new ArrayList<Color>();
        colorList.add(Color.BLUE);
        colorList.add(Color.RED);
    }

    /**
     * Returns a singleton instance of a game controller
     *
     * @return the singleton instance
     */
    public static GameConfig getInstance() {
        if (instance == null)
            instance = new GameConfig();
        return instance;
    }

    /**
     * Gets goal limit.
     *
     * @return the goal limit
     */
    public Integer getGoalLimit() {
        return goalLimit;
    }

    /**
     * Sets goal limit.
     *
     * @param goalLimit the goal limit
     */
    public void setGoalLimit(int goalLimit) {
        this.goalLimit = goalLimit;
    }

    /**
     * Is comments boolean.
     *
     * @return the boolean
     */
    public boolean isComments() {
        return comments;
    }

    /**
     * Sets comments.
     *
     * @param comments the comments
     */
    public void setComments(boolean comments) {
        this.comments = comments;
    }

    /**
     * Is sound boolean.
     *
     * @return the boolean
     */
    public boolean isSound() {
        return sound;
    }

    /**
     * Sets sound.
     *
     * @param sound the sound
     */
    public void setSound(boolean sound) {
        this.sound = sound;
    }

    /**
     * Gets score.
     *
     * @return the score
     */
    public Score getScore() {
        return score;
    }

    /**
     * Update score.
     *
     * @param player1 the player 1
     * @param player2 the player 2
     */
    public void updateScore(Integer player1, Integer player2) {
        this.score = new Score(score.getPlayer1()+player1, score.getPlayer2()+player2);
    }

    /**
     * Update score.
     *
     * @param score the score
     */
    public void updateScore(Score score) {
        this.score = score;
    }

    /**
     * Gets colors.
     *
     * @return the colors
     */
    public ColorPair getColors() {
        return colors;
    }

    private Color randomColor(Color color){

        Color random = (colorList.get(new Random().nextInt(colorList.size())));

        return (random == color)? randomColor(color) : random;

    }

    /**
     * Sets colors.
     *
     * @param color the color
     */
    public void setColors(Color color) {
        this.colors = new ColorPair(color, randomColor(color));
    }

    /**
     * Reset instance.
     */
    public static void resetInstance(){
        instance = new GameConfig();
    }
}
