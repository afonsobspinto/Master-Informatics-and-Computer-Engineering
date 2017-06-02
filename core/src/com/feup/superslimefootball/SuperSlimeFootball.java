package com.feup.superslimefootball;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.feup.superslimefootball.view.MenuView;
import com.feup.superslimefootball.view.utilities.GameConfig;

public class SuperSlimeFootball extends Game {
    private SpriteBatch batch;
    private AssetManager assetManager;

    private GameConfig gameConfig;

    @Override
    public void create () {
        batch = new SpriteBatch();
        assetManager = new AssetManager();
        gameConfig = new GameConfig();

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


}
