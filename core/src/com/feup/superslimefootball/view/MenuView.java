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

import java.util.HashMap;

public abstract class MenuView extends ScreenAdapter {

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
    public final SuperSlimeFootball menu;

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

    /*
     * ArrayList with the Textures
     */
    public HashMap<String, Texture> textures;

    /**
     * Creates this screen.
     *
     * @param menu The menu this screen belongs to
     */
    public MenuView(SuperSlimeFootball menu) {
        //super();
        this.menu = menu;
        this.textures = new HashMap<String, Texture>();
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

        this.menu.getAssetManager().finishLoading(); // TODO: Possivel problema aqui

        this.textures.put("menuBackground",(Texture)this.menu.getAssetManager().get("menuBackground.png", Texture.class));
        this.textures.put("ball",(Texture)this.menu.getAssetManager().get("ball.png", Texture.class));
        this.textures.put("singlePlayer",(Texture)this.menu.getAssetManager().get("singleplayer.png", Texture.class));
        this.textures.put("multiPlayer",(Texture)this.menu.getAssetManager().get("multiplayer.png", Texture.class));
        this.textures.put("options",(Texture)this.menu.getAssetManager().get("options.png", Texture.class));
        this.textures.put("facebook",(Texture)this.menu.getAssetManager().get("facebook.png", Texture.class));
        this.textures.put("twitter",(Texture)this.menu.getAssetManager().get("twitter.png", Texture.class));
        this.textures.put("blueSlime",(Texture)this.menu.getAssetManager().get("blueSlime.png", Texture.class));
        this.textures.put("redSlime",(Texture)this.menu.getAssetManager().get("redSlime.png", Texture.class));
        this.textures.put("blueSlimeButton",(Texture)this.menu.getAssetManager().get("blueSlimeButton.png", Texture.class));
        this.textures.put("redSlimeButton",(Texture)this.menu.getAssetManager().get("redSlimeButton.png", Texture.class));
        this.textures.put("refresh",(Texture)this.menu.getAssetManager().get("refresh.png", Texture.class));
        this.textures.put("findIP",(Texture)this.menu.getAssetManager().get("findIP.png", Texture.class));
        this.textures.put("howToPlay",(Texture)this.menu.getAssetManager().get("howToPlay.png", Texture.class));
        this.textures.put("sound",(Texture)this.menu.getAssetManager().get("sound.png", Texture.class));
        this.textures.put("comments",(Texture)this.menu.getAssetManager().get("comments.png", Texture.class));
        this.textures.put("goalLimit",(Texture)this.menu.getAssetManager().get("goalLimit.png", Texture.class));

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
        //this.drawButtons();
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
        this.menu.getBatch().draw(this.textures.get("menuBackground"), 0.0F, 0.0F);
        this.menu.getBatch().draw(this.textures.get("ball"), VIEWPORT_WIDTH/2, VIEWPORT_HEIGHT/5);
    }

    /**
     * Draws the buttons
     */
    void drawButtons() {}

}
