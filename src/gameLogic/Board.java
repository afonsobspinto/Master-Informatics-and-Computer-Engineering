package gameLogic;

import java.io.Serializable;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * 
 * A class representing the different boards of every level.
 * 
 * @author Afonso Pinto and Tomas Oliveira
 * 
 */

public class Board implements Serializable {
	
	private char[][] board;
	private int rows;
	private int columns;
	private boolean[][] visited;
	private static Map<Integer, Character[][]> BOARDS = new HashMap<Integer, Character[][]>();
	
//	static {
//		BOARDS.put(-2, new Character[][]{
//				{new Character('X'),'X', 'X', 'X','X','X'},
//				{'X','H', ' ', ' ','O','X'},
//				{'I',' ', ' ', ' ',' ','X'},
//				{'I','k', ' ', ' ',' ','X'},
//				{'X','X', 'X', 'X','X','X'}
//			});
//	}
	
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
		this.board = new char[rows][columns];

		for(int i = 0; i < rows; i++){
			for (int j = 0; j < columns; j++){
				board[i][j] = ' ';
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

		

		
		switch (level) {
		case -2:
			
			this.board = new char[][]{
				{'X','X', 'X', 'X','X','X'},
				{'X','H', ' ', ' ','O','X'},
				{'I',' ', ' ', ' ',' ','X'},
				{'I','k', ' ', ' ',' ','X'},
				{'X','X', 'X', 'X','X','X'}
			};

			this.rows = 5;
			this.columns = 6;

			break;
		case -1:

			this.board = new char[][]{
				{'X', 'X', 'X', 'X','X'},
				{'X','H', ' ', 'O','X'},
				{'I',' ', ' ', ' ','X'},
				{'I','k', ' ', ' ','X'},
				{'X','X', 'X', 'X','X'}
			};

			this.rows = 5;
			this.columns = 5;

			break;
		case 0:

			this.board = new char[][]{
				{'X', 'X', 'X', 'X','X'},
				{'X','H', ' ', 'G','X'},
				{'I',' ', ' ', ' ','X'},
				{'I','k', ' ', ' ','X'},
				{'X','X', 'X', 'X','X'}
			};

			this.rows = 5;
			this.columns = 5;

			break;
		case 1:
			
			this.board = new char[][]{
				{'X', 'X', 'X', 'X','X','X','X','X','X','X'},
				{'X',' ', ' ', ' ','I',' ','X',' ',' ','X'},
				{'X','X', 'X', ' ','X','X','X',' ',' ','X'},
				{'X',' ', 'I', ' ','I',' ','X',' ',' ','X'},
				{'X','X', 'X', ' ','X','X','X',' ',' ','X'},
				{'I',' ', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'I',' ', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X','X', 'X', ' ','X','X','X','X',' ','X'},
				{'X',' ', 'I', ' ','I',' ','X','k',' ','X'},
				{'X', 'X', 'X', 'X','X','X','X','X','X','X'}
			};
			
			this.rows = 10;
			this.columns = 10;
			
			break;
		case 2:
			this.board = new char[][]{
				{'X', 'X', 'X', 'X','X','X','X','X','X','X'},
				{'X',' ', ' ', ' ','I',' ','X',' ',' ','X'},
				{'X','X', 'X', ' ','X','X','X',' ',' ','X'},
				{'X',' ', 'I', ' ','I',' ','X',' ',' ','X'},
				{'X','X', 'X', ' ','X','X','X',' ',' ','X'},
				{'I',' ', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'I',' ', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X','X', 'X', ' ','X','X','X','X',' ','X'},
				{'X',' ', 'I', ' ','I',' ','X','k',' ','X'},
				{'X', 'X', 'X', 'X','X','X','X','X','X','X'}
			};
			
			this.rows = 10;
			this.columns = 10;
			
			break;

			
		case 3:
			this.board = new char[][]{
				{'X', 'X', 'X','X','X','X','X','X','X'},
				{'I',' ', ' ',' ',' ',' ',' ','k','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', 'X', 'X','X','X','X','X','X','X'}
			};
		case 4:
			this.board = new char[][]{
				{'X', 'X', 'X','X','X','X','X','X','X'},
				{'I',' ', ' ',' ',' ',' ',' ','k','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', 'X', 'X','X','X','X','X','X','X'}
			};
			
			this.rows = 9;
			this.columns = 9;
			
			break;
		case 5:
			this.board = new char[][]{
				{'X', 'X', 'X','X','X','X','X','X','X'},
				{'I',' ', ' ',' ',' ',' ',' ','k','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', ' ', ' ',' ',' ',' ',' ',' ','X'},
				{'X', 'X', 'X','X','X','X','X','X','X'}
			};
			
			this.rows = 9;
			this.columns = 9;
			
			break;
			
		default:
			break;
		}
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
			board[x][y] = value;
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
			board[x][y] = value;
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
			return board[x][y];

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
				System.out.print(this.board[i][j]);
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
		
		if(!validSquare(i,j, searchForKey)){
			return false;
		}
		
		if(isAtEnd(i, j, searchForKey)){
			return true;
		}

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