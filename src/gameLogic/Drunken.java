package gameLogic;


public class Drunken extends Guard {
	
	private boolean isSleeping;
	private boolean wakeUp;
	
	public Drunken(){
		super();
		this.isSleeping = false;
		this.wakeUp = false;
	}
	
	public Drunken(Coord position){
		super(position);
		this.isSleeping = false;
		this.wakeUp = false;
	}
	
	public Drunken(int level){
		super(level);
		this.isSleeping = false;
		this.wakeUp = false;
	}
	
	public Action move(Board board){
		
		if(this.isSleeping){
			this.symbol = 'g';
			this.isSleeping = randomDecision();
			
			if(!this.isSleeping)
				this.wakeUp = true;
			
			board.setBoardAt(this.position, this.symbol);
		}
		
		else if(wakeUp){
			this.symbol = 'G';
			this.wakeUp = false;
			this.isMovingForward = randomDecision();
			board.setBoardAt(this.position, this.symbol);
		}
		else{
			
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
			board.setBoardAt(this.position, this.symbol);
			
			this.isSleeping = randomDecision();
			
		}
		return Action.GUARD;
	}

	
}