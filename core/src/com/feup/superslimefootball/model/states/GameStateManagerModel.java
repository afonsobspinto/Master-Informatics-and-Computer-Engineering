package com.feup.superslimefootball.model.states;

import java.util.Stack;

/**
 * Created by afonso on 4/23/17.
 */

public class GameStateManagerModel {
    private Stack<StateModel> states;

    public GameStateManagerModel(){
        states = new Stack<StateModel>();
    }

    public void push(StateModel state){
        states.push(state);
    }

    public void pop(){
        states.pop();
    }

    public void set(StateModel state) {
        states.pop();
        states.push(state);
    }

}
