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
import com.feup.superslimefootball.view.states.MenuState;
import com.feup.superslimefootball.view.states.OptionsMenuState;

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
     * The menu this screen belongs to.
     */
    public final SuperSlimeFootball menu;

    /**
     * The camera used to show the viewport.
     */
    private final OrthographicCamera camera;


    /*
     * The state of the Menu
     */

    MenuState state;

    /**
     * Creates this screen.
     *
     * @param menu The menu this screen belongs to
     */
    public MenuView(SuperSlimeFootball menu) {
        this.menu = menu;
        this.state = new OptionsMenuState(menu);
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

        this.menu.getAssetManager().finishLoading(); // TODO: Possivel problema aqui
    }


    /**
     * Renders this screen.
     *
     * @param delta time since last renders in seconds.
     */
    public void render(float delta) {
        this.menu.getBatch().setProjectionMatrix(this.camera.combined);
        //state.handleMouse(delta);


        Gdx.gl.glClearColor(1.0F, 0.0F, 0.0F, 1.0F);
        Gdx.gl.glClear(16384);
        this.menu.getBatch().begin();
        this.drawBackground();
        state.drawButtons();
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
        Texture background = menu.getAssetManager().get("menuBackground.png", Texture.class);
        menu.getBatch().draw(background, 0, 0);

        Texture ball = menu.getAssetManager().get("ball.png", Texture.class);
        menu.getBatch().draw(ball, VIEWPORT_WIDTH*(3.9f/5.0f) - ball.getWidth()/2, VIEWPORT_HEIGHT*(2.0f/3.0f) - ball.getWidth()/2);
    }

      /*
     * Sets the state
     */

    public void setState(MenuState state) {
        this.state = state;
    }
}
