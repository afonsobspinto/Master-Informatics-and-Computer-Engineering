package console;

import java.util.Scanner;

import gameLogic.Direction;
import gameLogic.GameConfig;

public class Interaction {
	
	public Direction direction;
	
	public  Interaction(GameConfig gameConfig){
		final char downKey = gameConfig.getDownKey();
		final char upKey = gameConfig.getUpKey();
		final char rigthKey = gameConfig.getRightKey();
		final char leftKey = gameConfig.getLeftKey();
		
		Scanner keyboard = new Scanner(System.in);
		char key = keyboard.next().charAt(0);
		
		if (key == downKey) {
			this.direction = Direction.DOWN;
			
		} else if (key == upKey) {
			this.direction = Direction.UP;
			
		} else if (key == rigthKey) {
			this.direction = Direction.RIGHT;
			
		} else if (key == leftKey) {
			this.direction = Direction.LEFT;
			
		} else {
			this.direction = Direction.INVALID;
		}
	}

	public Direction getDirection() {
		return direction;
	}

}