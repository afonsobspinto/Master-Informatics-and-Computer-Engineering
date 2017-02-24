package gameLogic;

import java.util.Arrays;

public  class Guard  extends Character{
	private Coord[] route;
	private int index;
	private GuardBehaviour behaviour;
	
	public Guard(){};
	
	public Guard(int level){
		this.symbol = 'G';
		this.under_char = ' ';
		this.index = 1;
		Coord startingPos;
		
		switch (level) {
		case 1:
			startingPos = new Coord(1,8);
			this.position = startingPos;
			this.route = new Coord[1];
			this.route[0]=startingPos;
			this.index = 0;
			
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
			
		case 3:
			this.symbol = 'X'; // Guards doesn't appear on 1st level
			startingPos = new Coord(0,0); 
			this.position = startingPos;
			this.route = new Coord[1];
			this.route[0]=startingPos;
			this.index = 0;
		case 4:
			this.symbol = 'X'; // Guards doesn't appear on 1st level
			startingPos = new Coord(0,0); 
			this.position = startingPos;
			this.route = new Coord[1];
			this.route[0]=startingPos;
			this.index = 0;
		
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
	
	public Action move(Board board){
		board.setBoardAt(this.position, ' ');
		this.position = route[index];
		board.setBoardAt(this.position, this.symbol);
	
		
		if(++index == route.length)
			index = 0;
		
		return Action.GUARD;
	}

}
