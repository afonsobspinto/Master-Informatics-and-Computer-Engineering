package com.feup.superslimefootball.view.entities;

import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.model.entities.EntityModel;

import java.util.HashMap;
import java.util.Map;

import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.BALL;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.GOALLEFT;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.GOALRIGHT;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.SLIMELEFT;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.SLIMERIGHT;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.SPEED;

/**
 * Created by afonso on 5/26/17.
 */

public class ViewFactory {

    private static Map<EntityModel.ModelType, EntityView> cache =
            new HashMap<EntityModel.ModelType, EntityView>();

    public static EntityView makeView(SuperSlimeFootball game, EntityModel model) {
        if (!cache.containsKey(model.getType())) {
            if (model.getType() == SLIMELEFT)
                cache.put(model.getType(), new SlimeView(game, true));
            else if (model.getType() == SLIMERIGHT)
                cache.put(model.getType(), new SlimeView(game, false));
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
