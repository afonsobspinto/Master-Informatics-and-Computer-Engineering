
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

	}
	
	public enum Key{
		DOWN(0), UP(1), RIGHT(2), LEFT(3), INVALID(4);
		
		private final int value;
		
		private Key(int value){
			this.value = value;
		}
		
		public int getValue(){
			return value;
		}
	}
	
	public int interection(){
		final char downKey = this.gameConfig.getDownKey();
		final char upKey = this.gameConfig.getUpKey();
		final char rigthKey = this.gameConfig.getRightKey();
		final char leftKey = this.gameConfig.getLeftKey();
		
		Scanner keyboard = new Scanner(System.in);
		char key = keyboard.next().charAt(0);
		
		if (key == downKey) {
			keyboard.close();
			return Key.DOWN.getValue();
		} else if (key == upKey) {
			keyboard.close();
			return Key.UP.getValue();
		} else if (key == rigthKey) {
			keyboard.close();
			return Key.RIGHT.getValue();
		} else if (key == leftKey) {
			keyboard.close();
			return Key.LEFT.getValue();
		} else {
			keyboard.close();
			return Key.INVALID.getValue();
		}
		
		
	}
}

