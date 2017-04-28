package gameLogic;

/**
 * 
 * A class representing the hero's actions.
 * 
 * @author Afonso Pinto and Tomas Oliveira
 * 
 */

public enum Action {
	NOACTION(0), OPENDOOR(1), LEVER(2), MOVE(3), KEY(4), GUARD(-1), CRAZYOGRE(-2), STUNNED(5);


	private Action(int value){
	}

}