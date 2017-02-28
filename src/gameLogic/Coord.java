package gameLogic;

/**
 * A coordinate represents a (x,y) location
 * 
 */

public class Coord {

	
	private int x;

	private int y;

	/**
	 * Constructs and initializes a coordinate at (x,y)
	 * 
	 * @param x
	 *            the x coordinate 
	 * @param y
	 *            the y coordinate 
	 */
	
	public Coord(int x, int y) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Returns the x coordinate
	 * 
	 * @return the x coordinate
	 */
	
	public int getX() {
		return x;
	}

	/**
	 * Sets the x coordinate
	 * 
	 * @param x
	 *            the new x coordinate
	 */
	
	public void setX(int x) {
		this.x = x;
	}

	/**
	 * Returns the y coordinate
	 * 
	 * @return the y coordinate 
	 */
	
	public int getY() {
		return y;
	}

	/**
	 * Sets the y coordinate 
	 * 
	 * @param y
	 *            the new Y coordinate
	 */
	
	public void setY(int y) {
		this.y = y;
	}
	

	
	
}