package gameLogic;

public abstract class Character {
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
	
	public char getUnder_char() {
		return under_char;
	}

	public void setUnder_char(char under_char) {
		this.under_char = under_char;
	}

	public char getSymbol() {
		return symbol;
	}

	public Coord getOldPosition() {
		return oldPosition;
	}

	public void setSymbol(char symbol) {
		this.symbol = symbol;
	}

	public Coord getPosition() {
		return position;
	}

	public void setPosition(Coord position) {
		this.oldPosition = this.position;
		this.position = position;
	}
	
	

}
