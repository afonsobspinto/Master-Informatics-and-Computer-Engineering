package gameLogic;

public class Guard extends Character{
	
	public Guard(int level){
		this.symbol = 'G';
		this.under_char = ' ';
		Coord startingPos;
		
		switch (level) {
		case 1:
			startingPos = new Coord(1,8);
			this.position = startingPos;
			break;

		default:
			break;
		}
		
	}
	
	public Guard(Coord position){
		this.symbol = 'G';
		this.position = position;
		this.under_char = ' ';
	}
	
	public Action move(Board board, Direction direction){
		return Action.NOACTION;
	}

}
