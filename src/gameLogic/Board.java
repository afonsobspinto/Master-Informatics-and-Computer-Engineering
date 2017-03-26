package gameLogic;

import java.io.Serializable;
import java.nio.file.Paths;
import java.util.Arrays;

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
	private Boolean[][] paths;
	
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
		this.paths = new Boolean[rows][columns];
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

	
	public boolean isValidBoard(Coord pos){
		
		int i = pos.getX();
		int j = pos.getY();
		
		boolean pathToKey = existAPath(i,j, true); 
		boolean pathToDoor = existAPath(i, j, false);
		
		return pathToKey && pathToDoor;
	}
	
	
	private boolean existAPath(int i, int j, boolean searchForKey){
		if(!validSquare(i,j, searchForKey)){
			paths[i][j] = false;
			return false;
		}
		if(isAtEnd(i, j, searchForKey)){
			paths[i][j] = true;
			return true;
		}
		
		if(paths[i][j]==null){
			Boolean right = existAPath(i+1, j, searchForKey);
			Boolean left = existAPath(i-1, j, searchForKey);
			Boolean up = existAPath(i, j-1, searchForKey);
			Boolean down = existAPath(i, j+1, searchForKey);
			
			paths[i][j]= right|| left || up || down;
		}
		return paths[i][j];
		
	}
	
	private boolean validSquare(int i, int j, boolean searchForKey){
		if(i > this.rows || i < 0 || j > this.columns || j < 0 )
			return false;
		if(getBoardAt(i, j) == 'X')
			return false;
		if(getBoardAt(i, j) == 'I' && searchForKey)
			return false;
		
		return true;
	}
	
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