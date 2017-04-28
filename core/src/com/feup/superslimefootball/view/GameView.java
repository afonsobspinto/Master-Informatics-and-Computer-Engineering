package com.feup.superslimefootball.view;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.feup.superslimefootball.SuperSlimeFootball;

/**
 * Created by afonso on 4/28/17.
 */

/**
 * A view representing the game screen. Draws all the other views and
 * controls the camera.
 */

public class GameView extends ScreenAdapter {

    /**
     * How much meters does a pixel represent.
     */
    public final static float PIXEL_TO_METER = 0.04f;

    /**
     * The width of the viewport in meters. The height is
     * automatically calculated using the screen ratio.
     */
    private static final float VIEWPORT_WIDTH = 20;

    /**
     * The game this screen belongs to.
     */
    private final SuperSlimeFootball game;

    /**
     * The camera used to show the viewport.
     */

    private final OrthographicCamera camera;

    public GameView(SuperSlimeFootball game) {
        this.game = game;
        this.camera = createCamera();
        loadAssets();
    }

    /**
     * Creates the camera used to show the viewport.
     *
     * @return the camera
     */
    private OrthographicCamera createCamera() {

        OrthographicCamera camera = new OrthographicCamera(VIEWPORT_WIDTH / PIXEL_TO_METER, VIEWPORT_WIDTH / PIXEL_TO_METER * ((float) Gdx.graphics.getHeight() / (float)Gdx.graphics.getWidth()));
        camera.position.set(camera.viewportWidth / 2f, camera.viewportHeight / 2f, 0);
        camera.update();

        return camera;
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
        this.game.getAssetManager().finishLoading();
    }



    /**
     * Renders this screen.
     *
     * @param delta time since last renders in seconds.
     */
    @Override
    public void render(float delta) {
        handleInputs(delta);



//        GameController.getInstance().update(delta);

        // We can't use this this way;

//        camera.position.set(GameModel.getInstance().getShip().getX() / PIXEL_TO_METER, GameModel.getInstance().getShip().getY() / PIXEL_TO_METER, 0);
        camera.update();
        game.getBatch().setProjectionMatrix(camera.combined);

        Gdx.gl.glClearColor( 103/255f, 69/255f, 117/255f, 1 );
        Gdx.gl.glClear( GL20.GL_COLOR_BUFFER_BIT | GL20.GL_DEPTH_BUFFER_BIT );

        game.getBatch().begin();
        drawBackground();
        drawEntities();
        game.getBatch().end();

    }

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


    /**
     * Draws the entities to the screen.
     */
    private void drawEntities() {
//        List<AsteroidModel> asteroids = GameModel.getInstance().getAsteroids();
//        for (AsteroidModel asteroid : asteroids) {
//            EntityView view = ViewFactory.makeView(game, asteroid);
//            view.update(asteroid);
//            view.draw(game.getBatch());
//        }
//
//        List<BulletModel> bullets = GameModel.getInstance().getBullets();
//        for (BulletModel bullet : bullets) {
//            EntityView view = ViewFactory.makeView(game, bullet);
//            view.update(bullet);
//            view.draw(game.getBatch());
//        }
//
//        ShipModel ship = GameModel.getInstance().getShip();
//        EntityView view = ViewFactory.makeView(game, ship);
//        view.update(ship);
//        view.draw(game.getBatch());
    }

    /**
     * Draws the background
     */
    private void drawBackground() {
        Texture background = game.getAssetManager().get("background.png", Texture.class);
        background.setWrap(Texture.TextureWrap.Repeat, Texture.TextureWrap.Repeat);
        game.getBatch().draw(background, 0, 0, 0, 0, (int)(100 / PIXEL_TO_METER), (int) (50 / PIXEL_TO_METER));
    }

}

