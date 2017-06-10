//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.feup.superslimefootball.view;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.view.utilities.GameConfig;

public class MenuView extends ScreenAdapter {

    /**
     * The width of the viewport.
     */
    public static final float VIEWPORT_WIDTH = 800.0F;

    /**
     * The height of the viewport.
     */
    public static final float VIEWPORT_HEIGHT = 400.0F;

    /**
     * The game this screen belongs to.
     */
    public final SuperSlimeFootball game;

    /**
     * The camera used to show the viewport.
     */
    private final OrthographicCamera camera;


    /**
     * Creates this screen.
     *
     * @param game The game this screen belongs to
     */
    public MenuView(SuperSlimeFootball game) {
        this.game = game;
        this.loadAssets();
        this.camera = this.createCamera();
    }



    /**
     * Creates the camera used to show the viewport.
     *
     * @return the camera
     */
    private OrthographicCamera createCamera() {
        OrthographicCamera camera = new OrthographicCamera();
        camera.setToOrtho(false, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        return camera;
    }

    /**
     * Loads the assets needed by this screen.
     */
    private void loadAssets() {
        this.game.getAssetManager().load("menuBackground.png", Texture.class);
        this.game.getAssetManager().load("singleplayer.png", Texture.class);
        this.game.getAssetManager().load("multiplayer.png", Texture.class);
        this.game.getAssetManager().load("options.png", Texture.class);
        this.game.getAssetManager().load("facebook.png", Texture.class);
        this.game.getAssetManager().load("twitter.png", Texture.class);
        this.game.getAssetManager().load("ball.png", Texture.class);
        this.game.getAssetManager().load("blueSlime.png", Texture.class);
        this.game.getAssetManager().load("redSlime.png", Texture.class);
        this.game.getAssetManager().load("blueSlimeButton.png", Texture.class);
        this.game.getAssetManager().load("redSlimeButton.png", Texture.class);
        this.game.getAssetManager().load("refresh.png", Texture.class);
        this.game.getAssetManager().load("findIP.png", Texture.class);
        this.game.getAssetManager().load("howToPlay.png", Texture.class);
        this.game.getAssetManager().load("sound.png", Texture.class);
        this.game.getAssetManager().load("comments.png", Texture.class);
        this.game.getAssetManager().load("goalLimit.png", Texture.class);
        this.game.getAssetManager().load("goBack.png", Texture.class);
        this.game.getAssetManager().load("howToPlayBackground.png", Texture.class);

        loadOptionsAssets();
        loadExpressionsAssets();

        this.game.getAssetManager().finishLoading();
    }

    /**
     * Loads the options assets needed by this screen.
     */
    private void loadOptionsAssets(){
        this.game.getAssetManager().load("optionsButtons/onButton.png", Texture.class);
        this.game.getAssetManager().load("optionsButtons/offButton.png", Texture.class);
        this.game.getAssetManager().load("optionsButtons/threeChosen.png", Texture.class);
        this.game.getAssetManager().load("optionsButtons/fiveChosen.png", Texture.class);
        this.game.getAssetManager().load("optionsButtons/sevenChosen.png", Texture.class);
        this.game.getAssetManager().load("optionsButtons/threeNotChosen.png", Texture.class);
        this.game.getAssetManager().load("optionsButtons/fiveNotChosen.png", Texture.class);
        this.game.getAssetManager().load("optionsButtons/sevenNotChosen.png", Texture.class);
    }

    /**
     * Loads the expressions assets needed by this screen.
     */
    private void loadExpressionsAssets(){
        this.game.getAssetManager().load("expressions/ChooseyourSlime.png", Texture.class);
        this.game.getAssetManager().load("expressions/Congratulationsyouwon.png", Texture.class);
        this.game.getAssetManager().load("expressions/Sorryyoulost.png", Texture.class);
        this.game.getAssetManager().load("expressions/SuperSlimeFootball.png", Texture.class);
    }

    /**
     * Renders this screen.
     *
     * @param delta time since last renders in seconds.
     */
    public void render(float delta) {
        this.game.getBatch().setProjectionMatrix(this.camera.combined);
        this.game.getGameState().handleMouse();
        Gdx.gl.glClearColor(1.0F, 0.0F, 0.0F, 1.0F);
        Gdx.gl.glClear(16384);
        this.game.getBatch().begin();
        this.drawBackground();
        this.game.getGameState().drawButtons();
        this.game.getBatch().end();

        if(this.game.getGameState().isConnected())
            if(this.game.getGameState().isServer()){
                GameConfig.getInstance().setColors(Color.BLUE);
                this.game.setScreen(new GameView(this.game));
            }

            else{
                GameConfig.getInstance().setColors(Color.RED);
                this.game.setScreen(new GameView(this.game));
            }

    }


    /**
     * Draws the background
     */
    private void drawBackground() {
        Texture background = game.getAssetManager().get("menuBackground.png", Texture.class);
        game.getBatch().draw(background, 0, 0);

        Texture ball = game.getAssetManager().get("ball.png", Texture.class);
        game.getBatch().draw(ball, VIEWPORT_WIDTH*(3.9f/5.0f) - ball.getWidth()/2, VIEWPORT_HEIGHT*(2.0f/3.0f) - ball.getWidth()/2);
    }

    /*
     * Returns the game
     */
    public SuperSlimeFootball getGame() { return game; }
}

