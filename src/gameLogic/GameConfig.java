package gameLogic;

import java.awt.event.KeyEvent;
import java.io.Serializable;

/**
 * The game settings.
 * 
 */

public class GameConfig implements Serializable {
	private int columns;
	private int rows;
	private int downKey;
	private int leftKey;
	private int rightKey;
	private int upKey;
	private int guardIndex;
	private int numOfOgres;
	
	/**
	 * Constructs and initializes the default game settings and default keyboard configuration;
	 * 
	 */
	
	public GameConfig(){
		columns = 10;
		rows = 10;
		downKey = KeyEvent.VK_DOWN;
		leftKey = KeyEvent.VK_LEFT;
		rightKey = KeyEvent.VK_RIGHT;
		upKey = KeyEvent.VK_UP;
		guardIndex = 0;
		numOfOgres = 0;
	}

	/**
	 * Constructs and initializes the game settings and default keyboard configuration
	 * 
	 * @param rows
	 *            the number of rows 
	 *            
	 * @param columns
	 *            the number of columns 
	 */
	
	public GameConfig( int rows ,int columns) {
		this.columns = columns;
		this.rows = rows;
		downKey = KeyEvent.VK_DOWN;
		leftKey = KeyEvent.VK_LEFT;
		rightKey = KeyEvent.VK_RIGHT;
		upKey = KeyEvent.VK_UP;
		guardIndex = 0;
		numOfOgres = 0;
	}

	
	/**
	 * Constructs and initializes the game settings and default keyboard configuration
	 * 
	 * @param rows
	 *            the number of rows           
	 * @param columns
	 *            the number of columns 
     * @param downKey
	 *            the keyboard key for down movement            
	 * @param leftKey
	 *            the keyboard key for left movement 
	 * @param rightKey
	 *            the keyboard key for right movement            
	 * @param upKey
	 *            the keyboard key for up movement 
	 */
	
	
	public GameConfig(int rows, int columns, char downKey, char leftKey, char rightKey, char upKey) {
		this.columns = columns;
		this.rows = rows;
		this.downKey = downKey;
		this.leftKey = leftKey;
		this.rightKey = rightKey;
		this.upKey = upKey;
		guardIndex = 0;
		numOfOgres = 0;
	}

	/**
	 * Returns the number of columns 
	 * 
	 * @return the number of columns 
	 */
	
	public int getcolumns() {
		return columns;
	}

	/**
	 * Returns the number of rows 
	 * 
	 * @return the number of rows 
	 */
	
	public int getrows() {
		return rows;
	}
	
	public int getDownKey() {
		return downKey;
	}

	public int getLeftKey() {
		return leftKey;
	}

	public int getRightKey() {
		return rightKey;
	}

	public int getUpKey() {
		return upKey;
	}

	public int getGuardIndex() {
		return guardIndex;
	}

	public void setGuardIndex(int guardIndex) {
		this.guardIndex = guardIndex;
	}

	public int getNumOfOgres() {
		return numOfOgres;
	}

	public void setNumOfOgres(int numOfOgres) {
		this.numOfOgres = numOfOgres;
	}

	

}