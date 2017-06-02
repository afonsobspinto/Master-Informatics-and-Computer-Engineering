package com.feup.superslimefootball.view.scenes;

import com.badlogic.gdx.graphics.Camera;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.scenes.scene2d.Stage;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.scenes.scene2d.ui.Table;
import com.badlogic.gdx.utils.viewport.FillViewport;
import com.badlogic.gdx.utils.viewport.Viewport;

import static com.feup.superslimefootball.view.GameView.VIEWPORT_HEIGHT;
import static com.feup.superslimefootball.view.GameView.VIEWPORT_WIDTH;

/**
 * Created by afonso on 6/2/17.
 */

public class Hud {

    public Stage stage;
    private Integer scorePlayer;
    private Integer scoreOpponent;
    private Integer goalLimit;
    private Viewport viewport;

    Label scorePlayerLabel;
    Label scoreOpponentLabel;
    Label goalLimitLabel;

    public Hud(Camera camera, SpriteBatch spriteBatch){
        scorePlayer = 0;
        scoreOpponent = 0;
        goalLimit = 3;

        viewport = new FillViewport(VIEWPORT_WIDTH, VIEWPORT_HEIGHT, camera);
        stage = new Stage(viewport, spriteBatch);

        Table table = new Table();
        table.top();
        table.setFillParent(true);

        scorePlayerLabel = new Label(scorePlayer.toString(), new Label.LabelStyle(new BitmapFont(), Color.BLUE));
        scoreOpponentLabel= new Label(scoreOpponent.toString(), new Label.LabelStyle(new BitmapFont(), Color.RED));
        goalLimitLabel= new Label(goalLimit.toString(), new Label.LabelStyle(new BitmapFont(), Color.WHITE));

        table.add(scorePlayerLabel).expandX().padTop(10);
        table.add(goalLimitLabel).expandX().padTop(10);
        table.add(scoreOpponentLabel).expandX().padTop(10);

        stage.addActor(table);

    }


}
