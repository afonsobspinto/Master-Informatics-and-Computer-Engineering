import java.util.Scanner;

public class Board {
	
	public class Hero{
		public int xPos = 1;
		public int yPos = 1;
		public int old_xPos = 1;
		public int old_yPos = 1;
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
		
	}
	
	public int play(){
		int move = interaction(); //Read Move
		
		
		switch(move){
			
		case 3:
			if(hero.yPos+1 > 9) // Out of Board
				return -1; // Move not Valid
			if(board[hero.xPos][hero.yPos+1] == 'X' ||
					board[hero.xPos][hero.yPos+1] == 'I'	) //Wall or Door
				return 0; // Valido
			if(board[hero.xPos][hero.yPos+1] == 'k'){ //Lever
				hero.old_yPos = hero.yPos;
				hero.yPos += 1;
				applyLever();
				updateBoard();
				return 0;
			}
			if(board[hero.xPos][hero.yPos+2]=='G'){ // Guard
				return 1; // Game Over
				
			}
			if(board[hero.xPos][hero.yPos+2]==' '){ //Empty Cell
				hero.old_yPos = hero.yPos;
				hero.yPos += 1;
				updateBoard();
				return 0;
			}		
		}
		return 0;
	}
	
	
}
