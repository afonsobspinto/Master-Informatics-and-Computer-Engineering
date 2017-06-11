package com.feup.superslimefootball.view.utilities;

import com.badlogic.gdx.graphics.Color;

import java.io.Serializable;

/**
 * Created by afonso on 6/2/17.
 */

public class ColorPair implements Serializable {
    private Color color1;
    private Color color2;

    public ColorPair(Color color1, Color color2) {
        this.color1 = color1;
        this.color2 = color2;
    }

    public Color getColor1() {
        return color1;
    }

    public Color getColor2() {
        return color2;
    }
}
