package gameLogic;

public class Hero extends Character{
	boolean isKey;
	boolean isLever;
	boolean gotKey;

	public Hero(int level){
		this.symbol = 'H';
		this.under_char = ' ';
		this.gotKey = false;
		
		Coord startingPos;
		
		switch (level) {
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
			
			
		default:
			break;
		}
		
	}
	
	public Hero(Coord position){
		this.symbol = 'H';
		this.position = position;
		this.under_char = ' ';
	}
	
	public boolean isSymbolnearby(Board board, char symbol){

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

	public Action move(Board board, Direction direction){
		
		int x = this.position.getX();
		int y = this.position.getY();
		
		Action res = Action.NOACTION;
		int move = direction.getValue();

		if(direction == Direction.DOWN || direction == Direction.UP){
			
			char nextPos = board.getBoardAt(x+move, y);


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
			else if(nextPos == 'O' || nextPos == '$' || nextPos == '*'){
				res = Action.CRAZYOGRE;
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
				
				Coord pos = new Coord(x+move, y);
				
				board.setBoardAt(pos, this.symbol);
				this.position = pos;
			}

		}
		else if(direction == Direction.RIGHT || direction == Direction.LEFT){
			char nextPos = board.getBoardAt(x, y+move);
			
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
			
			else if(nextPos == 'O' || nextPos == '$' || nextPos == '*'){
				res = Action.CRAZYOGRE;
			}
			else{ 
				
				board.setBoardAt(x,y, this.under_char);
				
				if(nextPos == 'k' && this.isLever){//Lever
					res = Action.LEVER;
					this.under_char = 'k';
				}
				else if (nextPos == 'k' && this.isKey){
					res = Action.KEY;
					this.under_char = ' ';
					this.gotKey = true;
					this.symbol = 'K';
				}
				else if (nextPos ==' '){ //Empty
					res = Action.MOVE;
					this.under_char = ' ';
				}
				
				Coord pos = new Coord(x, y+move);

				board.setBoardAt(pos, this.symbol);
				this.position = pos;
			}
		}
		

		return res;
	}
	
}
