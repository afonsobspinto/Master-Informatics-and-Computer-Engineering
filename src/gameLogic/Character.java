package gameLogic;

import java.io.Serializable;

/**
 * 
 * A class representing the Character.
 * 
 * @author Afonso Pinto and Tomas Oliveira
 * 
 */

public abstract class Character implements Serializable {
	protected char symbol;
	protected Coord position;
	protected Coord oldPosition;
	protected char under_char;
	
	public Character(){
		
	};
	
	public abstract Action move(Board board, Direction direction);
	

	/**
	 * 
	 * Returns the position of the Character on the Board.
	 * 
	 * @return the position of the Character on the Board.
	 * 
	 */
	
	public Coord getPosition() {
		return position;
	}	

}