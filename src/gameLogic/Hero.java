package gameLogic;

import java.util.ArrayList;

/**
 * Represents the Hero.
 * 
 * @author Afonso Pinto and Tomás Oliveira
 * @see Character
 * 
 */

public class Hero extends Character{
	
    private static final long serialVersionUID = 1L;
	boolean isKey;
	boolean isLever;
	boolean gotKey;
	boolean isArmed;
	boolean triggeredLever;
	Direction orientation;

	/**
	 * Constructs and initializes a Hero.
	 * 
	 */
	
	public Hero(){
		this.symbol = 'H';
		this.under_char = ' ';
		this.gotKey = false;
		this.isArmed = false;
		this.orientation = Direction.RIGHT;
		this.position = new Coord(-2,-2);
	}
	
	/**
	 * Constructs and initializes a Hero with level of type int.
	 * 
	 * @param level
	 *           the level of the hero
	 */
	
	public Hero(int level){
		this.symbol = 'H';
		this.under_char = ' ';
		this.gotKey = false;
		this.isArmed = false;
		this.orientation = Direction.RIGHT;
		
		Coord startingPos;
		
		switch (level) {
		case -2:
			startingPos = new Coord(1,1);
			this.position = startingPos;
			this.isKey = true;
			this.isLever = false;
			break;
		case -1:
			startingPos = new Coord(1,1);
			this.position = startingPos;
			this.isKey = true;
			this.isLever = false;
			break;
		case 0:
			startingPos = new Coord(1,1);
			this.position = startingPos;
			this.isKey = false;
			this.isLever = true;
			break;
		case 1:
			startingPos = new Coord(1,1);
			this.position = startingPos;
			this.isKey = false;
			this.isLever = true;
			
			break;

		case 2:
			startingPos = new Coord(1,1);
			this.position = startingPos;
			this.isKey = false;
			this.isLever = true;
			break;
			
		case 3:
			startingPos = new Coord(7,1);
			this.position = startingPos;
			this.isKey = true;
			this.isLever = false;
			break;
			
		case 4:
			startingPos = new Coord(7,1);
			this.position = startingPos;
			this.isKey = true;
			this.isLever = false;
			break;
			
		case 5:
			this.symbol = 'A';
			startingPos = new Coord(7,1);
			this.position = startingPos;
			this.isKey = true;
			this.isLever = false;
			this.isArmed = true;
			break;

			
		default:
			break;
		}
		
	}
	
	/**
	 * Returns true if the hero has the key.
	 * 
	 * @return true if the hero has the key.
	 */
	
	public boolean isGotKey() {
		return gotKey;
	}

	/**
	 * Returns true if the hero is armed.
	 * 
	 * @return true if the hero is armed.
	 */
	
	public boolean isArmed() {
		return isArmed;
	}

	/**
	 * Constructs and initializes a Hero with position of type Coord.
	 * 
	 * @see {@link Coord.java}
	 */
	
	public Hero(Coord position){
		this.symbol = 'H';
		this.position = position;
		this.under_char = ' ';
	}
	
	/**
	 * 
	 * Returns true if the symbol is nearby of the hero on the board.
	 * 
	 * @param board 
	 *          the board of the game
	 * @param symbol
	 *          the symbol of type char
	 *          
	 * @return true if the symbol is nearby the hero and false if not.
	 */
	
	public boolean isSymbolNearby(Board board, char symbol){

		int xPos = this.position.getX();
		int yPos = this.position.getY();

		if(board.getBoardAt(xPos+1, yPos)==symbol)
			return true;

		if(board.getBoardAt(xPos-1, yPos)==symbol)
			return true;

		if(board.getBoardAt(xPos, yPos+1)==symbol)
			return true;

		if(board.getBoardAt(xPos, yPos-1)==symbol)
			return true;

		if(board.getBoardAt(xPos, yPos) == symbol)
			return true;
		return false;
	}
	
	/**
	 * 
	 * Returns true if there is a ogre nearby the hero on the board.
	 * 
	 * @param board 
	 *          the board of the game
	 * @param ogres
	 *          the list of ogres
	 *          
	 * @return true if there is a ogre nearby the hero and false if not.
	 */
	
	public boolean isOgreNearby(Board board, ArrayList<CrazyOgre> ogres ){
		int HeroxPos = this.position.getX();
		int HeroyPos = this.position.getY();
		
		boolean res = false;
		
		for(int i = 0; i < ogres.size(); i++){
			int ogreXpos = ogres.get(i).getPosition().getX();
			int ogreYpos = ogres.get(i).getPosition().getY();
			
			
			if(((ogreXpos == HeroxPos+1) && (ogreYpos == HeroyPos)) ||
					((ogreXpos == HeroxPos-1) && (ogreYpos == HeroyPos)) ||
					((ogreXpos == HeroxPos) && (ogreYpos == HeroyPos+1)) ||
					((ogreXpos == HeroxPos) && (ogreYpos == HeroyPos-1))){
				ogres.get(i).setStunnedRounds(2);
				res = true;
			}
			
			System.out.println("\n");
		}
		
		return res;
	}

	/**
	 * Moves the Hero in a certain direction.
	 * 
	 * @param board
	 *            the board of the game
	 * @param direction
	 *            the direction in which the hero should move
	 */
	
	public Action move(Board board, Direction direction){
		
		int x = this.position.getX();
		int y = this.position.getY();
		
		this.orientation = direction;
		
		Action res = Action.NOACTION;
		int move = direction.getValue();
		char nextPos;
		boolean vertical = false;

		if(direction == Direction.DOWN || direction == Direction.UP){
			vertical = true;
			nextPos = board.getBoardAt(x+move, y);
		}
		else
			nextPos = board.getBoardAt(x, y+move);


		if(nextPos == 'X'){
			res = Action.NOACTION;
		}
		
		else if(nextPos == 'I'){
			if(this.gotKey){
				board.setBoardAt(x,y+move, 'S');
				res = Action.KEY;
			}
			else
				res = Action.NOACTION;

		}
		else if(nextPos == 'S'){ //Open Door
			res =  Action.OPENDOOR;
		}
		else if(nextPos == 'G'){ //Guard
			res = Action.GUARD;
		}

		else if((!isArmed && (nextPos == 'O' || nextPos == '$' || nextPos == '*')) || (isArmed && nextPos == '*')){
			res = Action.CRAZYOGRE;
		}

		else if(isArmed && (nextPos == 'O' || nextPos == '$' )){
			res = Action.STUNNED;
		}

		else{
			board.setBoardAt(x,y, this.under_char);
			if(nextPos == 'k' && this.isLever){
				res = Action.LEVER;
				this.under_char = 'k';
			}
			else if (nextPos == 'k' && this.isKey){
				res = Action.KEY;
				this.under_char = ' ';
				this.gotKey = true;
				this.symbol = 'K';
			}
			else if (nextPos == ' '){
				res = Action.NOACTION;
				this.under_char = ' ';
			}

			Coord pos;
			if(vertical)
				pos = new Coord(x+move, y);
			else
				pos = new Coord(x, y+move);

			board.setBoardAt(pos, this.symbol);
			this.position = pos;
		}

		return res;
	}

	/**
	 * 
	 * Returns the orientation of the hero.
	 * 
	 * @return the orientation of the hero.
	 * 
	 */
	
	public Direction getOrientation() {
		return orientation;
	}

	/**
	 * 
	 * Sets the key to the hero.
	 * 
	 * @param isKey
	 *            the boolean representing if the hero has a key.
	 * 
	 */
	
	public void setKey(boolean isKey) {
		this.isKey = isKey;
	}

	/**
	 * 
	 * Sets the lever to the hero.
	 * 
	 * @param isLever
	 *            the boolean representing if the hero triggered the lever.
	 * 
	 */
	
	public void setLever(boolean isLever) {
		this.isLever = isLever;
	}

	
	
}