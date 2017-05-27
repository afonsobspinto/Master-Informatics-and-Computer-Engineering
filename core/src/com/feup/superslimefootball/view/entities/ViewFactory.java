package com.feup.superslimefootball.view.entities;

import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.model.entities.EntityModel;

import java.util.HashMap;
import java.util.Map;

import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.BALL;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.SLIME;

/**
 * Created by afonso on 5/26/17.
 */

public class ViewFactory {

    private static Map<EntityModel.ModelType, EntityView> cache =
            new HashMap<EntityModel.ModelType, EntityView>();

    public static EntityView makeView(SuperSlimeFootball game, EntityModel model) {
        if (!cache.containsKey(model.getType())) {
            if (model.getType() == SLIME)
                cache.put(model.getType(), new SlimeView(game));
            if (model.getType() == BALL)
                cache.put(model.getType(), new BallView(game));
        }
        return cache.get(model.getType());
    }

}
