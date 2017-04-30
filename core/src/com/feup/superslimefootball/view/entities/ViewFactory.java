package com.feup.superslimefootball.view.entities;

import com.feup.superslimefootball.SuperSlimeFootball;
import com.feup.superslimefootball.model.entities.EntityModel;

import java.util.HashMap;
import java.util.Map;

import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.BALL;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.GOAL;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.POWER;
import static com.feup.superslimefootball.model.entities.EntityModel.ModelType.SLIME;


/**
 * Created by afonso on 4/30/17.
 */

public class ViewFactory {

    private static Map<EntityModel.ModelType, EntityView> cache =
            new HashMap<EntityModel.ModelType, EntityView>();

    public static EntityView makeView(SuperSlimeFootball game, EntityModel model) {
        if (!cache.containsKey(model.getType())) {
            if (model.getType() == BALL) cache.put(model.getType(), new BallView(game));
            if (model.getType() == SLIME) cache.put(model.getType(), new SlimeView(game));
            if (model.getType() == GOAL) cache.put(model.getType(), new GoalView(game));
            if (model.getType() == POWER) cache.put(model.getType(), new PowerView(game));
        }
        return cache.get(model.getType());
    }
}
