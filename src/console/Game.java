package console;

import gameLogic.*;

public class Game {

	public static void main(String[] args) {
		System.out.println("Hello World");

		GameConfig gameConfig = new GameConfig(true);

		int i = 1;
		GameLogic g;

		while(i <= 5){
			g = new GameLogic(new Level(i), gameConfig);
			g.showBoard();
			
			while(g.isGameOn()){
				Interaction interaction = new Interaction(gameConfig);
				Direction move = interaction.getDirection();
				g.updateGame(move);
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