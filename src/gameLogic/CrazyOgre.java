package gameLogic;

import java.util.ArrayList;
import java.util.concurrent.ThreadLocalRandom;

public class CrazyOgre extends Character {
	
	private static int counter = 0;
	
	boolean isStunned;
	boolean isArmed;
	char weapon;
	char under_weapon;
	Coord weaponLocation;
	int objectId;
	
		
	public CrazyOgre(Coord position, boolean armed, Board board){
		this.symbol = 'O';
		this.position = position;
		this.under_char = ' ';
		this.isArmed = armed;
		this.weapon = '*';
		this.isStunned = false;
		this.objectId = counter++;
		
		board.setBoardAt(this.position, this.symbol);

		if(armed)
			setValidWeaponLocation(board);
	}
	
	public Action move(Board board, Direction direction){
		return Action.NOACTION;

	}
	
	public Action move(Board board, ArrayList <CrazyOgre> ogres){
		
		if (!isStunned){
			
			System.out.println("Não estou Stunned");
			
			System.out.println("Estava em " + this.position + " por cima de " + this.under_char);
			cleanOldPos(ogres, board, false);
			
			int x = this.position.getX();
			int y = this.position.getY();
			
			boolean valid = false;
			
			while (!valid){
				
				System.out.println("Entrei no Ciclo");
				
				Direction direction = randomDirection();

				int move = direction.getValue();
				
				if(direction == Direction.DOWN || direction == Direction.UP){
					
					System.out.println("Vou andar na Vertical " + move + " unidade" );
					char nextPosChar = board.getBoardAt(x+move, y);
					Coord nextPos = new Coord(x+move, y);
					
					System.out.println("Nessa Posicao esta " + nextPosChar);
					
					if(nextPosChar == 'X' || nextPosChar == 'I' || nextPosChar == '*'){ // Nao pode ir para cima da arma dos outros ,,,, Ciclo para verificar se é a sua?
						valid = false;
						System.out.println("Não é um movimento Valido");
					}
					
					else{
						
						valid = true;
						
						if(nextPosChar == 'k' || nextPosChar == '$'){
							System.out.println("É um movimento Valido");
							this.symbol = '$';
							this.under_char = 'k';
						}
						
						else if(nextPosChar == 'O'  || nextPosChar == ' '){
							System.out.println("É um movimento Valido");
							this.symbol = 'O';
							this.under_char = ' ';
						}
						
						this.position = nextPos;

						System.out.println("Nova Posicao: " + this.position );
						System.out.println("Novo Symbolo: " + this.symbol );
						
						board.setBoardAt(this.position, this.symbol);
						
						
						if(isArmed){
							if(!weaponLocation.equals(position)){
								System.out.println(weaponLocation + "!=" + position);
								cleanOldPos(ogres, board, true);
								System.out.println("Posicao da Arma " + this.weaponLocation + " ficou com " + this.under_weapon);
							}
							board.showBoard();
							setValidWeaponLocation(board);
							
						}
					}
				}
				
				else if(direction == Direction.RIGHT || direction == Direction.LEFT){
					
					System.out.println("Vou andar na Horizontal " + move + " unidade" );
					
					char nextPosChar = board.getBoardAt(x, y+move);
					Coord nextPos = new Coord(x, y+move);
					
					
					System.out.println("Nessa Posicao esta " + nextPosChar);
					
					if(nextPosChar == 'X' || nextPosChar == 'I' || nextPosChar == '*' ){
						System.out.println("Não é um movimento Valido");
						valid = false;
					}
						
					
					else{
						
						valid = true;
						System.out.println("É um movimento Valido");
						
						if(nextPosChar == 'k' || nextPosChar == '$' ){	
							this.symbol = '$';
							this.under_char = 'k';
						}
						
						else if(nextPosChar == 'O' || nextPosChar == ' '){
							valid = true;
							this.symbol = 'O';
							this.under_char = ' ';
						}
						
						this.position = nextPos;

						System.out.println("Nova Posicao: " + this.position );
						System.out.println("Novo Symbolo: " + this.symbol );
						
						board.setBoardAt(this.position, this.symbol);
						
						if(isArmed){
							
							
							if(!weaponLocation.equals(position)){
								System.out.println(weaponLocation + "!=" + position);
								cleanOldPos(ogres, board, true);
								System.out.println("Posicao da Arma " + this.weaponLocation + " ficou com " + this.under_weapon);
							}
							board.showBoard();
							setValidWeaponLocation(board);
						}
					}
				}
				
				System.out.println("Valid: " + valid);
			}
			System.out.println("Sai do Ciclo");
		}
		
		else{
			
			System.out.println("Estou Stunned");
			
			if(isArmed){
				cleanOldPos(ogres, board, true);
				setValidWeaponLocation(board);
			}
			
		}
		
		System.out.println("\n\n\n");
		
		return Action.MOVE;
	}
	
	public void setValidWeaponLocation(Board board){
	
		System.out.println("\n\n\n");
		
		
		int x = this.position.getX();
		int y = this.position.getY();

		boolean valid = false;

		
		System.out.println("Arma: ");
		while(!valid){
			Direction direction = randomDirection();

			int move = direction.getValue();
			if(direction == Direction.DOWN || direction == Direction.UP){
				
				System.out.println("Vou colocar-me na Vertical do Ogre" + move + " unidade" );
				
				char nextPosChar = board.getBoardAt(x+move, y);
				Coord nextPos = new Coord(x+move, y);
				
				System.out.println("Nessa Posicao esta " + nextPosChar);
				
				if(nextPosChar == 'X' || nextPosChar == 'I' || nextPosChar == 'O' || nextPosChar == 'A' || nextPosChar == 'H' || nextPosChar == 'G'){
					valid = false;
					System.out.println("Não É um lugar Valido");
				}
				
				else{
					valid = true;
					System.out.println("É um lugar Valido");
					
					if(nextPosChar == 'k' || nextPosChar == '$'){
						this.weapon = '$';
						this.under_weapon = 'k';
					}
					
					else if(nextPosChar == ' '){
						this.weapon = '*';
						this.under_weapon = ' ';
					}
					
					else if(nextPosChar == '*'){
						this.weapon = '*';
						this.under_weapon = ' ';
					}
					
					this.weaponLocation = nextPos;
					
					System.out.println("Nova Arma Posicao: " + this.weaponLocation );
					System.out.println("Novo Arma Simbolo: " + this.weapon );
					
					board.setBoardAt(this.weaponLocation, this.weapon);
					board.showBoard();
					
				}
				
			}
			
			else if(direction == Direction.RIGHT || direction == Direction.LEFT){
				System.out.println("Vou colocar-me na Horizontal " + move + " unidade" );
				
				char nextPosChar = board.getBoardAt(x, y+move);
				Coord nextPos = new Coord(x, y+move);
				
				System.out.println("Nessa Posicao esta " + nextPosChar);
				
				if(nextPosChar == 'X' || nextPosChar == 'I' || nextPosChar == 'O' || nextPosChar == 'A' || nextPosChar == 'H' || nextPosChar == 'G') {
					valid = false;
					System.out.println("Não É um lugar Valido");
				}
				
				else{
					
					valid = true;
					System.out.println("É um lugar Valido");
					
					if(nextPosChar == 'k' || nextPosChar == '$'){
						this.weapon = '$';
						this.under_weapon = 'k';
						
						
					}
					
					else if(nextPosChar == ' '){
						this.weapon = '*';
						this.under_weapon = ' ';
					}
					
					else if(nextPosChar == '*'){
						this.weapon = '*';
						this.under_weapon = ' ';
					}
					
					this.weaponLocation = nextPos;
					
					System.out.println("Nova Arma Posicao: " + this.weaponLocation );
					System.out.println("Novo Arma Simbolo: " + this.weapon );

					board.setBoardAt(this.weaponLocation, this.weapon);
					board.showBoard();
					
				}
				
			}
			System.out.println("Valid: " + valid);
		}
		
		System.out.println("\n\n\n");
	}
	
	public Direction randomDirection(){

		int randomNum = ThreadLocalRandom.current().nextInt(0, 3 + 1);
		
		switch (randomNum) {
		case 0:
			return Direction.UP;
		case 1:
			return Direction.DOWN;
		case 2:
			return Direction.RIGHT;
		case 3:
			return Direction.LEFT;
		default:
			return Direction.INVALID;
		}
	}

	
	private void cleanOldPos(ArrayList<CrazyOgre> ogres, Board board, boolean weapon){

		System.out.println("\n\n");

		if(weapon){
			
			for(int i = 0 ; i < ogres.size(); i++){
				
				System.out.println("Comparando com Ogre" + i +" ");
				
				System.out.println("Posicao de ogre( " + i + ") :" + ogres.get(i).position);
				System.out.println("Posicao de Arma de ogre( " + i + ") :" + ogres.get(i).weaponLocation);
				System.out.println("Posicao de Arma de this:"+ this.weaponLocation);
				
				
				if(ogres.get(i).equals(this)){

					board.setBoardAt(this.weaponLocation, this.under_weapon);
					System.out.println("Weapon Old Pos Clean");

					return;
				}

				if(ogres.get(i).position.equals(this.weaponLocation) || ogres.get(i).weaponLocation.equals(this.weaponLocation)){
					System.out.println("São iguais");
					return;
				}
				
				System.out.println("Não são iguais");
			}

		}

		else{
			for(int i = 0 ; i < ogres.size(); i++){
				if(ogres.get(i).equals(this)){

					board.setBoardAt(this.position, this.under_char);
					System.out.println("Ogre Old Pos Clean");

					return;
				}

				if(ogres.get(i).position.equals(this.position) || ogres.get(i).weaponLocation.equals(this.position))
					return;
			}

		}

	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + objectId;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CrazyOgre other = (CrazyOgre) obj;
		if (objectId != other.objectId)
			return false;
		return true;
	}

	public void setStunned(boolean isStunned) {
		this.isStunned = isStunned;
	}
	
	
}