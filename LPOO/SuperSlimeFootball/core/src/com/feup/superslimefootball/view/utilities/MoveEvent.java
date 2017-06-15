package com.feup.superslimefootball.view.utilities;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by afonso on 6/10/17.
 */
public enum MoveEvent {
    /**
     * Right move event.
     */
    RIGHT(0),
    /**
     * Left move event.
     */
    LEFT(1),
    /**
     * Jump move event.
     */
    JUMP(2),
    /**
     * Power move event.
     */
    POWER(3),
    /**
     * Undefined move event.
     */
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

    /**
     * Get value int.
     *
     * @return the int
     */
    public int getValue(){
        return value;
    }

    /**
     * Get move event move event.
     *
     * @param value the value
     * @return the move event
     */
    public static MoveEvent getMoveEvent(int value){
        MoveEvent type = intToMoveEvent.get(Integer.valueOf(value));
        if (type == null)
            return MoveEvent.UNDEFINED;
        return type;
    }
}