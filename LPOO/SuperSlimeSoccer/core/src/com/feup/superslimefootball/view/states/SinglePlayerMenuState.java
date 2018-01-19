package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.view.GameView;
import com.feup.superslimefootball.view.utilities.GameConfig;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

/**
 * The type Single player menu state.
 */
public class SinglePlayerMenuState extends MenuState {

    /**
     * Creates a SinglePlayer MenuState in the game
     *
     * @param game the game
     */
    public SinglePlayerMenuState(SuperSlimeFootball game) {
        super(game);
    }

    @Override
    public void drawButtons() {

        Texture blueSlime = this.game.getAssetManager().get("blueSlime.png", Texture.class);
        Texture redSlime = this.game.getAssetManager().get("redSlime.png", Texture.class);
        Texture blueSlimeButton = this.game.getAssetManager().get("blueSlimeButton.png", Texture.class);
        Texture redSlimeButton = this.game.getAssetManager().get("redSlimeButton.png", Texture.class);
        Texture goBack = this.game.getAssetManager().get("goBack.png", Texture.class);
        Texture chooseyourslime = this.game.getAssetManager().get("expressions/ChooseyourSlime.png", Texture.class);

        this.game.getBatch().draw(blueSlime, VIEWPORT_WIDTH*(1.0f/4.0f), VIEWPORT_HEIGHT*(4.0f/25.0f));
        this.game.getBatch().draw(redSlime, VIEWPORT_WIDTH*(5.0f/8.0f), VIEWPORT_HEIGHT*(4.0f/25.0f));
        this.game.getBatch().draw(blueSlimeButton,VIEWPORT_WIDTH*(1.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.game.getBatch().draw(redSlimeButton, VIEWPORT_WIDTH*(3.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.game.getBatch().draw(goBack, VIEWPORT_WIDTH*(1.0f/13.0f), VIEWPORT_HEIGHT*(17.0f/20.0f));
        this.game.getBatch().draw(chooseyourslime, VIEWPORT_WIDTH*(2.0f/5.0f), VIEWPORT_HEIGHT*(14.0f/20.0f));
    }


    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()){
            if(touchButton(1.0f/5.0f,1.0f/25.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT)){
                GameConfig.getInstance().setColors(Color.BLUE);

                this.game.setScreen(new GameView(this.game));

            }
            else if(touchButton(3.0f/5.0f,1.0f/25.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT)) {
                GameConfig.getInstance().setColors(Color.RED);
                this.game.setScreen(new GameView(this.game));
            }
            else if(touchButton(1.0f/13.0f,17.0f/20.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.game.setGameState(new InitialMenuState(this.game));
        }
    }

}
