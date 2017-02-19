package gameLogic;


public enum Direction{
	DOWN(1), UP(-1), RIGHT(1), LEFT(-1), INVALID(0);

	private final int value;

	private Direction(int value){
		this.value = value;
	}

	public int getValue(){
		return value;
	}
}

