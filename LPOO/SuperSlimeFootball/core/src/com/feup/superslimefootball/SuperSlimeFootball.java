package com.feup.superslimefootball;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.feup.superslimefootball.view.MenuView;
import com.feup.superslimefootball.view.states.InitialMenuState;
import com.feup.superslimefootball.view.states.MenuState;

/**
 * The type Super slime football.
 */
public class SuperSlimeFootball extends Game {

    /**
     * The Batch of the game
     */
    private SpriteBatch batch;

    /**
     * The assetManager of the game
     */
    private AssetManager assetManager;

    /**
     * The gameState of the Menu
     */
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

    /**
     * Returns the game's state
     *
     * @return game state
     */
    public MenuState getGameState() {
        return gameState;
    }

    /**
     * Sets the game State
     *
     * @param gameState the game state
     */
    public void setGameState(MenuState gameState) {
        this.gameState = gameState;
    }
}
