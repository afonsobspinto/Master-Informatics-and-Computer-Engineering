package com.feup.superslimefootball.view.scenes;

import com.badlogic.gdx.graphics.Camera;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.scenes.scene2d.ui.Table;
import com.badlogic.gdx.utils.Disposable;
import com.badlogic.gdx.utils.viewport.FillViewport;
import com.badlogic.gdx.utils.viewport.Viewport;
import com.feup.superslimefootball.model.GameModel;
import com.feup.superslimefootball.network.NetworkManager;
import com.feup.superslimefootball.view.utilities.GameConfig;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

/**
 * Created by afonso on 6/2/17.
 */

public class Hud implements Disposable {

    public Stage stage;
    private Viewport viewport;

    Label scorePlayerLabel;
    Label scoreOpponentLabel;
    Label goalLimitLabel;

    public Hud(Camera camera, SpriteBatch spriteBatch){

        viewport = new FillViewport(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, camera);
        stage = new Stage(viewport, spriteBatch);

        Table table = new Table();
        table.top();
        table.setFillParent(true);

        scorePlayerLabel = new Label(GameConfig.getInstance().getScore().getPlayer1().toString(), new Label.LabelStyle(new BitmapFont(), GameConfig.getInstance().getColors().getColor1()));
        scoreOpponentLabel= new Label(GameConfig.getInstance().getScore().getPlayer2().toString(), new Label.LabelStyle(new BitmapFont(), GameConfig.getInstance().getColors().getColor2()));
        goalLimitLabel= new Label(GameConfig.getInstance().getGoalLimit().toString(), new Label.LabelStyle(new BitmapFont(), Color.WHITE));

        table.add(scorePlayerLabel).expandX().padTop(10);
        table.add(goalLimitLabel).expandX().padTop(10);
        table.add(scoreOpponentLabel).expandX().padTop(10);

        stage.addActor(table);

    }

    public void update(float delta){
        scoreOpponentLabel.setText(GameConfig.getInstance().getScore().getPlayer2().toString());
        scorePlayerLabel.setText(GameConfig.getInstance().getScore().getPlayer1().toString());

        if(NetworkManager.getInstance().isConnected()){
            scoreOpponentLabel.setText(GameModel.getInstance().getScore().getPlayer2().toString());
            scorePlayerLabel.setText(GameModel.getInstance().getScore().getPlayer1().toString());
        }
    }

    @Override
    public void dispose() {
        stage.dispose();
    }
}

