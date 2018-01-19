package com.feup.superslimefootball.desktop;

import com.badlogic.gdx.backends.lwjgl.LwjglApplication;
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration;
import com.feup.superslimefootball.SuperSlimeFootball;

import static com.feup.superslimefootball.controller.GameController.GAME_HEIGHT;
import static com.feup.superslimefootball.controller.GameController.GAME_WIDTH;

public class DesktopLauncher {
	public static void main (String[] arg) {
		LwjglApplicationConfiguration config = new LwjglApplicationConfiguration();

		config.width = GAME_WIDTH;
		config.height = GAME_HEIGHT;

		new LwjglApplication(new SuperSlimeFootball(), config);
	}
}
