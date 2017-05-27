package com.feup.superslimefootball.view;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.math.Matrix4;
import com.badlogic.gdx.physics.box2d.Box2DDebugRenderer;
import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.controller.GameController;
import com.feup.superslimefootball.model.GameModel;
import com.feup.superslimefootball.model.entities.SlimeModel;
import com.feup.superslimefootball.view.entities.EntityView;
import com.feup.superslimefootball.view.entities.ViewFactory;

/**
 * Created by afonso on 5/26/17.
 */

public class GameView extends ScreenAdapter {

    /**
     * How much pixels does a meter represent.
     */
    public final static float PPM = 32;

    /**
     * The width of the viewport.
     */
    private static final float VIEWPORT_WIDTH = 800;

    /**
     * The height of the viewport.
     */
    private static final float VIEWPORT_HEIGHT = 400;

    /**
     * The game this screen belongs to.
     */
    private final SuperSlimeFootball game;

    /**
     * The camera used to show the viewport.
     */
    private final OrthographicCamera camera;

    /**
     * A renderer used to debug the physical fixtures.
     */
    private Box2DDebugRenderer debugRenderer;

    /**
     * The transformation matrix used to transform meters into
     * pixels in order to show fixtures in their correct places.
     */
    private Matrix4 debugCamera;


    /**
     * Creates this screen.
     *
     * @param game The game this screen belongs to
     */
    public GameView(SuperSlimeFootball game) {
        this.game = game;

        loadAssets();
        this.camera = createCamera();
    }


    /**
     * Creates the camera used to show the viewport.
     *
     * @return the camera
     */
    private OrthographicCamera createCamera() {

        OrthographicCamera camera = new OrthographicCamera();
        camera.setToOrtho(false, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
        this.game.getBatch().setProjectionMatrix(camera.combined);

        debugRenderer = new Box2DDebugRenderer();
        return camera;
    }


    /**
     * Loads the assets needed by this screen.
     */
    private void loadAssets() {
        this.game.getAssetManager().load( "background.png" , Texture.class);
        this.game.getAssetManager().load( "blueSlime.png" , Texture.class);

        this.game.getAssetManager().finishLoading();
    }


    /**
     * Renders this screen.
     *
     * @param delta time since last renders in seconds.
     */
    @Override
    public void render (float delta) {

        GameController.getInstance().update(delta);

        Gdx.gl.glClearColor(1, 0, 0, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        game.getBatch().begin();
        drawBackground();
        drawEntities();
        game.getBatch().end();
        debugRenderer.render(GameController.getInstance().getWorld(), camera.combined.cpy().scl(PPM));
    }

    /**
     * Draws the background
     */
    private void drawBackground() {
        Texture background = game.getAssetManager().get("background.png", Texture.class);
        game.getBatch().draw(background, 0, 0);
    }

    /**
     * Draws the entities to the screen.
     */
    private void drawEntities() {
        SlimeModel slimeOne = GameModel.getInstance().getSlimeModel();
        EntityView view = ViewFactory.makeView(game, slimeOne);
        view.update(slimeOne);
        view.draw(game.getBatch());
    }
}
