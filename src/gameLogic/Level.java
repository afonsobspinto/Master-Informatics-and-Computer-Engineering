package gameLogic;

import java.io.Serializable;

/**
 * 
 * A class representing the levels.
 * 
 * @author Afonso Pinto and Tomas Oliveira
 * 
 */

public class Level implements Serializable {

	private int level;
	
	private boolean haveGuard;
	private boolean haveLever;
	private boolean haveOgre;

	Board board;
	Hero hero;
	
	/**
	 * Constructs and initializes a level.
	 * 
	 * @param level
	 *            the number of the level
	 */
	
	public Level(int level){
		switch (level) {
		case -2:
			level_config(-2, false, false, true);
			break;
		case -1:
			level_config(-1, false, false, true);
			break;
		case 0:
			level_config(0, true, false, false);
			break;
		case 1:
			level_config(1, true, true, false);
			break;
		case 2:
			level_config(2, true, true, false);
			break;
		case 3:
			level_config(3, false, false, true);
			break;
		case 4:
			level_config(4, false, false, true);
			break;
		case 5:
			level_config(5, false, false, true);
			break;
			
		default:
			break;
		}
	}
	
	/**
	 * Configures the characters on each level.
	 * 
	 * @param level
	 *            the number of the level
	 * @param haveGuard
	 *            the boolean representing if the level has a guard
	 * @param haveLever
	 *            the boolean representing if the level has a lever
	 * @param haveOgre
	 *            the boolean representing if the level has ogres
	 */
	
	private void level_config(int level, boolean haveGuard, boolean haveLever, boolean haveOgre) {
		this.haveGuard = haveGuard;
		this.haveLever = haveLever;
		this.haveOgre = haveOgre;
		this.level = level;
		this.board = new Board(level);
		this.hero = new Hero(level);
	}

	/**
	 * Returns the number of the level.
	 * 
	 * @return the number of the level.
	 */
	
	public int getLevel() {
		return level;
	}

	/**
	 * Returns true if the level has a guard.
	 * 
	 * @return true if the level has a guard.
	 */
	
	public boolean isHaveGuard() {
		return haveGuard;
	}

	/**
	 * Returns true if the level has a lever.
	 * 
	 * @return true if the level has a lever.
	 */
	
	public boolean isHaveLever() {
		return haveLever;
	}

	/**
	 * Returns true if the level has ogres.
	 * 
	 * @return true if the level has ogres.
	 */

	public boolean isHaveOgre() {
		return haveOgre;
	}

	/**
	 * Returns the board of the level.
	 * 
	 * @return the board of the level.
	 */

	public Board getBoard() {
		return board;
	}

	/**
	 * Returns the hero of the level.
	 * 
	 * @return the hero of the level.
	 */
	
	public Hero getHero() {
		return hero;
	}

	
}
