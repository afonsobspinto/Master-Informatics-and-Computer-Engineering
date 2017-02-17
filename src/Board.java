import java.util.Scanner;


public class Board {
	
	public class Hero{
		public int xPos = 1;
		public int yPos = 1;
		public int old_xPos = 1;
		public int old_yPos = 1;
		public char old_char = ' ';
	}
	
	Hero hero = new Hero();


	
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

	public void applyLever(){
		for(int i =0; i < 10; i++){
			for(int j = 0; j < 10; j++){
				if(board[i][j]=='I'){
					board[i][j] = 'S';
				}
			}
		}
	}
	
	public void updateBoard(){
		board[hero.old_xPos][hero.old_yPos] = hero.old_char;
		board[hero.xPos][hero.yPos] = 'H';
		showBoard();
	}
	
	public int play(){
		int valid = -1;
		int move = interaction(); //Read Move
		
		
		
		switch(move){
			
		case 3:
			if(hero.xPos+1 > 9){ // Out of Board
				valid = -1; // Move not Valid
				break;
			}
		
			if(board[hero.xPos+1][hero.yPos] == 'X'){ //Wall 
				hero.old_char = 'X';
				valid = 0;
				break; 
			}
			if(board[hero.xPos+1][hero.yPos] == 'I'){
				hero.old_char = 'I';
				valid = 0;
				break; 
			}
			if(board[hero.xPos+1][hero.yPos] == 'k'){ //Lever
				hero.old_xPos = hero.xPos;
				hero.xPos += 1;
				hero.old_char='k';
				applyLever();
				valid = 0;
				break;
			}
			if(board[hero.xPos+2][hero.yPos]=='G'){ // Guard
				valid = 1;  // Game Over
				break;
				
			}
			if(board[hero.xPos+1][hero.yPos]==' '){ //Empty Cell
				hero.old_xPos = hero.xPos;
				hero.xPos += 1;
				hero.old_char = ' ';
				valid = 0;
				break;
			}		
		}
		
		updateBoard();
		return valid;
	}
}
