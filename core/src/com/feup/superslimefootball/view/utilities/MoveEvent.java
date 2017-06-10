package com.feup.superslimefootball.view.utilities;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by afonso on 6/10/17.
 */

public enum MoveEvent {
    RIGHT(0),
    LEFT(1),
    JUMP(2),
    POWER(3),
    UNDEFINED(-1);


    private final int value;

    private static final Map<Integer, MoveEvent> intToMoveEvent = new HashMap<Integer, MoveEvent>();

    static {
        for (MoveEvent type : MoveEvent.values()) {
            intToMoveEvent.put(type.value, type);
        }
    }

    private MoveEvent(int value){
        this.value = value;
    }

    public int getValue(){
        return value;
    }

    public static MoveEvent getMoveEvent(int value){
        MoveEvent type = intToMoveEvent.get(Integer.valueOf(value));
        if (type == null)
            return MoveEvent.UNDEFINED;
        return type;
    }
}
