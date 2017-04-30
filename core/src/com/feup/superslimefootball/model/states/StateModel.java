package com.feup.superslimefootball.model.states;
/**
 * Created by afonso on 4/23/17.
 */

public abstract class StateModel {

    protected GameStateManagerModel gsm;

    public StateModel(GameStateManagerModel gsm){
        this.gsm = gsm;
    }

}
