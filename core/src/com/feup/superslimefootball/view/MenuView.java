//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.feup.superslimefootball.view;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;

public class MenuView extends ScreenAdapter {

    /**
     * How much pixels does a meter represent.
     */
    public static final float PPM = 32.0F;

    /**
     * The width of the viewport.
     */
    public static final float VIEWPORT_WIDTH = 800.0F;

    /**
     * The height of the viewport.
     */
    public static final float VIEWPORT_HEIGHT = 400.0F;

    /**
     * The menu this screen belongs to.
     */
    private final SuperSlimeFootball menu;

    /**
     * The camera used to show the viewport.
     */
    private final OrthographicCamera camera;

    /*
     * The enum to represent each menu
     */
    public enum MenuState{INITIAL, SINGLEPLAYER, MULTIPLAYER, OPTIONS, WINNER, LOSER};

    /*
     * The state of the Menu
     */
    MenuState state = MenuState.INITIAL;

    /**
     * Creates this screen.
     *
     * @param menu The menu this screen belongs to
     */
    public MenuView(SuperSlimeFootball menu) {
        this.menu = menu;
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
        camera.setToOrtho(false, 800.0F, 400.0F);
        return camera;
    }

    /**
     * Loads the assets needed by this screen.
     */
    private void loadAssets() {
        this.menu.getAssetManager().load("menuBackground.png", Texture.class);
        this.menu.getAssetManager().load("singleplayer.png", Texture.class);
        this.menu.getAssetManager().load("multiplayer.png", Texture.class);
        this.menu.getAssetManager().load("options.png", Texture.class);
        this.menu.getAssetManager().load("facebook.png", Texture.class);
        this.menu.getAssetManager().load("twitter.png", Texture.class);
        this.menu.getAssetManager().load("ball.png", Texture.class);
        this.menu.getAssetManager().load("blueSlime.png", Texture.class);
        this.menu.getAssetManager().load("redSlime.png", Texture.class);
        this.menu.getAssetManager().load("blueSlimeButton.png", Texture.class);
        this.menu.getAssetManager().load("redSlimeButton.png", Texture.class);
        this.menu.getAssetManager().load("refresh.png", Texture.class);
        this.menu.getAssetManager().load("findIP.png", Texture.class);
        this.menu.getAssetManager().load("howToPlay.png", Texture.class);
        this.menu.getAssetManager().load("sound.png", Texture.class);
        this.menu.getAssetManager().load("comments.png", Texture.class);
        this.menu.getAssetManager().load("goalLimit.png", Texture.class);

        this.menu.getAssetManager().finishLoading(); // Possivel problema aqui
    }

    /*
     * Set the state
     */
    public void changeState(MenuState state){
        this.state = state;
    }

    /**
     * Renders this screen.
     *
     * @param delta time since last renders in seconds.
     */
    public void render(float delta) {
        this.menu.getBatch().setProjectionMatrix(this.camera.combined);
        this.handleInputs(delta);
        Gdx.gl.glClearColor(1.0F, 0.0F, 0.0F, 1.0F);
        Gdx.gl.glClear(16384);
        this.menu.getBatch().begin();
        this.drawBackground();
        this.drawButtons();
        this.menu.getBatch().end();
    }

    /**
     * Handles any inputs and passes them to the controller.
     */
    private void handleInputs(float delta) {
    }

    /**
     * Draws the background
     */
    private void drawBackground() {
        Texture background = (Texture)this.menu.getAssetManager().get("menuBackground.png", Texture.class);
        Texture ball = (Texture)this.menu.getAssetManager().get("ball.png", Texture.class);
        this.menu.getBatch().draw(background, 0.0F, 0.0F);
        this.menu.getBatch().draw(ball, VIEWPORT_WIDTH/2, VIEWPORT_HEIGHT/5);

    }

    /**
     * Draws the buttons
     */
    private void drawButtons() {
        Texture singlePlayer = (Texture)this.menu.getAssetManager().get("singleplayer.png", Texture.class);
        Texture multiPlayer = (Texture)this.menu.getAssetManager().get("multiplayer.png", Texture.class);
        Texture options = (Texture)this.menu.getAssetManager().get("options.png", Texture.class);
        Texture facebook = (Texture)this.menu.getAssetManager().get("facebook.png", Texture.class);
        Texture twitter = (Texture)this.menu.getAssetManager().get("twitter.png", Texture.class);
        Texture blueSlime = (Texture)this.menu.getAssetManager().get("blueSlime.png", Texture.class);
        Texture redSlime = (Texture)this.menu.getAssetManager().get("redSlime.png", Texture.class);
        Texture blueSlimeButton = (Texture)this.menu.getAssetManager().get("blueSlimeButton.png", Texture.class);
        Texture redSlimeButton = (Texture)this.menu.getAssetManager().get("redSlimeButton.png", Texture.class);
        Texture refresh = (Texture)this.menu.getAssetManager().get("refresh.png", Texture.class);
        Texture findIP = (Texture)this.menu.getAssetManager().get("findIP.png", Texture.class);
        Texture howToPlay = (Texture)this.menu.getAssetManager().get("howToPlay.png", Texture.class);
        Texture sound = (Texture)this.menu.getAssetManager().get("sound.png", Texture.class);
        Texture comments = (Texture)this.menu.getAssetManager().get("comments.png", Texture.class);
        Texture goalLimit = (Texture)this.menu.getAssetManager().get("goalLimit.png", Texture.class);

        switch (state){
            case INITIAL:
                this.menu.getBatch().draw(singlePlayer, VIEWPORT_WIDTH*(1F/5), VIEWPORT_HEIGHT*(1F/25));
                this.menu.getBatch().draw(multiPlayer, VIEWPORT_WIDTH*(2F/5), VIEWPORT_HEIGHT*(1F/25));
                this.menu.getBatch().draw(options, VIEWPORT_WIDTH*(3F/5), VIEWPORT_HEIGHT*(1F/25));
                this.menu.getBatch().draw(facebook, VIEWPORT_WIDTH*(12F/13), VIEWPORT_HEIGHT*(17F/20));
                this.menu.getBatch().draw(twitter, VIEWPORT_WIDTH*(12F/13), VIEWPORT_HEIGHT*(14F/20));
                break;
            case SINGLEPLAYER:
                this.menu.getBatch().draw(blueSlime, VIEWPORT_WIDTH*(1F/4), VIEWPORT_HEIGHT*(4F/25));
                this.menu.getBatch().draw(redSlime, VIEWPORT_WIDTH*(5F/8), VIEWPORT_HEIGHT*(4F/25));
                this.menu.getBatch().draw(blueSlimeButton, VIEWPORT_WIDTH*(1F/5), VIEWPORT_HEIGHT*(1F/25));
                this.menu.getBatch().draw(redSlimeButton, VIEWPORT_WIDTH*(3F/5), VIEWPORT_HEIGHT*(1F/25));
                break;
            case MULTIPLAYER:
                this.menu.getBatch().draw(refresh, VIEWPORT_WIDTH*(1F/5), VIEWPORT_HEIGHT*(1F/25));
                this.menu.getBatch().draw(findIP, VIEWPORT_WIDTH*(3F/5), VIEWPORT_HEIGHT*(1F/25));
                break;
            case OPTIONS:
                this.menu.getBatch().draw(howToPlay, VIEWPORT_WIDTH*(1F/13), VIEWPORT_HEIGHT*(17F/20));
                this.menu.getBatch().draw(sound, VIEWPORT_WIDTH*(1F/5), VIEWPORT_HEIGHT*(1F/25));
                this.menu.getBatch().draw(comments, VIEWPORT_WIDTH*(2F/5), VIEWPORT_HEIGHT*(1F/25));
                this.menu.getBatch().draw(goalLimit, VIEWPORT_WIDTH*(3F/5), VIEWPORT_HEIGHT*(1F/25));
                break;
            case WINNER:
                break;
            case LOSER:
                break;
        }
    }
}
