package gameLogic;


public class Suspicious extends Guard {
	public Suspicious(){
		super();
	}
	
	public Suspicious(Coord position){
		super(position);
	}
	
	public Suspicious(int level){
		super(level);
	}
	
	public Action move(Board board){
			

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
		
		this.isMovingForward = randomDecision();
		
		return Action.GUARD;
	}

	
}