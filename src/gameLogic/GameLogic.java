
package gameLogic;

import java.util.concurrent.ThreadLocalRandom;

import console.Interaction;

import java.util.ArrayList;
import java.util.HashSet;
import java.io.Serializable;
import java.lang.Character;

/**
 * Represents the Game Logic.
 * 
 * @author Afonso Pinto and Tomás Oliveira
 *  
 */

public class GameLogic implements Serializable {

	private static final long serialVersionUID = 1L;
	private Board board;
	private Hero hero;
	private Guard guard;
	private ArrayList<CrazyOgre> crazyOgres;
	private GameConfig gameConfig;
	private boolean won;
	private boolean gameOn;
	private boolean triggeredLever;
	Level level;
	
	/**
	 * Returns the hero of the game.
	 * 
	 * @return the hero of the game. 
	 */
	
	public Hero getHero() {
		return hero;
	}

	/**
	 * Returns the guard of the game.
	 * 
	 * @return the guard of the game. 
	 */
	
	public Guard getGuard() {
		return guard;
	}

	/**
	 * Returns the list of ogres of the game.
	 * 
	 * @return the list of ogres of the game. 
	 */
	
	public ArrayList<CrazyOgre> getCrazyOgres() {
		return crazyOgres;
	}

	/**
	 * Constructs and initializes the game logic configuration.
	 * 
	 * @param gameConfig
	 *            the game configurations
	 */
	
	public GameLogic(GameConfig gameConfig){
		this.hero = new Hero();
		this.guard = new Rookie();
		this.crazyOgres = new ArrayList<CrazyOgre>();
		this.gameConfig = gameConfig;
		this.level = new Level();
		this.triggeredLever = false;
		this.won = false;
		this.gameOn = true;
		this.board = new Board(gameConfig.getRows(), gameConfig.getColumns());
	}

	/**
	 * Constructs and initializes the game logic configuration.
	 * 
	 * @param level
	 *            the level of the game
	 * @param gameConfig
	 *            the game configurations
	 */
	
	public GameLogic(Level level, GameConfig gameConfig){

		this.gameConfig = gameConfig;
		this.gameOn = true;
		this.won = false;
		this.level = level;
		this.triggeredLever = false;

		this.board = level.getBoard();
		this.hero = level.getHero();
		
		this.board.setBoardAt(hero.position, hero.symbol);
		
		int guardIndex = gameConfig.getGuardIndex();
		
		if(level.isHaveGuard()){
			
			switch (guardIndex) {
			case 0:
				this.guard = new Rookie(level.getLevel());
				break;
			case 1:
				this.guard = new Drunken(level.getLevel());
				break;
			case 2:
				this.guard = new Suspicious(level.getLevel());
				break;

			default:
				randomGuard(level.getLevel());
				break;
			}

			this.board.setBoardAt(guard.position, guard.symbol);

		}
		if(level.isHaveOgre()){
			fillCrazyOgres(level.getLevel(), gameConfig.getNumOfOgres());
			setOgresOnBoard();
			}

	}

	/**
	 * 
	 * Applies the lever on the game.
	 * 
	 */
	
	private void applyLever(){
		for(int i =0; i < gameConfig.getRows(); i++){
			for(int j = 0; j < gameConfig.getColumns(); j++){
				if(this.board.getBoardAt(i, j)=='I'){
					this.board.setBoardAt(i,j, 'S');
				}
			}
}
	}
	
	/**
	 * 
	 * Updates the game when the hero moves.
	 * 
	 */

	public void updateGame(Direction move){

		Action action = hero.move(this.board, move);
		
		if(guard != null && level.isHaveGuard())
			guard.move(board);
		if(crazyOgres != null && level.isHaveOgre())
			moveOgres();
		

		if(action != Action.OPENDOOR){
			if(hero.isSymbolNearby(board, 'G')){
				action = Action.GUARD;
			}
			if(!hero.isArmed){
				if(hero.isSymbolNearby(board, 'O') || hero.isSymbolNearby(board, '$') || hero.isSymbolNearby(board, '*')){
					action = Action.CRAZYOGRE;
				}
			}
			else{
				if(hero.isSymbolNearby(board, '*')){
					action = Action.CRAZYOGRE;
				}
				else if(hero.isOgreNearby(board, crazyOgres)){
					action = Action.STUNNED;
				}
			}
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
			triggeredLever = true;
			break;
		case MOVE:
			break;
		case KEY:
			break;
		case STUNNED:
			break;

		default:
			break;
		}
	}

	/**
	 * Returns true if the user won the game.
	 * 
	 * @return true if the user won the game.
	 */
	
	public boolean isWon() {
		return won;
	}
	
	/**
	 * Returns true if the game is not over.
	 * 
	 * @return true if the game is not over.
	 */
	
	public boolean isGameOn() {
		return gameOn;
	}
	
	/**
	 * 
	 * Shows the board of the game on the console.
	 * 
	 */
	
	public void showBoard(){
		board.showBoard();
	}
	
	/**
	 * 
	 * Function to allow the user to choose the type of guard.
	 * 
	 */
	
	private void chooseGuard(int level){
		
		System.out.println("Choose Guard: ");
		System.out.println("0 - Rookie");
		System.out.println("1 - Drunken");
		System.out.println("2 - Suspicious");
		
		
		
		Interaction readGuard = new Interaction();
		char keyPressed = readGuard.getKeyPressed();
		
		switch (keyPressed) {
		case '0':
			this.guard = new Rookie(level);
			System.out.println("Rookie Selected");
			break;
		case '1':
			this.guard = new Drunken(level);
			System.out.println("Drunken Selected");
			break;
		case '2':
			this.guard = new Suspicious(level);
			System.out.println("Suspicious Selected");
			break;
		default:
			this.guard = new Rookie(level);
			System.out.println("Invalid Input. Rookie Selected");
		}
	}
	
	/**
	 * 
	 * Function that creates a random Guard.
	 * 
	 */
	
	private void randomGuard(int level){
		int randomNum = ThreadLocalRandom.current().nextInt(0, 3 + 1);

		switch (randomNum) {
		case 0:
			this.guard = new Rookie(level);
			break;
		case 1:
			this.guard = new Drunken(level);
			break;
		case 2:
			this.guard = new Suspicious(level);
			break;
		default:
			this.guard = new Rookie(level);	
		}
		
	}
	
	/**
	 * 
	 * Function to fill the ogres on the game.
	 * 
	 */
	
	private void fillCrazyOgres(int level, int ogresNum){
		CrazyOgre crazyOgre;
		
		this.crazyOgres = new ArrayList<CrazyOgre>();
		switch (level) {
		case -2:
			crazyOgre = new CrazyOgre(new Coord(1,4), true, this.board);
			this.crazyOgres.add(crazyOgre);
			break;
		case -1:
			crazyOgre = new CrazyOgre(new Coord(1,3), false, this.board);
			crazyOgre.setStunned(true);
			this.crazyOgres.add(crazyOgre);
			break;
		case 3:
			crazyOgre = new CrazyOgre(new Coord(1,4), false, this.board);
			this.crazyOgres.add(crazyOgre);
			break;
		case 4:
			crazyOgre = new CrazyOgre(new Coord(1,4), true, this.board);
			this.crazyOgres.add(crazyOgre);
			break;
		case 5:
			randomOgres(ogresNum);
			break;

		default:
			break;
		}
	}
	
	/**
	 * 
	 * Returns the board of the game.
	 * 
	 * @return the board of the game.
	 */
	
	public Board getBoard() {
		return board;
	}

	/**
	 * Sets the ogres on the board.
	 * 
	 */
	
	private void setOgresOnBoard(){
		
		for (int i = 0; i < crazyOgres.size(); i++){
			this.board.setBoardAt(crazyOgres.get(i).position, crazyOgres.get(i).symbol);
			if(crazyOgres.get(i).isArmed){
				this.board.setBoardAt(crazyOgres.get(i).weaponLocation, crazyOgres.get(i).weapon);
			}
				
		}
	}
	
	/**
	 * Moves the ogres on the board.
	 * 
	 */
	
	private void moveOgres(){
		for (int i = 0; i<crazyOgres.size(); i++){
			crazyOgres.get(i).move(board, crazyOgres);
		}
	}
	
	/**
	 * 
	 * Function to allow the user to choose number of ogres.
	 * 
	 */
	
	private void chooseOgresNum(){
		System.out.println("Choose Number of Ogres (1-3): ");
		
		
		
		Interaction readNumber = new Interaction();
		int ogresNum = Character.getNumericValue(readNumber.getKeyPressed());
		
		if(ogresNum < 1 || ogresNum > 3){
			System.out.println("Invalid Input. Random number of ogres selected");
			randomOgres(0);
		}
		else{
			System.out.println(ogresNum + " ogres selected");
			randomOgres(ogresNum);
		}
		

	}
	
	/**
	 * 
	 * Function to create a random number of ogres.
	 * 
	 */
	
	private void randomOgres(int ogresNum){
		
		
		if(ogresNum == 0)
			ogresNum = ThreadLocalRandom.current().nextInt(1, 3 + 1);
		
		Coord pos = new Coord(-1,-1);
		HashSet<Coord> temp = new HashSet<Coord>();
		
		for(int i = 0; i < ogresNum; i++){

			pos = randomPos();
			
			if(!validPos(pos) || temp.contains(pos))
				i--;
			else{
				temp.add(pos);
				this.crazyOgres.add(new CrazyOgre(pos, true, this.board));
			}
		}
		
	}
	
	/**
	 * 
	 * Returns true if the position is valid.
	 * 
	 * @param position
	 *             the position of the coordinate
	 *             
	 * @return true if the position is valid.
	 */
	
	private boolean validPos(Coord position){
		if(isSymbolNearby(position, this.hero.symbol))
			return false;
		if(this.board.getBoardAt(position.getX(), position.getY()) == ' ')
			return true; 
		return false;
	}

	/**
	 * 
	 * Creates a random position.
	 * 
	 */
	
	private Coord randomPos(){
		int x, y;
		
		x = ThreadLocalRandom.current().nextInt(0, this.board.getRows() + 1);
		y = ThreadLocalRandom.current().nextInt(0, this.board.getColumns() + 1);
		
		return new Coord(x,y);
		
	}
	
	/**
	 * 
	 * Returns true if the symbol is nearby the coordinate position.
	 * 
	 * @param position 
	 *          the position of the coordinate
	 * @param symbol
	 *          the symbol of type char
	 *          
	 * @return true if the symbol is nearby the coordinate.
	 */
	
	public boolean isSymbolNearby(Coord position, char symbol){

		int xPos = position.getX();
		int yPos = position.getY();

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

	/**
	 * Returns the level of the game.
	 * 
	 * @return the level of the game.
	 */

	public Level getLevel() {
		return level;
	}

	/**
	 * Returns true if the lever is triggered.
	 * 
	 * @return true if the lever is triggered.
	 */
	
	public boolean isTriggeredLever() {
		return triggeredLever;
	}

	/**
	 * Sets the game on or off.
	 * 
	 * @param gameOn
	 *          the boolean that represents if the game is on or off
	 */
	
	public void setGameOn(boolean gameOn) {
		this.gameOn = gameOn;
	}

	/**
	 * 
	 * Returns the game configuration.
	 * 
	 * @return the game configuration.
	 */
	
	public GameConfig getGameConfig() {
		return gameConfig;
	}

	/**
	 * Sets the guard.
	 * 
	 * @param guard
	 *           the guard of the game
	 */
	
	public void setGuard(Guard guard) {
		this.guard = guard;
	}

	
	
	
}