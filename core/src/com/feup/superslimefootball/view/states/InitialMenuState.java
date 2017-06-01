package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.view.MenuView;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

public class InitialMenuState extends MenuState {
    Texture singlePlayer = (Texture)this.menu.getAssetManager().get("singleplayer.png", Texture.class);
    Texture multiPlayer = (Texture)this.menu.getAssetManager().get("multiplayer.png", Texture.class);
    Texture options = (Texture)this.menu.getAssetManager().get("options.png", Texture.class);
    Texture facebook = (Texture)this.menu.getAssetManager().get("facebook.png", Texture.class);
    Texture twitter = (Texture)this.menu.getAssetManager().get("twitter.png", Texture.class);

    public InitialMenuState(MenuView menuView) {
        super(menuView);
    }

    @Override
    public void drawButtons() {

        this.menu.getBatch().draw(singlePlayer, VIEWPORT_WIDTH*(1.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.menu.getBatch().draw(multiPlayer, VIEWPORT_WIDTH*(2.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.menu.getBatch().draw(options, VIEWPORT_WIDTH*(3.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.menu.getBatch().draw(facebook, VIEWPORT_WIDTH*(12.0f/13.0f), VIEWPORT_HEIGHT*(17.0f/20.0f));
        this.menu.getBatch().draw(twitter, VIEWPORT_WIDTH*(12.0f/13.0f), VIEWPORT_HEIGHT*(14.0f/20.0f));

    }

    @Override
    public void dispose(){
        singlePlayer.dispose();
        multiPlayer.dispose();
        options.dispose();
        facebook.dispose();
        twitter.dispose();
    }

    @Override
    public void handleMouse() {
        if(Gdx.input.isTouched()){
            dispose();
            this.menuView.setState(new SinglePlayerMenuState(this.menuView));
        }
    }
}
