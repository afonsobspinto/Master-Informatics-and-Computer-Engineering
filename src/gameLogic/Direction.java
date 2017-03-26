package gameLogic;

/**
 * 
 * A class representing the direction.
 * 
 * @author Afonso Pinto and Tomas Oliveira
 * 
 */

public enum Direction{
	DOWN(1), UP(-1), RIGHT(1), LEFT(-1), INVALID(0);

	private final int value;

	private Direction(int value){
		this.value = value;
	}

	/**
	 * 
	 * Returns the value of the direction.
	 * 
	 * @return the value of the direction.
	 * 
	 */
	
	public int getValue(){
		return value;
	}
}
