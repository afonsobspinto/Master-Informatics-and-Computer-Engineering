package gameLogic;

import java.awt.event.KeyEvent;
import java.io.Serializable;

/**
 * The game settings.
 * 
 * @author Afonso Pinto and Tomás Oliveira
 *  
 */

public class GameConfig implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private int columns;
	private int rows;
	private int downKey;
	private int leftKey;
	private int rightKey;
	private int upKey;
	private int guardIndex;
	private int numOfOgres;
	
	/**
	 * Constructs and initializes the default game settings and default keyboard configuration.
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
	 * Constructs and initializes the game settings and default keyboard configuration.
	 * 
	 * @param rows
	 *            the number of rows 
	 *            
	 * @param columns
	 *            the number of columns 
	 */
	
	public GameConfig(int rows ,int columns) {
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
	 * Constructs and initializes the game settings and default keyboard configuration.
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
	 * Returns the code of the Down Key. 
	 * 
	 * @return the code of the Down Key. 
	 */
	
	public int getDownKey() {
		return downKey;
	}

	/**
	 * Returns the code of the Left Key. 
	 * 
	 * @return the code of the Left Key. 
	 */
	
	public int getLeftKey() {
		return leftKey;
	}

	/**
	 * Returns the code of the Right Key. 
	 * 
	 * @return the code of the Right Key. 
	 */
	
	public int getRightKey() {
		return rightKey;
	}

	/**
	 * Returns the code of the Up Key. 
	 * 
	 * @return the code of the Up Key. 
	 */
	
	public int getUpKey() {
		return upKey;
	}

	/**
	 * Returns the index of the guard. 
	 * 
	 * @return the index of the guard. 
	 */
	
	public int getGuardIndex() {
		return guardIndex;
	}

	/**
	 * Sets the index of the guard.
	 * 
	 * @param guardIndex
	 *            the index of the guard
	 */
	
	public void setGuardIndex(int guardIndex) {
		this.guardIndex = guardIndex;
	}

	/**
	 * Returns the number of ogres. 
	 * 
	 * @return the number of ogres. 
	 */
	
	public int getNumOfOgres() {
		return numOfOgres;
	}

	/**
	 * Sets the number of ogres.
	 * 
	 * @param numOfOgres
	 *            the number of ogres
	 */
	
	public void setNumOfOgres(int numOfOgres) {
		this.numOfOgres = numOfOgres;
	}

	/**
	 * Returns the number of columns.
	 * 
	 * @return the number of columns. 
	 */
	
	public int getColumns() {
		return columns;
	}

	/**
	 * Sets the number of columns.
	 * 
	 * @param columns
	 *            the number of columns
	 */
	
	public void setColumns(int columns) {
		this.columns = columns;
	}

	/**
	 * Returns the number of rows. 
	 * 
	 * @return the number of rows. 
	 */
	
	public int getRows() {
		return rows;
	}

	/**
	 * Sets the number of rows.
	 * 
	 * @param rows
	 *            the number of rows
	 */
	
	public void setRows(int rows) {
		this.rows = rows;
	}

	

}