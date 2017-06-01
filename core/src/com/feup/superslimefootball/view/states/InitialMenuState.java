package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.view.MenuView;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

public class InitialMenuState extends MenuState {


    public InitialMenuState(MenuView menuView) {
        super(menuView);
    }

    @Override
    public void drawButtons() {

        Texture singlePlayer = this.menu.getAssetManager().get("singleplayer.png", Texture.class);
        Texture multiPlayer = this.menu.getAssetManager().get("multiplayer.png", Texture.class);
        Texture options = this.menu.getAssetManager().get("options.png", Texture.class);
        Texture facebook = this.menu.getAssetManager().get("facebook.png", Texture.class);
        Texture twitter = this.menu.getAssetManager().get("twitter.png", Texture.class);

        this.menu.getBatch().draw(singlePlayer, VIEWPORT_WIDTH*(1.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.menu.getBatch().draw(multiPlayer, VIEWPORT_WIDTH*(2.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.menu.getBatch().draw(options, VIEWPORT_WIDTH*(3.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.menu.getBatch().draw(facebook, VIEWPORT_WIDTH*(12.0f/13.0f), VIEWPORT_HEIGHT*(17.0f/20.0f));
        this.menu.getBatch().draw(twitter, VIEWPORT_WIDTH*(12.0f/13.0f), VIEWPORT_HEIGHT*(14.0f/20.0f));

    }

    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()){
            if (touchButton(1.0f/5.0f,1.0f/25.0f))
                this.menuView.setState(new SinglePlayerMenuState(this.menuView));
            else if(touchButton(2.0f/5.0f,1.0f/25.0f))
                this.menuView.setState(new MultiPlayerMenuState(this.menuView));
            else if(touchButton(3.0f/5.0f,1.0f/25.0f))
                this.menuView.setState(new OptionsMenuState(this.menuView));
        }
    }
}
