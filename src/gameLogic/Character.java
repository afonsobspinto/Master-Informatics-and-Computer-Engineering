package gameLogic;

import java.io.Serializable;

public abstract class Character implements Serializable {
	protected char symbol;
	protected Coord position;
	protected Coord oldPosition;
	protected char under_char;
	
	public Character(){
		
	};
	
	public Character(char symbol, Coord position) {
		this.symbol = symbol;
		this.position = position;
		this.under_char = ' ';
	}

	
	public abstract Action move(Board board, Direction direction);
	
	private char getUnder_char() {
		return under_char;
	}

	private void setUnder_char(char under_char) {
		this.under_char = under_char;
	}

	private char getSymbol() {
		return symbol;
	}

	private Coord getOldPosition() {
		return oldPosition;
	}

	private void setSymbol(char symbol) {
		this.symbol = symbol;
	}

	public Coord getPosition() {
		return position;
	}

	private void setPosition(Coord position) {
		this.oldPosition = this.position;
		this.position = position;
	}
	
	

}