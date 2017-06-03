package com.feup.superslimefootball;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.feup.superslimefootball.view.MenuView;
import com.feup.superslimefootball.view.states.InitialMenuState;
import com.feup.superslimefootball.view.states.MenuState;

public class SuperSlimeFootball extends Game {
    private SpriteBatch batch;
    private AssetManager assetManager;


    private MenuState gameState;

    @Override
    public void create () {
        batch = new SpriteBatch();
        assetManager = new AssetManager();
        gameState = new InitialMenuState(this);

        startGame();
    }

    /**
     * Starts the game.
     */
    private void startGame() {
        setScreen(new MenuView(this));
    }


    /**
     * Disposes of all assets.
     */
    @Override
    public void dispose () {
        batch.dispose();
        assetManager.dispose();
    }

    /**
     * Returns the asset manager used to load all textures and sounds.
     *
     * @return the asset manager
     */
    public AssetManager getAssetManager() {
        return assetManager;
    }

    /**
     * Returns the sprite batch used to improve drawing performance.
     *
     * @return the sprite batch
     */
    public SpriteBatch getBatch() {
        return batch;
    }


    public MenuState getGameState() {
        return gameState;
    }

    public void setGameState(MenuState gameState) {
        this.gameState = gameState;
    }
}
