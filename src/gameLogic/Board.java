package gameLogic;

import java.io.Serializable;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.lang.Character;

/**
 * 
 * A class representing the different boards of every level.
 * 
 * @author Afonso Pinto and Tomas Oliveira
 * 
 */

public class Board implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Character[][] board;
	private int rows;
	private int columns;
	private boolean[][] visited;
	private static Map<Integer, Character[][]> BOARDS = new HashMap<Integer, Character[][]>();
	
	static {
		Character x = new Character('X');
		Character empty = new Character(' ');
		Character h = new Character('H');
		Character o = new Character('O');
		Character g = new Character('G');
		Character i = new Character('I');
		Character k = new Character('k');
		
		BOARDS.put(-2, new Character[][]{
				{x,x, x, x,x,x},
				{x,h, empty, empty,o,x},
				{i,empty, empty, empty,empty,x},
				{i,k, empty, empty,empty,x},
				{x,x,x,x,x,x}
			});
		
		BOARDS.put(-1, new Character[][]{
			{x, x, x, x,x},
			{x,h, empty, o,x},
			{i,empty, empty, empty,x},
			{i,k, empty, empty,x},
			{x,x, x, x,x}
		});
		
		BOARDS.put(0, new Character[][]{
			{x, x, x, x,x},
			{x,h, empty, g,x},
			{i,empty, empty, empty,x},
			{i,k, empty, empty,x},
			{x,x, x, x,x}
		});
		
		BOARDS.put(1, new Character[][]{
			{x, x, x, x,x,x,x,x,x,x},
			{x,empty, empty, empty,i,empty,x,empty,empty,x},
			{x,x, x, empty,x,x,x,empty,empty,x},
			{x,empty, i, empty,i,empty,x,empty,empty,x},
			{x,x, x, empty,x,x,x,empty,empty,x},
			{i,empty, empty, empty,empty,empty,empty,empty,empty,x},
			{i,empty, empty, empty,empty,empty,empty,empty,empty,x},
			{x,x, x, empty,x,x,x,x,empty,x},
			{x,empty, i, empty,i,empty,x,k,empty,x},
			{x, x, x, x,x,x,x,x,x,x}
		});
		
		BOARDS.put(2, new Character[][]{
			{x, x, x, x,x,x,x,x,x,x},
			{x,empty, empty, empty,i,empty,x,empty,empty,x},
			{x,x, x, empty,x,x,x,empty,empty,x},
			{x,empty, i, empty,i,empty,x,empty,empty,x},
			{x,x, x, empty,x,x,x,empty,empty,x},
			{i,empty, empty, empty,empty,empty,empty,empty,empty,x},
			{i,empty, empty, empty,empty,empty,empty,empty,empty,x},
			{x,x, x, empty,x,x,x,x,empty,x},
			{x,empty, i, empty,i,empty,x,k,empty,x},
			{x, x, x, x,x,x,x,x,x,x}
		});
		
		BOARDS.put(3, new Character[][]{
			{x, x, x,x,x,x,x,x,x},
			{i,empty, empty,empty,empty,empty,empty,i,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, x, x,x,x,x,x,x,x}
		});
		
		BOARDS.put(4, new Character[][]{
			{x, x, x,x,x,x,x,x,x},
			{i,empty, empty,empty,empty,empty,empty,i,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, x, x,x,x,x,x,x,x}
		});
		
		BOARDS.put(5, new Character[][]{
			{x, x, x,x,x,x,x,x,x},
			{i,empty, empty,empty,empty,empty,empty,i,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, empty, empty,empty,empty,empty,empty,empty,x},
			{x, x, x,x,x,x,x,x,x}
		});
	}
	
	/**
	 * 
	 * Returns the number of rows of the board.
	 * 
	 * @return the number of rows of the board.
	 * 
	 */
	
	public int getRows() {
		return rows;
	}

	/**
	 * 
	 * Returns the number of columns of the board.
	 * 
	 * @return the number of columns of the board.
	 * 
	 */
	
	public int getColumns() {
		return columns;
	}

	/**
	 * Constructs and initializes a Board.
	 * 
	 * @param rows
	 *             the number of rows
	 * @param columns
	 *             the number of columns 
	 */
	
	public Board(int rows, int columns){
		this.board = new Character[rows][columns];

		for(int i = 0; i < rows; i++){
			for (int j = 0; j < columns; j++){
				board[i][j] = new Character(' ');
			}
		}
		
		this.rows = rows;
		this.columns = columns;
		this.visited = new boolean[rows][columns];
	}
	
	/**
	 * Constructs and initializes a Board.
	 * 
	 * @param level
	 *             the level of the board 
	 */
	
	public Board(int level) {

		
		Character[][] temp = BOARDS.get(level);

		board = new Character[temp.length][temp[0].length];
		
		for(int i = 0; i < temp.length; i++){
				System.arraycopy(temp[i], 0, board[i], 0, temp[i].length);
		}
		
		
		this.showBoard();
		
		this.rows = board.length;
		this.columns = board[0].length;
		
	}
	
	/**
	 * Sets the value of type char in the Board on coordinate pos.
	 * 
	 * @param pos 
	 *            the position of the value
	 * @param value 
	 *            the symbol of the value
	 * @see {@link Coord.java}
	 */
	
	public void setBoardAt(Coord pos, char value){
		int x = pos.getX();
		int y = pos.getY();

		if(x < this.rows && x >= 0 && y < this.columns && y >= 0 )
			board[x][y] = new Character(value);
	}

	/**
	 * Sets the value of type char in the Board on Coordinate (x,y).
	 * 
	 * @param x 
	 *          the x coordinate
	 * @param y 
	 *          the y coordinate
	 * @param value 
	 *          the symbol of the value
	 */
	
	public void setBoardAt(int x, int y, char value){		
		if(x < this.rows && x >=0 && y < this.columns && y >= 0 )
			board[x][y] = new Character(value);
	}

	/**
	 * 
	 * Returns the symbol of type char of Coordinate (x,y) on the Board.
	 * 
	 * @param x 
	 *          the x coordinate
	 * @param y 
	 *          the y coordinate
	 * 
	 * @return the symbol on the coordinate.
	 */
	
	public char getBoardAt(int x, int y){
		if(x < this.rows && x >=0 && y < this.columns && y >= 0 )
			return board[x][y].charValue();

		return '0';
	}

	/**
	 * 
	 * Shows the Board on the Console.
	 * 
	 */
	
	public void showBoard(){
		for(int i =0; i < this.rows; i++){
			for(int j = 0; j < this.columns; j++){
				System.out.print(this.board[i][j].charValue());
				System.out.print(" ");
			}
			System.out.println();
		}
	}

	@Override
	public String toString() {
		return "Board [board=" + Arrays.toString(board) + ", rows=" + rows + ", columns=" + columns + "]";
	}

	/**
	 * 
	 * Checks if the Board is valid.
	 * 
	 * @param pos
	 *          the coordinate 
	 */
	
	public boolean isValidBoard(Coord pos){
		
		int i = pos.getX();
		int j = pos.getY();
		
		boolean pathToKey = existAPath(i,j, true); 
		
		for (int x = 0; x < visited.length; x++)
			Arrays.fill(visited[x], false);
		
		boolean pathToDoor = existAPath(i, j, false);
		
		return pathToKey && pathToDoor;
	}
	
	/**
	 * 
	 * Checks if exists a path between the hero and the door.
	 * 
	 * @param i
	 *          the i coordinate 
	 * @param j
	 *          the j coordinate
	 * @param searchForKey
	 *          the boolean representing if the hero has a key
	 */
	
	private boolean existAPath(int i, int j, boolean searchForKey){
		if (visited[i][j])
			return false;
		
		visited[i][j] = true;
		
		if(!validSquare(i,j, searchForKey))
			return false;
		
		if(isAtEnd(i, j, searchForKey))
			return true;

		boolean right = existAPath(i+1, j, searchForKey);
		boolean left = existAPath(i-1, j, searchForKey);
		boolean up = existAPath(i, j-1, searchForKey);
		boolean down = existAPath(i, j+1, searchForKey);
			
		return right || left || up || down;
	}
	
	/**
	 * 
	 * Checks if the square in the path is valid.
	 * 
	 * @param i
	 *          the i coordinate 
	 * @param j
	 *          the j coordinate
	 * @param searchForKey
	 *          the boolean representing if the hero has a key
	 */
	
	private boolean validSquare(int i, int j, boolean searchForKey){
		if(i > this.rows || i < 0 || j > this.columns || j < 0 )
			return false;
		if(getBoardAt(i, j) == 'X')
			return false;
		if(getBoardAt(i, j) == 'I' && searchForKey)
			return false;
		
		return true;
	}
	
	/**
	 * 
	 * Checks if the path is ending.
	 * 
	 * @param i
	 *          the i coordinate 
	 * @param j
	 *          the j coordinate
	 * @param searchForKey
	 *          the boolean representing if the hero has a key
	 */
	
	private boolean isAtEnd(int i, int j, boolean searchForKey){
		if(searchForKey){
			if(getBoardAt(i, j) == 'k')
				return true;
			else 
				return false;
		}
		else{
			if(getBoardAt(i, j) == 'I')
				return true;
			else
				return false;
		}
	}
	
	
}