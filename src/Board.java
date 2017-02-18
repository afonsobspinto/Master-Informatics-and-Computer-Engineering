import java.util.Scanner;


public class Board {

	private char [][] board;
	
	Hero hero = new Hero(-1,-1);
	
	public Board(int level) {
		
		switch (level) {
		case 1:
			this.board = new char[][]{
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
			
			hero.setxPos(1);
			hero.setyPos(1);
			
			break;

		default:
			break;
		}
	}


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
		
		board[hero.getOld_xPos()][hero.getOld_yPos()] = hero.getOld_char();
		board[hero.getxPos()][hero.getyPos()] = 'H';
		showBoard();
	}
	
	public int validateMove(int moveX, int moveY){
		
		int valid;
		
		char nextPos = board[hero.getxPos()+moveX][hero.getyPos()+moveY];
		char guardPos = board[hero.getxPos()+moveX*2][hero.getyPos()+moveY*2];
		
		if(nextPos == 'X'){ //Wall
			hero.setOld_char('X');
			valid = 0;
		}
		else if(nextPos == 'I'){
			hero.setOld_char('I');
			valid = 0;
		}
		else if(nextPos == 'k'){ //Lever
			hero.setOld_xPos(hero.getxPos());
			hero.setOld_yPos(hero.getyPos());
			
			hero.setxPos(hero.getxPos()+moveX);
			hero.setyPos(hero.getyPos()+moveY);
			
			hero.setOld_char('k');
			
			applyLever();
			
			valid = 0;
		}
		else if(guardPos=='G'){ // Guard
			valid = 1;  // Game Over

		}
		else{ //Empty Cell
			
			hero.setOld_xPos(hero.getxPos());
			hero.setOld_yPos(hero.getyPos());
			
			hero.setxPos(hero.getxPos()+moveX);
			hero.setyPos(hero.getyPos()+moveY);
			
			hero.setOld_char(' ');
			
			valid = 0;
		}
		
		return valid;
	}

	public int play(){
		int valid = -1;
		int move = interaction(); //Read Move

		switch(move){
		case 0: //UP
			valid = validateMove(-1,0);
			break;
		case 1: //LEFT
			valid = validateMove(0,-1);
			break;
		case 2: //RIGTH
			valid = validateMove(0,1);
			break;
		case 3: //Down
			valid = validateMove(1,0);
			break;
		}

		if(valid!=-1 && valid!=1)
			updateBoard();
		
		return valid;
	}
}
