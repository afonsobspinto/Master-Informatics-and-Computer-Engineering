package states;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

/**
 * Created by afonso on 4/23/17.
 */

public class MainMenuState extends State {

    private Texture background;
    private Texture singlePlayer;
    private Texture multiPlayer;

    public MainMenuState(GameStateManager gsm) {

        super(gsm);
        background = new Texture("background.png");
        singlePlayer = new Texture("singleplayer.png");
        multiPlayer = new Texture("multiplayer.png");
    }

    @Override
    public void handleInput() {

    }

    @Override
    public void update(float dt) {

    }

    @Override
    public void render(SpriteBatch sb) {
        sb.begin();
        sb.draw(background, 0, 0, Gdx.graphics.getWidth(), Gdx.graphics.getHeight());
        sb.draw(singlePlayer, (2 * Gdx.graphics.getWidth() / 5) - singlePlayer.getWidth(), (Gdx.graphics.getHeight() / 4) - singlePlayer.getHeight());
        sb.draw(multiPlayer, ( 3 * Gdx.graphics.getWidth() / 5) - multiPlayer.getWidth(), (Gdx.graphics.getHeight() / 4) - multiPlayer.getHeight());
        sb.end();
    }

    @Override
    public void dispose() {
        background.dispose();
        singlePlayer.dispose();
        multiPlayer.dispose();
    }
}
