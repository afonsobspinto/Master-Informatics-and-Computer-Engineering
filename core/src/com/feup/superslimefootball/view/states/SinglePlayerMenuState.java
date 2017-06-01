package com.feup.superslimefootball.view.states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.view.GameView;
import com.feup.superslimefootball.view.MenuView;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

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

        this.menu.getBatch().draw(blueSlime, VIEWPORT_WIDTH*(1.0f/4.0f), VIEWPORT_HEIGHT*(4.0f/25.0f));
        this.menu.getBatch().draw(redSlime, VIEWPORT_WIDTH*(5.0f/8.0f), VIEWPORT_HEIGHT*(4.0f/25.0f));
        this.menu.getBatch().draw(blueSlimeButton, VIEWPORT_WIDTH*(1.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
        this.menu.getBatch().draw(redSlimeButton, VIEWPORT_WIDTH*(3.0f/5.0f), VIEWPORT_HEIGHT*(1.0f/25.0f));
    }


    @Override
    public void handleMouse() {
        if(Gdx.input.justTouched()){
            if(touchButton(1.0f/5.0f,1.0f/25.0f))
                this.menu.setScreen(new GameView(this.menu));
           /* else if(touchButton(3.0f/5.0f,1.0f/25.0f))
                this.menuView.setState(new GameView(this.menu)); // Red Slime*/
        }
    }
}
