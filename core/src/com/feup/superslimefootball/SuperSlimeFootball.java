package com.feup.superslimefootball;

import com.badlogic.gdx.Game;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.feup.superslimefootball.view.GameView;


/**
 * The game main class.
 */

public class SuperSlimeFootball extends Game {
	private SpriteBatch batch;
	private AssetManager assetManager;

    /**
     * Creates the game. Initializes the sprite batch and asset manager.
     * Also starts the game until we have a main menu.
     */

    @Override
    public void create() {
        batch = new SpriteBatch();
        assetManager = new AssetManager();

        startGame();
    }

    /**
     * Starts the game.
     */
    private void startGame() {
        setScreen(new GameView(this));
    }

    /**
     * Disposes of all assets.
     */

	@Override
	public void dispose() {
		batch.dispose();
        assetManager.dispose();
	}

	@Override
	public void pause() {
		super.pause();
	}

	@Override
	public void resume() {
		super.resume();
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
     * Returns the asset manager used to load all textures and sounds.
     *
     * @return the asset manager
     */

    public AssetManager getAssetManager() {
        return assetManager;
    }
}
