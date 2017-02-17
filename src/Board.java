import java.util.Scanner;

public class Board {
	
	public class Hero{
		public int xPos;
		public int yPos;
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
	
	public void getHeroPos(){
		for(int i =0; i < 10; i++){
			for(int j = 0; j < 10; j++){
				if(board[i][j]=='H'){
					hero.xPos = i;
					hero.yPos = j;
					break;
				}
			}
		}
	}
	
	public void play(){
		int move = interaction(); //Le Movimento
		
		switch(move){
		case 0:
			break;
		}
		
		
	}
}
