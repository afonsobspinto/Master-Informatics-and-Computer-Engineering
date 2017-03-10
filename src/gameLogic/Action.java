package gameLogic;

public enum Action {
	NOACTION(0), OPENDOOR(1), LEVER(2), MOVE(3), KEY(4), GUARD(-1), CRAZYOGRE(-2), STUNNED(5);

	private final int value;

	private Action(int value){
		this.value = value;
	}

	public int getValue(){
		return value;
	}

}