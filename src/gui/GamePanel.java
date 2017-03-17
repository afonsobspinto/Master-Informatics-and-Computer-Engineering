package gui;

import gameLogic.*;

public class GamePanel {
	
	private GameLogic gameLogic;
	private GameConfig gameConf;

	GamePanel(){
		gameConf = new GameConfig();
	}
	
	public void start(){
		gameLogic = new GameLogic(new Level(5), gameConf);
	}
}
