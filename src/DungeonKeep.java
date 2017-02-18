
public class DungeonKeep {

	public static void main(String[] args) {
		
		boolean gameOn = true;
		Board x = new Board(1);
		
		x.showBoard();
		
		while(gameOn){
			
			switch (x.play()) {
			case 1:
				System.out.println("Victory");
				gameOn = false;
				break;
				
			case -1:
				System.out.println("Defeat");
				gameOn = false;
				break;

			default:
				break;
			}
		}
	}
}
