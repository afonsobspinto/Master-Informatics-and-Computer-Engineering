import gameLogic.*;

public class Main {
	
	public static void main(String[] args) {
		System.out.println("Hello World");
		
		GameConfig gameConfig = new GameConfig();
		
		Game g = new Game(1, gameConfig);
		
		System.out.println(g.interection());
		
	}

}
