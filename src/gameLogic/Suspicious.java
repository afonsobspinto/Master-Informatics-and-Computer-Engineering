package gameLogic;

/**
 * Represents the Suspicious Guard.
 * 
<<<<<<< HEAD
 * @author Afonso Pinto and Tomï¿½s Oliveira
=======
 * @author Afonso Pinto and Tomás Oliveira
>>>>>>> branch 'master' of https://github.com/FooWalksIntoABar/LPOO1617_T6G7.git
 * @see Guard
 * 
 */

public class Suspicious extends Guard {
	
	private static final long serialVersionUID = 1L;

	/**
	 * Constructs and initializes a Suspicious Guard.
	 * 
	 */
	
	public Suspicious(){
		super();
	}
	
	/**
	 * Constructs and initializes a Suspicious Guard with position of type Coord.
	 * 
	 * @see {@link Coord.java}
	 */
	
	public Suspicious(Coord position){
		super(position);
	}
	
	/**
	 * Constructs and initializes a Suspicious Guard with level of type int.
	 * 
	 */
	
	public Suspicious(int level){
		super(level);
	}
	
	/**
	 * Moves the Suspicious Guard in a certain direction.
	 * 
	 * @param board
	 *            the board of the game
	 */
	
	public Action move(Board board){
			

		if(this.isMovingForward){
			if(++index == route.length)
				index = 0;
		}
		else{
			if(--index == -1)
				index = route.length-1;
		}
		
		board.setBoardAt(this.position, ' ');
		this.position = route[index];
		this.orientation = route_dir[index];
		board.setBoardAt(this.position, this.symbol);
		
		this.isMovingForward = randomDecision();
		
		return Action.GUARD;
	}

	
}