package gameLogic;

public class Hero extends Character{

	
	public Hero(int level){
		this.symbol = 'H';
		
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
	}
	
	public void move(Board board, int direction){
		
	}
	
}
