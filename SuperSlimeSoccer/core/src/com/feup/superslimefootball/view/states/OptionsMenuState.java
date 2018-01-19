package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.view.utilities.GameConfig;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

/**
 * The type Options menu state.
 */
public class OptionsMenuState extends MenuState {
    /**
     * The width of the option buttons.
     */
    private static final float OPTIONS_BUTTONS_WIDTH = 3.0f/50.0f;

    /**
     * The height of the option buttons.
     */
    private static final float OPTIONS_BUTTONS_HEIGHT = 1.3f/10.0f;

    /*
     * Booleans of each option in the GoalLimit
     */

    private Integer goalLimit = 3;

    /*
     * Booleans of sound and comments options
     */
    private boolean soundOption = false;
    private boolean commentsOption = false;

    /**
     * Creates an Options MenuState in the game
     *
     * @param game the game
     */
    public OptionsMenuState(SuperSlimeFootball game) {
        super(game);
    }

    @Override
    public void drawButtons() {

        Texture howToPlay = this.game.getAssetManager().get("howToPlay.png", Texture.class);
        Texture sound = this.game.getAssetManager().get("sound.png", Texture.class);
        Texture comments = this.game.getAssetManager().get("comments.png", Texture.class);
        Texture goalLimit = this.game.getAssetManager().get("goalLimit.png", Texture.class);
        Texture goBack = this.game.getAssetManager().get("goBack.png", Texture.class);

        this.game.getBatch().draw(howToPlay, VIEWPORT_WIDTH*(1.0f/13.0f), VIEWPORT_HEIGHT*(17.0f/20.0f));
        this.game.getBatch().draw(sound, VIEWPORT_WIDTH*(1.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.game.getBatch().draw(comments, VIEWPORT_WIDTH*(2.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.game.getBatch().draw(goalLimit, VIEWPORT_WIDTH*(3.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.game.getBatch().draw(goBack, VIEWPORT_WIDTH*(10.0f/13.0f), VIEWPORT_HEIGHT*(17.0f/20.0f));
        drawSoundComments();
        drawGoalLimit();

    }

    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()) {
            if (touchButton(1.0f / 13.0f, 17.0f / 20.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.game.setGameState(new HowToPlayMenuState(this.game));
            else if(touchButton(10.0f/13.0f,17.0f/20.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.game.setGameState(new InitialMenuState(this.game));
            handleSoundCommentsMouse();
            handleGoalLimitMouse();
        }
    }

    /**
     * Handles the sound and the comments
     */
    private void handleSoundCommentsMouse(){
        if (touchButton(5.0f/20.0f, 9.0f/50.0f, 875.0f/10000.0f, 6.0f/50.0f)){
            soundOption = !soundOption;
            GameConfig.getInstance().setSound(soundOption);
        }

        else if (touchButton(9.0f/20.0f, 9.0f/50.0f, 875.0f/10000.0f, 6.0f/50.0f)) {
            commentsOption = !commentsOption;
            GameConfig.getInstance().setComments(commentsOption);
        }

    }

    /**
     * Handles the goal limit
     */
    private void handleGoalLimitMouse(){
        if (touchButton(30.0f/50.0f, 1.0f / 5.0f, OPTIONS_BUTTONS_WIDTH, OPTIONS_BUTTONS_HEIGHT))
            setGoalLimit(3);
        else if (touchButton(33.0f/50.0f, 1.0f / 5.0f, OPTIONS_BUTTONS_WIDTH, OPTIONS_BUTTONS_HEIGHT))
            setGoalLimit(5);
        else if (touchButton(36.0f/50.0f, 1.0f / 5.0f, OPTIONS_BUTTONS_WIDTH, OPTIONS_BUTTONS_HEIGHT))
            setGoalLimit(7);
    }

    /**
     * Sets the goal Limit
     *
     * @param goalLimit
     */
    private void setGoalLimit(int goalLimit){
        this.goalLimit = goalLimit;
        GameConfig.getInstance().setGoalLimit(goalLimit);
    }

    /**
     * Draws the sound and comments buttons
     */
    private void drawSoundComments(){
        Texture onButton = this.game.getAssetManager().get("optionsButtons/onButton.png", Texture.class);
        Texture offButton = this.game.getAssetManager().get("optionsButtons/offButton.png", Texture.class);

        if(soundOption)
            this.game.getBatch().draw(offButton, VIEWPORT_WIDTH*(5.0f/20.0f), VIEWPORT_HEIGHT*(9.0f/50.0f));
        else
            this.game.getBatch().draw(onButton, VIEWPORT_WIDTH*(5.0f/20.0f), VIEWPORT_HEIGHT*(9.0f/50.0f));
        if(commentsOption)
            this.game.getBatch().draw(offButton, VIEWPORT_WIDTH*(9.0f/20.0f), VIEWPORT_HEIGHT*(9.0f/50.0f));
        else
            this.game.getBatch().draw(onButton, VIEWPORT_WIDTH*(9.0f/20.0f), VIEWPORT_HEIGHT*(9.0f/50.0f));
    }

    /**
     * Draws the goal Limit buttons
     */
    private void drawGoalLimit(){
        Texture threeChosen = this.game.getAssetManager().get("optionsButtons/threeChosen.png", Texture.class);
        Texture fiveChosen = this.game.getAssetManager().get("optionsButtons/fiveChosen.png", Texture.class);
        Texture sevenChosen = this.game.getAssetManager().get("optionsButtons/sevenChosen.png", Texture.class);
        Texture threeNotChosen = this.game.getAssetManager().get("optionsButtons/threeNotChosen.png", Texture.class);
        Texture fiveNotChosen = this.game.getAssetManager().get("optionsButtons/fiveNotChosen.png", Texture.class);
        Texture sevenNotChosen = this.game.getAssetManager().get("optionsButtons/sevenNotChosen.png", Texture.class);


        if(goalLimit == 3)
            this.game.getBatch().draw(threeChosen, VIEWPORT_WIDTH*(30.0f/50.0f), VIEWPORT_HEIGHT*(1.0f/5.0f));
        else
            this.game.getBatch().draw(threeNotChosen, VIEWPORT_WIDTH*(30.0f/50.0f), VIEWPORT_HEIGHT*(1.0f/5.0f));
        if(goalLimit == 5)
            this.game.getBatch().draw(fiveChosen, VIEWPORT_WIDTH*(33.0f/50.0f), VIEWPORT_HEIGHT*(1.0f/5.0f));
        else
            this.game.getBatch().draw(fiveNotChosen, VIEWPORT_WIDTH*(33.0f/50.0f), VIEWPORT_HEIGHT*(1.0f/5.0f));
        if(goalLimit == 7)
            this.game.getBatch().draw(sevenChosen, VIEWPORT_WIDTH*(36.0f/50.0f), VIEWPORT_HEIGHT*(1.0f/5.0f));
        else
            this.game.getBatch().draw(sevenNotChosen, VIEWPORT_WIDTH*(36.0f/50.0f), VIEWPORT_HEIGHT*(1.0f/5.0f));
    }

}
