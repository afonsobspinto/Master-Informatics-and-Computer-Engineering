
package gameLogic;

import java.util.Scanner;
import console.Interaction;

public class Game {

	private Board board;
	private Hero hero;
	private Guard guard;
	private CrazyOgre crazyOgre;
	private GameConfig gameConfig;

	public Game(int level, GameConfig gameConfig){

		this.gameConfig = gameConfig;

		this.board = new Board(level);
		this.hero = new Hero(level);
		this.guard = new Guard(level);
		this.crazyOgre= new CrazyOgre(level);

		this.board.setBoardAt(hero.position, hero.symbol);
		this.board.setBoardAt(guard.position, guard.symbol);
		this.board.setBoardAt(crazyOgre.position, crazyOgre.symbol);
		
		this.board.showBoard();
		
		updateGame(level);

	}
	
	
	public void applyLever(){
		for(int i =0; i < gameConfig.getrows(); i++){
			for(int j = 0; j < gameConfig.getcolumns(); j++){
				if(this.board.getBoardAt(i, j)=='I'){
					this.board.setBoardAt(i,j, 'S');
				}
			}
}
	}
	
	public void updateGame(int level){

		boolean gameOn = true;
		
		while(gameOn){
			
			Interaction interaction = new Interaction(gameConfig);
			Direction move = interaction.getDirection();
			guard.move(board);
			Action action = hero.move(this.board, move);
			
			
			
			
			switch (action) {
			case NOACTION:
				break;
			case GUARD:
				System.out.println("\n\n\n\n");
				System.out.println("Defeat");
				System.out.println("\n\n\n\n");
				gameOn = false;
				break;
			case OPENDOOR:
				System.out.println("\n\n\n\n");
				System.out.println("Victory");
				System.out.println("\n\n\n\n");
				gameOn= false;
				break;
			case LEVER:
				applyLever();
			case MOVE:
				break;

			default:
				break;
			}
			
			if(gameOn)
				this.board.showBoard();
		}
	}
}

