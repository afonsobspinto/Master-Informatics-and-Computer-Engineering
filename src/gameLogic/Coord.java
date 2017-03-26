package gameLogic;

import java.io.Serializable;

/**
 * A coordinate represents a (x,y) location
 * 
 */

public class Coord implements Serializable {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

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


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + x;
		result = prime * result + y;
		return result;
	}



	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Coord other = (Coord) obj;
		if (x != other.x)
			return false;
		if (y != other.y)
			return false;
		return true;
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


	@Override
	public String toString() {
		return "[x=" + x + ", y=" + y + "]";
	}

	
	
}