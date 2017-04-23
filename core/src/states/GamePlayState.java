package states;

import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

import entities.Ball;
import entities.Player;

/**
 * Created by afonso on 4/23/17.
 */

public class GamePlayState extends State {

    private Player player1;
    private Player player2;
    private Ball ball;

    public GamePlayState(GameStateManager gsm) {
        super(gsm);
        player1 = new Player();
        player2 = new Player();
        ball = new Ball();
    }

    @Override
    public void handleInput() {

    }

    @Override
    public void update(float dt) {

    }

    @Override
    public void render(SpriteBatch sb) {
    }

    @Override
    public void dispose() {

    }
}
