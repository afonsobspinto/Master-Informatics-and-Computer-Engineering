package console;

import gameLogic.*;

public class Game {

	public static void main(String[] args) {
		System.out.println("Hello World");

		GameConfig gameConfig = new GameConfig();
		
		Level[] levels = new Level[6];

		levels[1] = new Level(1, true, true, false);
		levels[2] = new Level(2, true, false, false);
		levels[3] = new Level(3, false, false, true);
		levels[4] = new Level(4, false, false, true);
		levels[5] = new Level(5, false, false, true);

		int i = 1;
		GameLogic g;

		while(i <= levels.length-1){
			g = new GameLogic(levels[i], gameConfig);
			
			while(g.isGameOn()){
				Interaction interaction = new Interaction(gameConfig);
				Direction move = interaction.getDirection();
				g.updateGame(i,move);
				g.showBoard();
				
				if(!g.isGameOn() && g.isWon()){
					System.out.println("\n\n\n\n");
					System.out.println("Victory");
					System.out.println("\n\n\n\n");
					i++;
				}
				else if(!g.isGameOn() && !g.isWon()){
					System.out.println("\n\n\n\n");
					System.out.println("Defeat");
					System.out.println("\n\n\n\n");
					break;
					
				}
				
			}
					
				
		}

	}

}