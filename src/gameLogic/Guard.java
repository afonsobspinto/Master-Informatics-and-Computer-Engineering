package gameLogic;

import java.util.Arrays;
import java.util.concurrent.ThreadLocalRandom;

public abstract class Guard  extends Character{
	protected Coord[] route;
	protected int index;
	protected boolean isMovingForward;
	
	public Guard(){
		this.symbol = 'G';
		this.under_char = ' ';
		this.index = 0;
		this.isMovingForward = true;
	};

	public Guard(Coord position){
		this.symbol = 'G';
		this.under_char = ' ';
		this.index = 0;
		this.position = position;
		this.isMovingForward = true;
	}
	
	public Guard(int level){
		this.symbol = 'G';
		this.under_char = ' ';
		this.index = 0;
		this.isMovingForward = true;
		Coord startingPos;
		
		switch (level) {
		case 0:
			startingPos = new Coord(1,3);
			this.position = startingPos;
			this.route = new Coord[1];
			this.route[0]=startingPos;
			
			break;
		case 1:
			startingPos = new Coord(1,8);
			this.position = startingPos;
			this.route = new Coord[1];
			this.route[0]=startingPos;
			
			break;
		case 2:
			startingPos = new Coord(1,8);
			this.position = startingPos;
			
			Coord[] temp = { 
					new Coord(1,8), new Coord(1,7),new Coord(2,7), new Coord(3,7), new Coord(4,7), 
					new Coord(5,7), new Coord(5,6),  new Coord(5,5), new Coord(5,4), new Coord(5,3), 
					new Coord(5,2), new Coord(5,1), new Coord(6,1), new Coord(6,2), new Coord(6,3),
					new Coord(6,4), new Coord(6,5), new Coord(6,6), new Coord(6,7), new Coord(6,8),
					new Coord(5,8), new Coord(4,8),new Coord(3,8), new Coord(2,8)
					};
			
			this.route = Arrays.copyOf(temp, temp.length);
			
			break;
			
		default:
			break;
		}
		
	}
	
	public Action move(Board board, Direction direction){
		return Action.NOACTION;
	}
	
	public abstract Action move(Board board);
	
	protected boolean randomDecision(){

		int randomNum = ThreadLocalRandom.current().nextInt(0, 2 + 1);
		
		switch (randomNum) {
		case 0:
			return true;
		case 1:
			return true;
		case 2:
			return false;
		default:
			return false;
		}
	}
}