package gameLogic;

/**
 * Represents the Drunken Guard.
 * 
 * @author Afonso Pinto and Tomás Oliveira
 * @see Guard
 * 
 */

public class Drunken extends Guard {
	
	
	private boolean wakeUp;
	
	/**
	 * Constructs and initializes a Drunken Guard.
	 * 
	 */
	
	public Drunken(){
		super();
		this.isSleeping = false;
		this.wakeUp = false;
	}
	
	/**
	 * Constructs and initializes a Drunken Guard with position of type Coord.
	 * 
	 * @see {@link Coord}
	 */
	
	public Drunken(Coord position){
		super(position);
		this.isSleeping = false;
		this.wakeUp = false;
	}
	
	/**
	 * Constructs and initializes a Drunken Guard with level of type int.
	 * 
	 */
	
	public Drunken(int level){
		super(level);
		this.isSleeping = false;
		this.wakeUp = false;
	}
	
	/**
	 * Moves the Drunken Guard in a certain direction.
	 * 
	 * @param board
	 *            the board of the game
	 */
	
	public Action move(Board board){
		
		if(this.isSleeping){
			this.symbol = 'g';
			this.isSleeping = randomDecision();
			
			if(!this.isSleeping)
				this.wakeUp = true;
			
			board.setBoardAt(this.position, this.symbol);
		}
		
		else if(wakeUp){
			this.symbol = 'G';
			this.wakeUp = false;
			this.isMovingForward = randomDecision();
			board.setBoardAt(this.position, this.symbol);
		}
		else{
			
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
			
			this.isSleeping = randomDecision();
			
		}
		return Action.GUARD;
	}

}