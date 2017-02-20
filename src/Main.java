import gameLogic.*;

public class Main {

	public static void main(String[] args) {
		System.out.println("Hello World");

		GameConfig gameConfig = new GameConfig();

		int levels = 4;
		int i = 1;
		Game g;

		while(i <= levels){
			g = new Game(i, gameConfig);
			if(g.isWon())
				i++;
		}
	}
}