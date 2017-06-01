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

        Texture blueSlime = this.menu.getAssetManager().get("blueSlime.png", Texture.class);
        Texture redSlime = this.menu.getAssetManager().get("redSlime.png", Texture.class);
        Texture blueSlimeButton = this.menu.getAssetManager().get("blueSlimeButton.png", Texture.class);
        Texture redSlimeButton = this.menu.getAssetManager().get("redSlimeButton.png", Texture.class);
        Texture goBack = this.menu.getAssetManager().get("goBack.png", Texture.class);

        this.menu.getBatch().draw(blueSlime, Gdx.graphics.getWidth()*(1.0f/4.0f), Gdx.graphics.getHeight()*(4.0f/25.0f));
        this.menu.getBatch().draw(redSlime, Gdx.graphics.getWidth()*(5.0f/8.0f), Gdx.graphics.getHeight()*(4.0f/25.0f));
        this.menu.getBatch().draw(blueSlimeButton, Gdx.graphics.getWidth()*(1.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.menu.getBatch().draw(redSlimeButton, Gdx.graphics.getWidth()*(3.0f/5.0f), Gdx.graphics.getHeight()*(1.0f/25.0f));
        this.menu.getBatch().draw(goBack, Gdx.graphics.getWidth()*(1.0f/13.0f), Gdx.graphics.getHeight()*(17.0f/20.0f));
    }


    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()){
            if(touchButton(1.0f/5.0f,1.0f/25.0f))
                this.menu.setScreen(new GameView(this.menu));
           /* else if(touchButton(3.0f/5.0f,1.0f/25.0f))
                this.menuView.setState(new GameView(this.menu)); // Red Slime*/
           else if(touchButton(1.0f/13.0f,17.0f/20.0f))
                this.menuView.setState(new InitialMenuState(this.menuView));
        }
    }
}
