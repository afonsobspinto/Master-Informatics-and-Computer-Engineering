
package gameLogic;

import java.util.Scanner;

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
			
			Direction move = interection();
			Action action = hero.move(this.board, move);
			
			switch (action) {
			case NOACTION:
				break;
			case GUARD:
				System.out.println("Defeat");
				gameOn = false;
				break;
			case OPENDOOR:
				System.out.println("Victory");
				gameOn= false;
				break;
			case LEVER:
				applyLever();
			case MOVE:
				break;

			default:
				break;
			}
			
			this.board.showBoard();
		}
	}
	

	
	public Direction interection(){
		final char downKey = this.gameConfig.getDownKey();
		final char upKey = this.gameConfig.getUpKey();
		final char rigthKey = this.gameConfig.getRightKey();
		final char leftKey = this.gameConfig.getLeftKey();
		
		Scanner keyboard = new Scanner(System.in);
		char key = keyboard.next().charAt(0);
		
		if (key == downKey) {
			return Direction.DOWN;
			
		} else if (key == upKey) {
			return Direction.UP;
			
		} else if (key == rigthKey) {
			return Direction.RIGHT;
			
		} else if (key == leftKey) {
			return Direction.LEFT;
			
		} else {
			return Direction.INVALID;
		}
		
		
	}
}

