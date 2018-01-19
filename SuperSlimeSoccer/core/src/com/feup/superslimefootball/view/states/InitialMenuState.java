package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

/**
 * The type Initial menu state.
 */
public class InitialMenuState extends MenuState {

    /**
     * Creates a Initial MenuState in the game
     *
     * @param game the game
     */
    public InitialMenuState(SuperSlimeFootball game) {
        super(game);
    }

    @Override
    public void drawButtons() {

        Texture singlePlayer = this.game.getAssetManager().get("singleplayer.png", Texture.class);
        Texture multiPlayer = this.game.getAssetManager().get("multiplayer.png", Texture.class);
        Texture options = this.game.getAssetManager().get("options.png", Texture.class);
        Texture facebook = this.game.getAssetManager().get("facebook.png", Texture.class);
        Texture twitter = this.game.getAssetManager().get("twitter.png", Texture.class);
        Texture superslimefootball = this.game.getAssetManager().get("expressions/SuperSlimeFootball.png", Texture.class);


        this.game.getBatch().draw(singlePlayer, VIEWPORT_WIDTH*(1.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.game.getBatch().draw(multiPlayer, VIEWPORT_WIDTH*(2.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.game.getBatch().draw(options, VIEWPORT_WIDTH*(3.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.game.getBatch().draw(facebook, VIEWPORT_WIDTH*(12.0f/13.0f), VIEWPORT_HEIGHT*(17.0f/20.0f));
        this.game.getBatch().draw(twitter, VIEWPORT_WIDTH*(12.0f/13.0f), VIEWPORT_HEIGHT*(14.0f/20.0f));
        this.game.getBatch().draw(superslimefootball, VIEWPORT_WIDTH*(1.0f/20.0f), VIEWPORT_HEIGHT*(14.0f/20.0f));
    }

    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()){
            if (touchButton(1.0f/5.0f,1.0f/25.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.game.setGameState(new SinglePlayerMenuState(this.game));
            else if(touchButton(2.0f/5.0f,1.0f/25.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.game.setGameState(new MultiPlayerMenuState(this.game));
            else if(touchButton(3.0f/5.0f,1.0f/25.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.game.setGameState(new OptionsMenuState(this.game));
        }
    }
}
