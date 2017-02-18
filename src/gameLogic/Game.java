package gameLogic;

public class Game {
	
	private Board board;
	private Hero hero;
	private Guard guard;
	private CrazyOgre crazyOgre;
	private GameConfig gameConfig;

	public Game(int level){
		
		
		
		this.board = new Board(level);
		this.hero = new Hero(level);
		this.guard = new Guard(level);
		this.crazyOgre= new CrazyOgre(level);
		
		this.board.setBoardAt(hero.position, hero.symbol);
		this.board.setBoardAt(guard.position, guard.symbol);
		this.board.setBoardAt(crazyOgre.position, crazyOgre.symbol);
		
		this.board.showBoard();
		

	}

}
