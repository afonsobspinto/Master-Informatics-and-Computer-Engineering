
public class DungeonKeep {

	public static void main(String[] args) {
		Board x = new Board(1);
		x.showBoard();
		
		while(x.play() != 1){
			continue;
		}
	}
}
