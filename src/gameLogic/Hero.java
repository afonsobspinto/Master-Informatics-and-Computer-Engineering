package gameLogic;

public class Hero extends Character{
	

	
	public Hero(int level){
		this.symbol = 'H';
		this.under_char = ' ';
		
		Coord startingPos;
		
		switch (level) {
		case 1:
			startingPos = new Coord(1,1);
			this.position = startingPos;
			break;

		default:
			break;
		}
		
	}
	
	public Hero(Coord position){
		this.symbol = 'H';
		this.position = position;
		this.under_char = ' ';
	}
	
	public boolean isGuardnearby(Board board){

		int xPos = this.position.getX();
		int yPos = this.position.getY();

		if(board.getBoardAt(xPos+1, yPos)=='G')
			return true;

		if(board.getBoardAt(xPos-1, yPos)=='G')
			return true;

		if(board.getBoardAt(xPos, yPos+1)=='G')
			return true;

		if(board.getBoardAt(xPos, yPos-1)=='G')
			return true;

		return false;
	}

	public Action move(Board board, Direction direction){
		
		int x = this.position.getX();
		int y = this.position.getY();
		
		Action res = Action.NOACTION;
		int move = direction.getValue();

		if(direction == Direction.DOWN || direction == Direction.UP){
			
			char nextPos = board.getBoardAt(x+move, y);


			if(nextPos == 'X' || nextPos == 'I'){ //Wall or Door
				res = Action.NOACTION;
			}
			else if(nextPos == 'S'){ //Open Door
				res =  Action.OPENDOOR;
			}
			else{
				board.setBoardAt(x,y, this.under_char);
				if(nextPos == 'k'){
					res = Action.LEVER;
					this.under_char = 'k';
				}
				else if (nextPos == ' '){
					res = Action.NOACTION;
					this.under_char = ' ';
				}
				
				Coord pos = new Coord(x+move, y);
				
				board.setBoardAt(pos, this.symbol);
			}

		}
		else if(direction == Direction.RIGHT || direction == Direction.LEFT){
			char nextPos = board.getBoardAt(x, y+move);
			
			if(nextPos == 'X' || nextPos == 'I'){ //Wall or Door
				res = Action.NOACTION;
			}
			else if(nextPos == 'S'){ //Open Door
				res =  Action.OPENDOOR;
			}
			else{ 
				
				board.setBoardAt(x,y, this.under_char);
				
				if(nextPos == 'k'){//Lever
					res = Action.LEVER;
					this.under_char = 'k';
				}
				else if (nextPos ==' '){ //Empty
					res = Action.MOVE;
					this.under_char = ' ';
				}
				
				Coord pos = new Coord(x, y+move);

				board.setBoardAt(pos, this.symbol);
			}
		}
		
		if(isGuardnearby(board)){
			res = Action.GUARD;
		}
		
		return res;
	}
	
}
