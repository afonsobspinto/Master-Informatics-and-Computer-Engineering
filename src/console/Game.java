package console;

import gameLogic.*;

public class Game {

	public static void main(String[] args) {
		System.out.println("Hello World");

		GameConfig gameConfig = new GameConfig();

		int levels = 5;
		int i = -2;
		GameLogic g;

		while(i <= levels){
			g = new GameLogic(i, gameConfig);
			
			
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