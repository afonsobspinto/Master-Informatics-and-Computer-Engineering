import java.util.Scanner;

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
	
	public int interaction(){
		Scanner keyboard = new Scanner(System.in);
		char key = keyboard.next().charAt(0);
		
		switch (key){
		case 'w':
			return 0;
		case 'a':
			return 1;
		case 'd':
			return 2;
		case 's':
			return 3;
		default:
			return -1;
		}
	}
}
