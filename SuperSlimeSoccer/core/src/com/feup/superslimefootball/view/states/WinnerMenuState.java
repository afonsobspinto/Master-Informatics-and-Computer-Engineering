package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.controller.GameController;
import com.feup.superslimefootball.network.NetworkManager;
import com.feup.superslimefootball.view.utilities.FacebookIntegration;
import com.feup.superslimefootball.view.utilities.GameConfig;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

/**
 * The type Winner menu state.
 */
public class WinnerMenuState extends MenuState {

    /**
     * Creates a Winner MenuState in the game
     *
     * @param game the game
     */
    public WinnerMenuState(SuperSlimeFootball game) {
        super(game);
    }

    @Override
    public void drawButtons() {

        Texture facebook = this.game.getAssetManager().get("facebook.png", Texture.class);
        Texture twitter = this.game.getAssetManager().get("twitter.png", Texture.class);
        Texture congratulations = this.game.getAssetManager().get("expressions/Congratulationsyouwon.png", Texture.class);
        Texture goBack = this.game.getAssetManager().get("goBack.png", Texture.class);

        this.game.getBatch().draw(facebook, VIEWPORT_WIDTH*(12.0f/13.0f), VIEWPORT_HEIGHT*(17.0f/20.0f));
        this.game.getBatch().draw(twitter, VIEWPORT_WIDTH*(12.0f/13.0f), VIEWPORT_HEIGHT*(14.0f/20.0f));
        this.game.getBatch().draw(congratulations, VIEWPORT_WIDTH*(3.0f/10.0f), VIEWPORT_HEIGHT*(14.0f/20.0f));
        this.game.getBatch().draw(goBack, VIEWPORT_WIDTH*(1.0f/13.0f), VIEWPORT_HEIGHT*(17.0f/20.0f));

    }

    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()) {
            if (touchButton(1.0f / 13.0f, 17.0f / 20.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT)){
                GameConfig.resetInstance();
                if(NetworkManager.getInstance().isConnected()){
                    NetworkManager.getInstance().closeSockets();
                    NetworkManager.resetInstance();
                    GameController.resetInstance();
                }

                this.game.setGameState(new InitialMenuState(this.game));

            }


            else if (touchButton(12.0f / 13.0f, 17.0f / 20.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT)){
                FacebookIntegration.getInstance().publish(true);
            }
        }
    }
}
