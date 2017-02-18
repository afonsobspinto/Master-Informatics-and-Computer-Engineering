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
	
	public static int  interaction(){
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

	public void showBoard(){
		for(int i =0; i < 10; i++){
			for(int j = 0; j < 10; j++){
				System.out.print(board[i][j]);
				System.out.print(" ");
			}
			System.out.println();
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

	public boolean isGuardnearby(){
		
		int xPos = hero.getxPos();
		int yPos = hero.getyPos();
		
		if(board[xPos+1][yPos]=='G')
			return true;
		
		if(board[xPos-1][yPos]=='G')
			return true;
		
		if(board[xPos][yPos+1]=='G')
			return true;
		
		if(board[xPos][yPos-1]=='G')
			return true;
		
		return false;
		
	}
	
	public int validateMove(int moveX, int moveY){
		
		int valid;
		
		char nextPos = board[hero.getxPos()+moveX][hero.getyPos()+moveY];
		int x = hero.getxPos();
		int y = hero.getyPos();
		
		if(nextPos == 'X' || nextPos == 'I'){ //Wall or Door
			valid = 0;
		}
		
		else if(nextPos == 'S'){ //Open Door
			valid = 1;
		}
		
		else if(nextPos == 'k'){ //Lever
			
			board[x][y]=hero.getOld_char();
			hero.setOld_char('k');
			hero.setxPos(hero.getxPos()+moveX);
			hero.setyPos(hero.getyPos()+moveY);
			board[hero.getxPos()][hero.getyPos()] = 'H';
			
			applyLever();
			
			valid = 0;
		}

		else{ //Empty Cell
			
			board[x][y]=hero.getOld_char();
			hero.setOld_char(' ');
			hero.setxPos(hero.getxPos()+moveX);
			hero.setyPos(hero.getyPos()+moveY);
			board[hero.getxPos()][hero.getyPos()] = 'H';
			
			valid = 0;
		}
		
		return valid;
	}

	public int play(){
		int valid = -2;
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

		if(isGuardnearby()){
			valid = -1;
		}
		
		if(valid!=-2)
			showBoard();
		
		return valid;
	}
}
