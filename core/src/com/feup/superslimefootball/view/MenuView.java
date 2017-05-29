//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.feup.superslimefootball.view;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.math.Matrix4;
import com.feup.superslimefootball.SuperSlimeFootball;

public class MenuView extends ScreenAdapter {
    public static final float PPM = 32.0F;
    public static final float VIEWPORT_WIDTH = 800.0F;
    public static final float VIEWPORT_HEIGHT = 400.0F;
    private final SuperSlimeFootball menu;
    private final OrthographicCamera camera;
    private Matrix4 debugCamera;

    public MenuView(SuperSlimeFootball menu) {
        this.menu = menu;
        this.loadAssets();
        this.camera = this.createCamera();
    }

    private OrthographicCamera createCamera() {
        OrthographicCamera camera = new OrthographicCamera();
        camera.setToOrtho(false, 800.0F, 400.0F);
        return camera;
    }

    private void loadAssets() {
        this.menu.getAssetManager().load("menuBackground.png", Texture.class);
        this.menu.getAssetManager().load("singleplayer.png", Texture.class);
        this.menu.getAssetManager().load("multiplayer.png", Texture.class);
        this.menu.getAssetManager().load("options.png", Texture.class);
        this.menu.getAssetManager().finishLoading();
    }

    public void render(float delta) {
        this.menu.getBatch().setProjectionMatrix(this.camera.combined);
        this.handleInputs(delta);
        Gdx.gl.glClearColor(1.0F, 0.0F, 0.0F, 1.0F);
        Gdx.gl.glClear(16384);
        this.menu.getBatch().begin();
        this.drawBackground();
        this.menu.getBatch().end();
    }

    private void handleInputs(float delta) {
    }

    private void drawBackground() {
        Texture background = (Texture)this.menu.getAssetManager().get("menuBackground.png", Texture.class);
        Texture singlePlayer = (Texture)this.menu.getAssetManager().get("singleplayer.png", Texture.class);
        Texture multiPlayer = (Texture)this.menu.getAssetManager().get("multiplayer.png", Texture.class);
        Texture options = (Texture)this.menu.getAssetManager().get("options.png", Texture.class);
        this.menu.getBatch().draw(background, 0.0F, 0.0F);
        this.menu.getBatch().draw(singlePlayer, 170.0F, 15.0F);
        this.menu.getBatch().draw(multiPlayer, 352.0F, 15.0F);
        this.menu.getBatch().draw(options, 530.0F, 15.0F);
    }
}
