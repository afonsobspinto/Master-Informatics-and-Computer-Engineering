package com.feup.superslimefootball.view.utilities;

/**
 * Created by afonso on 6/1/17.
 */

public enum Color {BLUE, RED;

    public static Color getRandom(Color notThisColor) {

        Color temp;

        do{
            temp = values()[(int) (Math.random() * values().length)];
        } while (temp == notThisColor);

        return  temp;
    }
}
