package com.feup.superslimefootball.view;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.math.Matrix4;
import com.badlogic.gdx.physics.box2d.Box2DDebugRenderer;
import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.controller.GameController;
import com.feup.superslimefootball.model.GameModel;
import com.feup.superslimefootball.model.entities.BallModel;
import com.feup.superslimefootball.model.entities.GoalModel;
import com.feup.superslimefootball.model.entities.PowerModel;
import com.feup.superslimefootball.model.entities.SlimeModel;
import com.feup.superslimefootball.network.NetworkManager;
import com.feup.superslimefootball.view.entities.EntityView;
import com.feup.superslimefootball.view.entities.ViewFactory;
import com.feup.superslimefootball.view.scenes.Hud;
import com.feup.superslimefootball.view.states.LoserMenuState;
import com.feup.superslimefootball.view.states.WinnerMenuState;
import com.feup.superslimefootball.view.utilities.GameConfig;
import com.feup.superslimefootball.view.utilities.MoveEvent;

import java.util.List;

/**
 * Created by afonso on 5/26/17.
 */

public class GameView extends ScreenAdapter {

    private final static boolean DEBUG = true;

    /**
     * How much pixels does a meter represent.
     */
    public final static float PPM = 32;

    /**
     * The width of the viewport.
     */
    public static final float VIEWPORT_WIDTH = 800;

    /**
     * The height of the viewport.
     */
    public static final float VIEWPORT_HEIGHT = 400;

    /**
     * The game this screen belongs to.
     */
    private final SuperSlimeFootball game;

    /**
     * The camera used to show the viewport.
     */
    private final OrthographicCamera camera;


    /**
     * The hud to show
     */
    private Hud hud;

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

        this.hud = new Hud(camera, this.game.getBatch());
    }


    /**
     * Creates the camera used to show the viewport.
     *
     * @return the camera
     */
    private OrthographicCamera createCamera() {

        OrthographicCamera camera = new OrthographicCamera();
        camera.setToOrtho(false, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);


        debugRenderer = new Box2DDebugRenderer();
        return camera;
    }


    /**
     * Loads the assets needed by this screen.
     */
    private void loadAssets() {
        this.game.getAssetManager().load( "background.png" , Texture.class);
        this.game.getAssetManager().load( "post.png", Texture.class);
        this.game.getAssetManager().load( "blueSlime.png" , Texture.class);
        this.game.getAssetManager().load( "ball.png", Texture.class);
        this.game.getAssetManager().load( "goal.png", Texture.class);
        this.game.getAssetManager().load( "speedPower.png", Texture.class);

        this.game.getAssetManager().finishLoading();
    }


    /**
     * Renders this screen.
     *
     * @param delta time since last renders in seconds.
     */
    @Override
    public void render (float delta) {

        if(NetworkManager.getInstance().isConnected())
            GameController.getInstance().updateNetwork(true);

        if(NetworkManager.getInstance().isServer() || !NetworkManager.getInstance().isConnected()) {
            updateScore();
            GameController.getInstance().manageFlagged();
        }

        handleInputs();

        if(NetworkManager.getInstance().isServer() || !NetworkManager.getInstance().isConnected()) {
            GameController.getInstance().update(delta);
        }
        hud.update(delta);

        this.game.getBatch().setProjectionMatrix(camera.combined);

        Gdx.gl.glClearColor(1, 0, 0, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        game.getBatch().begin();
        drawBackground();
        drawEntities();
        game.getBatch().end();
        hud.stage.draw();
        if(DEBUG)
            debugRenderer.render(GameController.getInstance().getWorld(), camera.combined.cpy().scl(PPM));
    }

    /**
     * Handles any inputs and passes them to the controller.
     *
     */
    private void handleInputs() {
        if(NetworkManager.getInstance().isServer() || !NetworkManager.getInstance().isConnected())
            handleInputsController();
        else
            handleInputsClient();

    }

    /**
     * Handles any inputs and passes them to the controller.
     *
     */
    private void handleInputsController() {
        if (Gdx.input.isKeyPressed(Input.Keys.LEFT)) {
            GameController.getInstance().moveLeft();
        }
        else if (Gdx.input.isKeyPressed(Input.Keys.RIGHT)) {
            GameController.getInstance().moveRight();
        }
        else if (Gdx.input.isKeyPressed(Input.Keys.UP)) {
            GameController.getInstance().jump();
        }
        else if (Gdx.input.isKeyPressed(Input.Keys.SPACE)) {
            GameController.getInstance().powerUP();
        }
        else if (Gdx.input.getAccelerometerY() > 0) {
            GameController.getInstance().moveRight();
        }
        else if (Gdx.input.getAccelerometerY() < 0) {
            GameController.getInstance().moveLeft();
        }
        else if (Gdx.input.justTouched()) {
            if (Gdx.input.getX() > Gdx.graphics.getWidth() / 2)
                GameController.getInstance().jump();
            else
                GameController.getInstance().powerUP();
        }
    }

    /**
     * Handles any inputs and passes them to the networkManager.
     *
     */
    private void handleInputsClient(){
        if (Gdx.input.isKeyPressed(Input.Keys.LEFT)) {
            NetworkManager.getInstance().sendData(MoveEvent.LEFT);
        }
        else if (Gdx.input.isKeyPressed(Input.Keys.RIGHT)) {
            NetworkManager.getInstance().sendData(MoveEvent.RIGHT);
        }
        else if (Gdx.input.isKeyPressed(Input.Keys.UP)) {
            NetworkManager.getInstance().sendData(MoveEvent.JUMP);
        }
        else if (Gdx.input.isKeyPressed(Input.Keys.SPACE)) {
            NetworkManager.getInstance().sendData(MoveEvent.POWER);
        }
        else if (Gdx.input.getAccelerometerY() > 0) {
            NetworkManager.getInstance().sendData(MoveEvent.RIGHT);
        }
        else if (Gdx.input.getAccelerometerY() < 0) {
            NetworkManager.getInstance().sendData(MoveEvent.LEFT);
        }
        else if (Gdx.input.justTouched()) {
            if (Gdx.input.getX() > Gdx.graphics.getWidth() / 2)
                NetworkManager.getInstance().sendData(MoveEvent.JUMP);
            else
                NetworkManager.getInstance().sendData(MoveEvent.POWER);
        }
        else
            NetworkManager.getInstance().sendData(MoveEvent.UNDEFINED);

    }


    /**
     * Draws the background
     */
    private void drawBackground() {
        Texture background = game.getAssetManager().get("background.png", Texture.class);
        game.getBatch().draw(background, 0, 0);

        Texture post = game.getAssetManager().get("post.png", Texture.class);
        game.getBatch().draw(post,60f,30f);

        TextureRegion rightPost = new TextureRegion(post);
        rightPost.flip(true,false);
        game.getBatch().draw(rightPost,690f,30f);
    }

    /**
     * Draws the entities to the screen.
     */
    private void drawEntities() {

        List<PowerModel> powers = GameModel.getInstance().getPowers();
        for (PowerModel power : powers) {
            EntityView powerView = ViewFactory.makeView(game, power);
            powerView.update(power);
            powerView.draw(game.getBatch());
        }

        SlimeModel slimeOne = GameModel.getInstance().getSlimeModel();
        slimeOne.setColor(GameConfig.getInstance().getColors().getColor1());

        EntityView slimeOneView = ViewFactory.makeView(game, slimeOne);
        slimeOneView.update(slimeOne);
        slimeOneView.draw(game.getBatch());

        SlimeModel slimeTwo = GameModel.getInstance().getOpponentSlimeModel();
        slimeTwo.setColor(GameConfig.getInstance().getColors().getColor2());
        EntityView slimeTwoView = ViewFactory.makeView(game, slimeTwo);
        slimeTwoView.update(slimeTwo);
        slimeTwoView.draw(game.getBatch());

        BallModel ball = GameModel.getInstance().getBallModel();
        EntityView ballView = ViewFactory.makeView(game, ball);
        ballView.update(ball);
        ballView.draw(game.getBatch());


        List<GoalModel> goals = GameModel.getInstance().getGoals();
        for (GoalModel goal : goals) {
            EntityView goalView = ViewFactory.makeView(game, goal);
            goalView.update(goal);
            goalView.draw(game.getBatch());
        }
    }

    private void updateScore(){
        if(GameConfig.getInstance().getGoalLimit() == GameConfig.getInstance().getScore().getPlayer1()) {
            this.game.setGameState(new WinnerMenuState(this.game));
            game.setScreen(new MenuView(game));
        }
        if(GameConfig.getInstance().getGoalLimit() == GameConfig.getInstance().getScore().getPlayer2()){
            this.game.setGameState(new LoserMenuState(this.game));
            game.setScreen(new MenuView(game));
        }

    }
}
