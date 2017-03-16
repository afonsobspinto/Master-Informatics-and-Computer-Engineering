package tests;

import static org.junit.Assert.*;

import org.junit.Test;
import gameLogic.Coord;
import gameLogic.Direction;
import gameLogic.GameConfig;
import gameLogic.GameLogic;
import gameLogic.Level;;

public class dungeonTest {

	
	// Task #1
	
	@Test
	public void testMoveHeroIntoToFreeCell(){
		
		Level l0 = new Level(0);
		
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(l0, game);
		g.updateGame(Direction.DOWN);
		assertEquals(new Coord(2,1), g.getHero().getPosition());
	}

	@Test
	public void testMoveHeroIntoToWall(){
		
		Level l0 = new Level(0);
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(l0, game);
		g.updateGame(Direction.UP);
		assertEquals(new Coord(1,1), g.getHero().getPosition());
	}
	
	@Test
	public void testHeroIsCapturedByGuard(){
		Level l0 = new Level(0);
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(l0, game);
		g.updateGame(Direction.RIGHT);
		assertFalse(g.isWon());
		
	}
	
	@Test
	public void testMoveHeroIntoClosedDoor(){
		Level l0 = new Level(0);
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(l0, game);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.LEFT);
		assertEquals(new Coord(2,1), g.getHero().getPosition());
	}
	
	@Test
	public void testMoveHeroIntoLeverCell(){
		Level l0 = new Level(0);
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(l0, game);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		assertEquals('S', g.getBoard().getBoardAt(2,0));
	}
	
	@Test
	public void testMoveHeroIntoOpenDoor(){
		Level l0 = new Level(0);
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(l0, game);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.LEFT);
		assertTrue(g.isWon());
	}
	
	// Task #2
	
	@Test
	public void testHeroIsCapturedByOgre(){
		Level l_1 = new Level(-1);
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(l_1, game);
		g.updateGame(Direction.RIGHT);
		assertFalse(g.isWon());
		
	}
	
	@Test
	public void testMoveHeroIntoLeverCellOgre(){
		Level l_1 = new Level(-1);
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(l_1, game);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		assertEquals('K', g.getBoard().getBoardAt(3,1));
	}
	
	@Test
	public void testMoveHeroIntoClosedDoorOgre(){
		Level l_1 = new Level(-1);
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(l_1, game);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.LEFT);
		assertEquals(new Coord(2,1), g.getHero().getPosition());
	}
	
	@Test
	public void testMoveHeroIntoOpenDoorOgre(){
		Level l_1 = new Level(-1);
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(l_1, game);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.LEFT);
		assertEquals('S', g.getBoard().getBoardAt(3,0));
	}
	
	@Test
	public void testHeroEndsGame(){
		Level l_1 = new Level(-1);
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(l_1, game);
		g.updateGame(Direction.DOWN);
		g.showBoard();
		g.updateGame(Direction.DOWN);
		g.showBoard();
		g.updateGame(Direction.LEFT);
		g.showBoard();
		g.updateGame(Direction.LEFT);
		g.showBoard();
		assertTrue(g.isWon());
	}
	
	// Task #3
	
	@Test (timeout =1000)
	public void testSomeRandomBehaviour(){
		
		Level l_2 = new Level(-2);
		GameConfig game = new GameConfig(6,5);
		GameLogic g = new GameLogic(l_2, game);
		g.showBoard();
		g.updateGame(Direction.DOWN);
		boolean outcome1 = false, outcome2 = false; 
		while (!outcome1 && !outcome2){
			if ('O' == g.getBoard().getBoardAt(1, 3)){
				if('*' == g.getBoard().getBoardAt(1, 2) || '*' == g.getBoard().getBoardAt(1, 4) || '*' == g.getBoard().getBoardAt(2, 3))
					outcome1 = true;
				else
					break;
				System.out.println("1\n");
			}
			else if ('O' == g.getBoard().getBoardAt(2,4)){
				if('*' == g.getBoard().getBoardAt(3, 4) || '*' == g.getBoard().getBoardAt(1, 4) || '*' == g.getBoard().getBoardAt(2, 3))
					outcome1 = true;
				else
					break;
				System.out.println("2\n");
			}
			else{
				System.out.println("Fail");
				break;
			}
			
		}
		g.showBoard();
		assertTrue(outcome1 || outcome2);
	}
	
}

