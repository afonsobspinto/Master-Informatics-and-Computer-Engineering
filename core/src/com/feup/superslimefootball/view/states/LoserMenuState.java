package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.view.MenuView;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

public class LoserMenuState extends MenuState { //Tomás Menu xD
    public LoserMenuState(MenuView menuView) {
        super(menuView);
    }

    @Override
    public void drawButtons() {

        Texture facebook = this.menu.getAssetManager().get("facebook.png", Texture.class);
        Texture twitter = this.menu.getAssetManager().get("twitter.png", Texture.class);

        this.menu.getBatch().draw(facebook, VIEWPORT_WIDTH*(12.0f/13.0f), VIEWPORT_HEIGHT*(17.0f/20.0f));
        this.menu.getBatch().draw(twitter, VIEWPORT_WIDTH*(12.0f/13.0f), VIEWPORT_HEIGHT*(14.0f/20.0f));

    }


    @Override
    public void handleMouse() {

    }
}
