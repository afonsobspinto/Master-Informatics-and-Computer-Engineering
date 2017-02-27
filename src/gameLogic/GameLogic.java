
package gameLogic;

import java.util.Scanner;
import java.util.concurrent.ThreadLocalRandom;

import console.Interaction;

public class GameLogic {

	private Board board;
	private Hero hero;
	private Guard guard;
	private CrazyOgre crazyOgre;
	private GameConfig gameConfig;
	boolean won;
	boolean gameOn;

	public GameLogic(int level, GameConfig gameConfig){

		this.gameConfig = gameConfig;
		this.gameOn = true;
		this.won = false;

		this.board = new Board(level);
		this.hero = new Hero(level);
		randomGuard(level);
		this.crazyOgre= new CrazyOgre(level);

		this.board.setBoardAt(hero.position, hero.symbol);
		this.board.setBoardAt(guard.position, guard.symbol);
		this.board.setBoardAt(crazyOgre.position, crazyOgre.symbol);
		if(crazyOgre.isArmed)
			this.board.setBoardAt(crazyOgre.weaponLocation, crazyOgre.weapon);
		
		this.board.showBoard();
		

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
	

	public void updateGame(int level, Direction move){

		guard.move(board);
		crazyOgre.move(board);
		Action action = hero.move(this.board, move);

		if(action != Action.OPENDOOR){
			if(hero.isSymbolnearby(board, 'G')){
				action = Action.GUARD;
			}
			if(hero.isSymbolnearby(board, 'O') || hero.isSymbolnearby(board, '$') || hero.isSymbolnearby(board, '*')){
				action = Action.CRAZYOGRE;
			}
		}

		switch (action) {
		case NOACTION:
			break;
		case GUARD:
			this.won = false;
			gameOn = false;
			break;
		case CRAZYOGRE:
			this.won = false;
			gameOn = false;
			break;
		case OPENDOOR:
			this.won= true;
			gameOn= false;
			break;
		case LEVER:
			applyLever();
		case MOVE:
			break;
		case KEY:
			break;

		default:
			break;
		}
	}


	public boolean isWon() {
		return won;
	}
	
	public boolean isGameOn() {
		return gameOn;
	}
	
	public void showBoard(){
		board.showBoard();
	}
	
	public void randomGuard(int level){
		int randomNum = ThreadLocalRandom.current().nextInt(0, 3 + 1);

		switch (randomNum) {
		case 0:
			this.guard = new Rookie(level);
			break;
		case 1:
			this.guard = new Drunken(level);
			break;
		case 2:
			this.guard = new Suspicious(level);
			break;
		default:
			this.guard = new Rookie(level);	
		}
		
	}
}

