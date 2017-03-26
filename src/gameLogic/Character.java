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
	
	private static final long serialVersionUID = 1L;
	
	protected char symbol;
	protected Coord position;
	protected Coord oldPosition;
	protected char under_char;
	
	/**
	 * Constructs and initializes a Character.
	 * 
	 */
	
	public Character(){
		
	};
	
	/**
	 * Constructs and initializes a Character with symbol and coordinate position.
	 * 
	 * @param symbol
	 *            the symbol of the character
	 * @param position
	 *            the position of the character on the board
	 * 
	 * @see {@link Coord}
	 */
	
	public Character(char symbol, Coord position) {
		this.symbol = symbol;
		this.position = position;
		this.under_char = ' ';
	}

	
	public abstract Action move(Board board, Direction direction);
	
	/**
	 * 
	 * Returns the symbol under the character on the Board.
	 * 
	 * @return the symbol under the Character on the Board.
	 * 
	 */
	
	public char getUnder_char() {
		return under_char;
	}

	/**
	 * 
	 * Sets the symbol under the character on the Board.
	 * 
	 * @param under_char
	 *            the symbol under the Character on the Board.
	 * 
	 */
	
	public void setUnder_char(char under_char) {
		this.under_char = under_char;
	}

	/**
	 * 
	 * Returns the symbol of the Character.
	 * 
	 * @return the symbol of the Character.
	 * 
	 */
	
	public char getSymbol() {
		return symbol;
	}

	/**
	 * 
	 * Returns the older position of the Character on the Board.
	 * 
	 * @return the older position of the Character on the Board.
	 * 
	 */
	
	public Coord getOldPosition() {
		return oldPosition;
	}

	/**
	 * 
	 * Sets the symbol of the Character.
	 * 
	 * @param symbol
	 *           the symbol of the character
	 */
	
	public void setSymbol(char symbol) {
		this.symbol = symbol;
	}

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

	/**
	 * 
	 * Sets the position of the Character on the Board.
	 * 
	 * @param position
	 *           the position of the Character on the Board
	 */
	
	public void setPosition(Coord position) {
		this.oldPosition = this.position;
		this.position = position;
	}
	
	

}