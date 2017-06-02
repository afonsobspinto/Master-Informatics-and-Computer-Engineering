package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.view.GameView;
import com.feup.superslimefootball.view.MenuView;

public class SinglePlayerMenuState extends MenuState {
    public SinglePlayerMenuState(MenuView menuView) {
        super(menuView);
    }

    @Override
    public void drawButtons() {

        Texture blueSlime = this.game.getAssetManager().get("blueSlime.png", Texture.class);
        Texture redSlime = this.game.getAssetManager().get("redSlime.png", Texture.class);
        Texture blueSlimeButton = this.game.getAssetManager().get("blueSlimeButton.png", Texture.class);
        Texture redSlimeButton = this.game.getAssetManager().get("redSlimeButton.png", Texture.class);
        Texture goBack = this.game.getAssetManager().get("goBack.png", Texture.class);

        this.game.getBatch().draw(blueSlime, Gdx.graphics.getWidth()*(1.0f/4.0f), Gdx.graphics.getHeight()*(4.0f/25.0f));
        this.game.getBatch().draw(redSlime, Gdx.graphics.getWidth()*(5.0f/8.0f), Gdx.graphics.getHeight()*(4.0f/25.0f));
        this.game.getBatch().draw(blueSlimeButton, Gdx.graphics.getWidth()*(1.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.game.getBatch().draw(redSlimeButton, Gdx.graphics.getWidth()*(3.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.game.getBatch().draw(goBack, Gdx.graphics.getWidth()*(1.0f/13.0f), Gdx.graphics.getHeight()*(17.0f/20.0f));
    }


    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()){
            if(touchButton(1.0f/5.0f,1.0f/25.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.game.setScreen(new GameView(this.game));
           /* else if(touchButton(3.0f/5.0f,1.0f/25.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.menuView.setState(new GameView(this.game)); // Red Slime*/
           else if(touchButton(1.0f/13.0f,17.0f/20.0f, BUTTONS_WIDTH, BUTTONS_HEIGHT))
                this.menuView.setState(new InitialMenuState(this.menuView));
        }
    }
}
