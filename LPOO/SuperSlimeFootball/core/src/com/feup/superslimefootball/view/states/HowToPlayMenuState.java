package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

/**
 * The type How to play menu state.
 */
public class HowToPlayMenuState extends MenuState {

    /**
     * Creates a HowToPlay MenuState in the game
     *
     * @param game the game
     */
    public HowToPlayMenuState(SuperSlimeFootball game) {
        super(game);
    }

    @Override
    public void drawButtons() {

        Texture howToPlayBackground = this.game.getAssetManager().get("howToPlayBackground.png", Texture.class);
        Texture goBack = this.game.getAssetManager().get("goBack.png", Texture.class);

        this.game.getBatch().draw(howToPlayBackground, 0.0f, 0.0f);
        this.game.getBatch().draw(goBack, VIEWPORT_WIDTH*(10.0f/13.0f), VIEWPORT_HEIGHT*(17.0f/20.0f));

    }

    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()) {
            if(touchButton(10.0f/13.0f,17.0f/20.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.game.setGameState(new OptionsMenuState(this.game));
        }
    }
}
