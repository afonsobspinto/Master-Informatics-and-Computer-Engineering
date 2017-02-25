
package gameLogic;

import java.util.ArrayList;
import java.util.Scanner;
import console.Interaction;

public class GameLogic {

	private Board board;
	private Hero hero;
	private Guard guard;
	private ArrayList<CrazyOgre> crazyOgres;
	private GameConfig gameConfig;
	boolean won;
	boolean gameOn;

	public GameLogic(int level, GameConfig gameConfig){

		this.gameConfig = gameConfig;
		this.gameOn = true;
		this.won = false;

		this.board = new Board(level);
		this.hero = new Hero(level);
		this.guard = new Guard(level);
		this.crazyOgres = fillCrazyOgres(level);

		this.board.setBoardAt(hero.position, hero.symbol);
		this.board.setBoardAt(guard.position, guard.symbol);
		for(int i=0; i< crazyOgres.size(); i++){
			this.board.setBoardAt(crazyOgres.get(i).getPosition(), crazyOgres.get(i).getSymbol());
			if(crazyOgres.get(i).isArmed())
				this.board.setBoardAt(crazyOgres.get(i).getWeaponLocation(), crazyOgres.get(i).getWeapon());
		}
		
		this.board.showBoard();
		

	}
	
	
	public void applyLever(){
		for(int i =0; i < gameConfig.getrows(); i++){
			for(int j = 0; j < gameConfig.getcolumns(); j++){
				if(this.board.getBoardAt(i, j)=='I'){
					this.board.setBoardAt(i,j, 'S');
				}
			}
}
	}
	

	public void updateGame(int level, Direction move){

		guard.move(board);
		for(int i=0; i<crazyOgres.size();i++){
			crazyOgres.get(i).move(board);
		}
		Action action = hero.move(this.board, move);

		if(hero.isSymbolnearby(board, 'G')){
			action = Action.GUARD;
		}
		if(hero.isSymbolnearby(board, 'O') || hero.isSymbolnearby(board, '$') || hero.isSymbolnearby(board, '*')){
			action = Action.CRAZYOGRE;
		}


		switch (action) {
		case NOACTION:
			break;
		case GUARD:
			this.won = false;
			gameOn = false;
			break;
		case CRAZYOGRE:
			this.won = false;
			gameOn = false;
			break;
		case OPENDOOR:
			this.won= true;
			gameOn= false;
			break;
		case LEVER:
			applyLever();
		case MOVE:
			break;
		case KEY:
			break;

		default:
			break;
		}
	}


	public boolean isWon() {
		return won;
	}
	
	public boolean isGameOn() {
		return gameOn;
	}
	
	public void showBoard(){
		board.showBoard();
	}
	
	public ArrayList<CrazyOgre> fillCrazyOgres(int level){
		ArrayList<CrazyOgre> temp = new ArrayList();
		
		CrazyOgre ogre;
		Coord pos;
		switch (level) {
		case 1:

			break;
		case 2:
	
			break;
		case 3:
			pos = new Coord (1,4);
			ogre = new CrazyOgre(pos);
			temp.add(ogre);
			break;
		case 4:
			pos = new Coord(1,4);
			ogre = new CrazyOgre(pos);
			temp.add(ogre);
			break;
		case 5:
			int ogreNumber = 3;
			pos = new Coord (0,0); // local variable pos may not have been initialized
			for (int i=0; i<ogreNumber; i++){
				if(i==0)
					pos = new Coord (2,5);
				else if(i==1)
					pos = new Coord (7,7);
				else if(i==2)
					pos = new Coord (1,2);
				ogre = new CrazyOgre(pos); // Weapon Location
				temp.add(ogre); 
			}
			break;
	

		default:
			break;
		}
		return temp;
	}
}



