package gameLogic;

import java.util.ArrayList;
import java.util.concurrent.ThreadLocalRandom;

import jdk.nashorn.internal.runtime.CodeStore.DirectoryCodeStore;

/**
 * Represents the Crazy Ogre.
 * 
 * @author Afonso Pinto and Tomás Oliveira
 * @see Character
 * 
 */

public class CrazyOgre extends Character {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static int counter = 0;
	
	boolean isStunned;
	boolean isArmed;
	char weapon;
	char under_weapon;
	Coord weaponLocation;
	int objectId;
	int stunnedRounds;
	Direction orientation;
	Direction weaponOrientation;
	
	/**
	 * Returns the coordinate of the weapon.
	 * 
	 * @return the coordinate of the weapon.
	 */
	
	public Coord getWeaponLocation() {
		return weaponLocation;
	}

	/**
	 * Returns true if the ogre is armed.
	 * 
	 * @return true if the ogre is armed.
	 */
	
	public boolean isArmed() {
		return isArmed;
	}

	/**
	 * Returns true if the ogre is stunned.
	 * 
	 * @return true if the ogre is stunned.
	 */
	
	public boolean isStunned() {
		return isStunned;
	}

	/**
	 * Constructs and initializes a Crazy Ogre with Coordinate position and if he's armed on the board.
	 * 
	 * @param position
	 *            the coordinate of the Crazy Ogre
	 * @param armed
	 *            the boolean representing if the Crazy Ogre is armed
	 * @param board
	 *            the board where the Crazy Ogre is
	 * @see {@link Coord.java}, {@link Board.java}
	 */
	
	public CrazyOgre(Coord position, boolean armed, Board board){
		this.symbol = 'O';
		this.position = position;
		this.under_char = ' ';
		this.isArmed = armed;
		this.weapon = '*';
		this.isStunned = false;
		this.stunnedRounds = 0;
		this.objectId = counter++;
		
		board.setBoardAt(this.position, this.symbol);

		if(armed){
			setValidWeaponLocation(board, true);
			setOgreOrientation();
		}
		else
			this.orientation = Direction.RIGHT;
	}
	
	/**
	 * Moves the CrazyOgre in a certain direction.
	 * 
	 * @param board
	 *            the board of the game
	 * @param direction
	 *            the direction in which the ogre should move
	 */
	
	public Action move(Board board, Direction direction){
		return Action.NOACTION;

	}
	
	/**
	 * Moves the CrazyOgres of the List in a certain direction.
	 * 
	 * @param board
	 *            the board of the game
	 * @param ogres
	 *            the ogres on the ArrayList
	 */
	
	public Action move(Board board, ArrayList <CrazyOgre> ogres){

		if (!isStunned){

			cleanOldPos(ogres, board, false);

			int x = this.position.getX();
			int y = this.position.getY();

			boolean valid = false;

			while (!valid){


				Direction direction = randomDirection();

				int move = direction.getValue();

				char nextPosChar;
				Coord nextPos;

				if(direction == Direction.DOWN || direction == Direction.UP){
					nextPosChar = board.getBoardAt(x+move, y);
					nextPos = new Coord(x+move, y);
				}
				else{
					nextPosChar = board.getBoardAt(x, y+move);
					nextPos = new Coord(x, y+move);
				}


				if(nextPosChar == 'X' || nextPosChar == 'I' || (nextPosChar == '*' && !isOnlyMyWeapon(ogres))){
					valid = false;
				}

				else{
					valid = true;
					if(nextPosChar == 'k' || nextPosChar == '$'){
						this.symbol = '$';
						this.under_char = 'k';
					}
					else if(nextPosChar == 'O'  || nextPosChar == ' '){
						this.symbol = 'O';
						this.under_char = ' ';
					}
					this.position = nextPos;
					board.setBoardAt(this.position, this.symbol);
					if(isArmed){
						if(!weaponLocation.equals(position)){
							cleanOldPos(ogres, board, true);
						}
						setValidWeaponLocation(board, false);
						setOgreOrientation();
					}
					else
						this.orientation = direction;
				}
			}
		}

		else{

			board.setBoardAt(this.position, this.symbol);

			if(--stunnedRounds == 0){
				isStunned = false;
				this.symbol = 'O';

			}

			if(isArmed){
				cleanOldPos(ogres, board, true);
				setValidWeaponLocation(board,false);
			}

		}

		return Action.MOVE;
	}

	/**
	 * Sets the a valid location for the weapon of the Ogre.
	 * 
	 * @param board
	 *            the board of the game
	 * @param first
	 *            the boolean representing if the CrazyOgre is the first on the ArrayList
	 */
	
	public void setValidWeaponLocation(Board board, boolean first){



		int x = this.position.getX();
		int y = this.position.getY();

		boolean valid = false;


		while(!valid){
			Direction direction = randomDirection();

			int move = direction.getValue();
			char nextPosChar;
			Coord nextPos;

			if(direction == Direction.DOWN || direction == Direction.UP){
				nextPosChar = board.getBoardAt(x+move, y);
				nextPos = new Coord(x+move, y);
			}
			else{
				nextPosChar = board.getBoardAt(x, y+move);
				nextPos = new Coord(x, y+move);
			}

			if(first && (isSymbolNearby(board, nextPos, 'A') || isSymbolNearby(board, nextPos, 'H')))
				valid = false;

			else if(nextPosChar == 'X' || nextPosChar == 'I' || nextPosChar == 'O' || nextPosChar == 'G'){
				valid = false;
			}

			else{
				valid = true;

				if(nextPosChar == 'k' || nextPosChar == '$'){
					this.weapon = '$';
					this.under_weapon = 'k';
				}

				else if(nextPosChar == ' '){
					this.weapon = '*';
					this.under_weapon = ' ';
				}

				else if(nextPosChar == '*'){
					this.weapon = '*';
					this.under_weapon = ' ';
				}

				this.weaponLocation = nextPos;
				this.weaponOrientation = direction;

				board.setBoardAt(this.weaponLocation, this.weapon);

			}
		}
	}
	
	/**
	 * 
	 * Moves the Ogre in a Random Direction.
	 * 
	 */
	
	public Direction randomDirection(){

		int randomNum = ThreadLocalRandom.current().nextInt(0, 3 + 1);
		
		switch (randomNum) {
		case 0:
			return Direction.UP;
		case 1:
			return Direction.DOWN;
		case 2:
			return Direction.RIGHT;
		case 3:
			return Direction.LEFT;
		default:
			return Direction.INVALID;
		}
	}

	/**
	 * Cleans the old position of the Ogre on the Board.
	 * 
	 * @param ogres
	 *            the ogres on the list
	 * @param board
	 *            the board of the game
	 * @param weapon
	 *            the boolean representing if it is a weapon
	 */
	
	private void cleanOldPos(ArrayList<CrazyOgre> ogres, Board board, boolean weapon){

		if(weapon){
			
			for(int i = 0 ; i < ogres.size(); i++){
				
				if(ogres.get(i).equals(this)){

					board.setBoardAt(this.weaponLocation, this.under_weapon);

					return;
				}

				if(ogres.get(i).position.equals(this.weaponLocation) || ogres.get(i).weaponLocation.equals(this.weaponLocation)){
					return;
				}
			}

		}

		else{
			for(int i = 0 ; i < ogres.size(); i++){
				if(ogres.get(i).equals(this)){

					board.setBoardAt(this.position, this.under_char);

					return;
				}

				if(ogres.get(i).position.equals(this.position) || ogres.get(i).weaponLocation.equals(this.position))
					return;
			}

		}

	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + objectId;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CrazyOgre other = (CrazyOgre) obj;
		if (objectId != other.objectId)
			return false;
		return true;
	}

	/**
	 * Makes the ogre stunned.
	 * 
	 * @param isStunned 
	 *            the boolean representing if the ogre is stunned
	 */
	
	public void setStunned(boolean isStunned) {
		this.isStunned = isStunned;
	}

	/**
	 * Makes the ogre stunned during a certain number of rounds.
	 * 
	 * @param stunnedRounds 
	 *            the number of rounds
	 */
	
	public void setStunnedRounds(int stunnedRounds) {
		this.stunnedRounds = stunnedRounds;
		if(stunnedRounds!= 0){
			this.isStunned = true;
			this.symbol = '8';
		}
	}
	
	/**
	 * 
	 * Returns true if the symbol is nearby of the ogre on the board.
	 * 
	 * @param board 
	 *          the board of the game
	 * @param position 
	 *          the position of the symbol
	 * @param symbol
	 *          the symbol of type char
	 *          
	 * @return true if the symbol is nearby the ogre and false if not.
	 */
	
	private boolean isSymbolNearby(Board board, Coord position,  char symbol){

		int xPos = position.getX();
		int yPos = position.getY();

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
	 * To know if an ogre's weapon is overlaped with another ogre's weapon
	 *
	 * @param ogres
	 *          the ogres on the list
	 *          
	 * @return false if it's overlaped and true if not.
	 */
	
	private boolean isOnlyMyWeapon(ArrayList<CrazyOgre> ogres){
		for (int i = 0; i < ogres.size(); i++){
			if(this.weaponLocation.equals(ogres.get(i).weaponLocation))
				return false;
		}
		
		return true;
	}

	/**
	 * 
	 * Returns the orientation of the ogre.
	 * 
	 * @return the orientation of the ogre.
	 * 
	 */
	
	public Direction getOrientation() {
		return orientation;
	}

	/**
	 * 
	 * Returns the direction of the ogre.
	 * 
	 * @return the direction of the ogre.
	 * 
	 */
	
	public Direction getWeaponOrientation() {
		return weaponOrientation;
	}

	/**
	 * Sets the orientation of the ogre.
	 * 
	 */
	
	private void setOgreOrientation() {
		switch(weaponOrientation){
		case UP:
			this.orientation = Direction.LEFT;
			break;
		case DOWN:
			this.orientation = Direction.RIGHT;
			break;
		case LEFT:
			this.orientation = Direction.DOWN;
			break;
		case RIGHT:
			this.orientation = Direction.UP;
			break;
		default:
			this.orientation = Direction.RIGHT;
			break;
		}
	}
	
	
}