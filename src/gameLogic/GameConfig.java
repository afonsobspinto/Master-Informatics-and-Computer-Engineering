package gameLogic;

/**
 * The game settings.
 * 
 */

public class GameConfig {
	private int columns;
	private int rows;
	private char downKey;
	private char leftKey;
	private char rightKey;
	private char upKey;
	private int guardIndex;
	private int numOfOgres;
	
	
	/**
	 * Constructs and initializes the default game settings and default keyboard configuration;
	 * 
	 */
	
	public GameConfig(){
		columns = 10;
		rows = 10;
		downKey = 's';
		leftKey = 'a';
		rightKey = 'd';
		upKey = 'w';
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
		downKey = 's';
		leftKey = 'a';
		rightKey = 'd';
		upKey = 'w';
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
	
	public char getDownKey() {
		return downKey;
	}

	public char getLeftKey() {
		return leftKey;
	}

	public char getRightKey() {
		return rightKey;
	}

	public char getUpKey() {
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

	@Override
	public String toString() {
		return "GameConfig [columns=" + columns + ", rows=" + rows + ", downKey=" + downKey + ", leftKey=" + leftKey
				+ ", rightKey=" + rightKey + ", upKey=" + upKey + ", guardIndex=" + guardIndex + ", numOfOgres="
				+ numOfOgres + "]";
	}
	
	
	
	

}