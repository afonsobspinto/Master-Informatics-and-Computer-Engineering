
public class Board {
	char [][] board = {
			{'X', 'X', 'X', 'X','X','X','X','X','X','X'},
			{'X','H', ' ', ' ','I',' ','X',' ','G','X'},
			{'X','X', 'X', ' ','X','X','X',' ',' ','X'},
			{'X',' ', 'I', ' ','I',' ','X',' ',' ','X'},
			{'X','X', 'X', ' ','X','X','X',' ',' ','X'},
			{'I',' ', ' ', ' ',' ',' ',' ',' ',' ','X'},
			{'I',' ', ' ', ' ',' ',' ',' ',' ',' ','X'},
			{'X','X', 'X', ' ','X','X','X','X',' ','X'},
			{'X',' ', 'I', ' ','I',' ','X','k',' ','X'},
			{'X', 'X', 'X', 'X','X','X','X','X','X','X'}	
	};
	
	public void showBoard(){
		for(int i =0; i < 10; i++){
			for(int j = 0; j < 10; j++){
				System.out.print(board[i][j]);
				System.out.print(" ");
			}
			System.out.println();
		}
	}

}
