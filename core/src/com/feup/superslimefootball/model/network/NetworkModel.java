package com.feup.superslimefootball.model.network;

import com.badlogic.gdx.physics.box2d.Body;
import com.badlogic.gdx.physics.box2d.World;
import com.badlogic.gdx.utils.Array;
import com.feup.superslimefootball.controller.GameController;

import java.net.Socket;

/**
 * Created by afonso on 4/30/17.
 */

public class NetworkModel {
    private Socket socket;

    private World world;

    Array<Body> bodies;

    public NetworkModel() {

        world = GameController.getInstance().getWorld();
        bodies = new Array<Body>();
        world.getBodies(bodies);
    }

    public void connectSocket(){
        try {

        } catch(Exception e){
            System.out.println(e);
        }
    }

    public void configureSocketEvents(){

    }
}
