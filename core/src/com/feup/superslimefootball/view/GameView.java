package com.feup.superslimefootball.view;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.utils.viewport.ScreenViewport;
import com.badlogic.gdx.utils.viewport.Viewport;
import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.model.GameModel;
import com.feup.superslimefootball.model.entities.SlimeModel;
import com.feup.superslimefootball.view.entities.EntityView;
import com.feup.superslimefootball.view.entities.ViewFactory;

/**
 * A view representing the game screen. Draws all the other views and
 * controls the camera.
 */

public class GameView extends ScreenAdapter {

    /**
     * The game width.
     */
    public static final int GAME_WIDTH = 100;

    /**
     * The game height.
     */
    public static final int GAME_HEIGHT = 50;

    /**
     * The game this screen belongs to.
     */
    private final SuperSlimeFootball game;

    /**
     * The viewport used to show the game.
     */

    private final Viewport viewport;

    /**
     * The camera used to show the viewport.
     */

    private final OrthographicCamera camera;


    /**
     * The aspectRatio of the screen.
     */
    private final float aspectRatio;

    public GameView(SuperSlimeFootball game) {
        this.game = game;
        this.aspectRatio = (float) Gdx.graphics.getHeight()/(float)Gdx.graphics.getWidth();
        this.camera = new OrthographicCamera();
        //TODO: Change to ExtendViewPort
        viewport = new ScreenViewport(camera);
        viewport.setScreenBounds(0, 0, Gdx.graphics.getWidth(), Gdx.graphics.getHeight());
        loadAssets();
    }



    /**
     * Loads the assets needed by this screen.
     */
    private void loadAssets() {
        this.game.getAssetManager().load( "background.png" , Texture.class);
        this.game.getAssetManager().load( "ball.png" , Texture.class);
        this.game.getAssetManager().load( "blueSlime.png" , Texture.class);
        this.game.getAssetManager().load( "redSlime.png" , Texture.class);
        this.game.getAssetManager().load( "ball.png" , Texture.class);
        //this.game.getAssetManager().load( "power.png", Texture.class);
        this.game.getAssetManager().finishLoading();
    }


    /**
     * Updates viewport on screen resize .
     *
     * @param width width of new screen size;
     * @param height width of new screen size;
     */

    @Override
    public void resize(int width, int height) {
        viewport.update(width, height, true);
    }

    /**
     * Renders this screen.
     *
     * @param delta time since last renders in seconds.
     */
    @Override
    public void render(float delta) {
        //handleInputs(delta);


        //TODO: Change update Logic we can't move the camera

        Gdx.gl.glClearColor(0, 0, 0, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        viewport.apply();
        game.getBatch().setProjectionMatrix(camera.combined);
        game.getBatch().begin();
        drawBackground();
        drawEntities();
        game.getBatch().end();

    }

    //TODO: handleInputs by tilting

    /**
     * Handles any inputs and passes them to the controller.
     *
     * @param delta time since last time inputs where handled in seconds
     */
    private void handleInputs(float delta) {
        // How do we do tilting?

        if (Gdx.input.isKeyPressed(Input.Keys.LEFT)) {
            //GameController.getInstance().rotateLeft(delta);
        }
        if (Gdx.input.isKeyPressed(Input.Keys.RIGHT)) {
            //GameController.getInstance().rotateRight(delta);
        }
        if (Gdx.input.isKeyPressed(Input.Keys.UP)) {
            //GameController.getInstance().accelerate(delta);
        }
        if (Gdx.input.isKeyPressed(Input.Keys.SPACE)) {
            //GameController.getInstance().shoot();
        }
    }

//TODO: drawEntities

    /**
     * Draws the entities to the screen.
     */
    private void drawEntities() {

        //TODO: Draw the others Entities
        SlimeModel slime = GameModel.getInstance().getSlime();
        EntityView view = ViewFactory.makeView(game, slime);
        view.update(slime);
        view.draw(game.getBatch());
    }

    /**
     * Draws the background
     */
    private void drawBackground() {
        Texture background = game.getAssetManager().get("background.png", Texture.class);
        game.getBatch().draw(background,0,0, viewport.getScreenWidth(), viewport.getScreenHeight());
    }

}

