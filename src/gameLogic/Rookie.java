package gameLogic;

public class Rookie extends Guard {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Rookie(){
		super();
	}
	
	public Rookie(Coord position){
		super(position);
	}
	
	public Rookie(int level){
		super(level);
		
	}
	
	public Action move(Board board){	
		
		if(++index == route.length)
			index = 0;
		
		board.setBoardAt(this.position, ' ');
		this.position = route[index];
		this.orientation = route_dir[index];
		board.setBoardAt(this.position, this.symbol);
		
		return Action.GUARD;
	}
	
	
}