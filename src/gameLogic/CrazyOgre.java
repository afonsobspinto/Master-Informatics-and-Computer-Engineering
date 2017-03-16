package gameLogic;

import java.util.ArrayList;
import java.util.concurrent.ThreadLocalRandom;

public class CrazyOgre extends Character {
	
	private static int counter = 0;
	
	boolean isStunned;
	boolean isArmed;
	char weapon;
	char under_weapon;
	Coord weaponLocation;
	int objectId;
	int stunnedRounds;
	
	
	
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

		if(armed)
			setValidWeaponLocation(board, true);
	}
	
	public Action move(Board board, Direction direction){
		return Action.NOACTION;

	}
	
	public Action move(Board board, ArrayList <CrazyOgre> ogres){

		if (!isStunned){

			cleanOldPos(ogres, board, false);

			int x = this.position.getX();
			int y = this.position.getY();

			boolean valid = false;

			while (!valid){


				Direction direction = randomDirection();

				int move = direction.getValue();

				if(direction == Direction.DOWN || direction == Direction.UP){

					char nextPosChar = board.getBoardAt(x+move, y);
					Coord nextPos = new Coord(x+move, y);


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

						}
					}
				}

				else if(direction == Direction.RIGHT || direction == Direction.LEFT){


					char nextPosChar = board.getBoardAt(x, y+move);
					Coord nextPos = new Coord(x, y+move);


					if(nextPosChar == 'X' || nextPosChar == 'I' || nextPosChar == '*' ){

						valid = false;
					}


					else{

						valid = true;


						if(nextPosChar == 'k' || nextPosChar == '$' ){	
							this.symbol = '$';
							this.under_char = 'k';
						}

						else if(nextPosChar == 'O' || nextPosChar == ' '){
							valid = true;
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
						}
					}
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

	public void setValidWeaponLocation(Board board, boolean first){



		int x = this.position.getX();
		int y = this.position.getY();

		boolean valid = false;


		while(!valid){
			Direction direction = randomDirection();

			int move = direction.getValue();
			if(direction == Direction.DOWN || direction == Direction.UP){


				char nextPosChar = board.getBoardAt(x+move, y);
				Coord nextPos = new Coord(x+move, y);

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

					board.setBoardAt(this.weaponLocation, this.weapon);
					
				}
				
			}
			
			else if(direction == Direction.RIGHT || direction == Direction.LEFT){				
				char nextPosChar = board.getBoardAt(x, y+move);
				Coord nextPos = new Coord(x, y+move);
				
				if(first && (isSymbolNearby(board, nextPos, 'A') || isSymbolNearby(board, nextPos, 'H')))
					valid = false;
				
				else if(nextPosChar == 'X' || nextPosChar == 'I' || nextPosChar == 'O' || nextPosChar == 'G') {
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

					board.setBoardAt(this.weaponLocation, this.weapon);
					
				}
				
			}
		}
		
	}
	
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

	public void setStunned(boolean isStunned) {
		this.isStunned = isStunned;
	}

	public void setStunnedRounds(int stunnedRounds) {
		this.stunnedRounds = stunnedRounds;
		if(stunnedRounds!= 0){
			this.isStunned = true;
			this.symbol = '8';
		}
	}
	
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
	
	private boolean isOnlyMyWeapon(ArrayList<CrazyOgre> ogres){
		for (int i = 0; i < ogres.size(); i++){
			if(this.weaponLocation.equals(ogres.get(i).weaponLocation))
				return false;
		}
		
		return true;
	}
	
	
}