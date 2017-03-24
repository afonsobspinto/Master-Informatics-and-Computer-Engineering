package gameLogic;

import java.io.Serializable;
import java.util.Arrays;

public class Board implements Serializable {
	
	private char[][] board;
	private int rows;
	private int columns;
	
	public int getRows() {
		return rows;
	}

	public int getColumns() {
		return columns;
	}

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
	
	public void setBoardAt(Coord pos, char value){
		int x = pos.getX();
		int y = pos.getY();

		if(x < this.rows && x >= 0 && y < this.columns && y >= 0 )
			board[x][y] = value;
	}

	public void setBoardAt(int x, int y, char value){		
		if(x < this.rows && x >=0 && y < this.columns && y >= 0 )
			board[x][y] = value;
	}

	public char getBoardAt(int x, int y){
		if(x < this.rows && x >=0 && y < this.columns && y >= 0 )
			return board[x][y];

		return '0';
	}

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

	
	
}