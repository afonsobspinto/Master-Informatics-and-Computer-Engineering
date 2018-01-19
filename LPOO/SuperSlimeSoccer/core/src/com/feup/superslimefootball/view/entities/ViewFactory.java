package com.feup.superslimefootball.view.entities;

import com.badlogic.gdx.graphics.Color;
import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.model.entities.EntityModel;

import java.util.HashMap;
import java.util.Map;

import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.BALL;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.BLUESLIMELEFT;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.BLUESLIMERIGHT;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.GOALLEFT;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.GOALRIGHT;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.REDSLIMELEFT;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.REDSLIMERIGHT;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.SPEED;

/**
 * The type View factory.
 */
public class ViewFactory {

    /**
     * The map of the entities
     */
    private static Map<EntityModel.ModelType, EntityView> cache =
            new HashMap<EntityModel.ModelType, EntityView>();

    /**
     * Creates a view with the entities
     *
     * @param game  the game
     * @param model the model
     * @return entity view
     */
    public static EntityView makeView(SuperSlimeFootball game, EntityModel model) {

        if (!cache.containsKey(model.getType())) {
            if (model.getType() == BLUESLIMELEFT)
                cache.put(model.getType(), new SlimeView(game, true, Color.BLUE));
            else if (model.getType() == BLUESLIMERIGHT)
                cache.put(model.getType(), new SlimeView(game, false, Color.BLUE));
            else if (model.getType() == REDSLIMELEFT)
                cache.put(model.getType(), new SlimeView(game, true, Color.RED));
            else if (model.getType() == REDSLIMERIGHT)
                cache.put(model.getType(), new SlimeView(game, false, Color.RED));
            else if (model.getType() == BALL)
                cache.put(model.getType(), new BallView(game));
            else if (model.getType() == GOALRIGHT)
                cache.put(model.getType(), new GoalView(game, true));
            else if (model.getType() == GOALLEFT)
                cache.put(model.getType(), new GoalView(game, false));
            else if (model.getType() == SPEED)
                cache.put(model.getType(), new SpeedView(game));
        }
        return cache.get(model.getType());
    }

}
