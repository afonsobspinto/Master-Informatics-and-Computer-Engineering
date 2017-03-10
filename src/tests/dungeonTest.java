package tests;

import static org.junit.Assert.*;

import org.junit.Test;
import gameLogic.Coord;
import gameLogic.Direction;
import gameLogic.GameConfig;
import gameLogic.GameLogic;

public class dungeonTest {

	// Task #1
	
	@Test
	public void testMoveHeroIntoToFreeCell(){
		
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(0, game);
		g.updateGame(0,Direction.DOWN);
		assertEquals(new Coord(2,1), g.getHero().getPosition());
	}

	@Test
	public void testMoveHeroIntoToWall(){
		
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(0, game);
		g.updateGame(0,Direction.UP);
		assertEquals(new Coord(1,1), g.getHero().getPosition());
	}
	
	@Test
	public void testHeroIsCapturedByGuard(){
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(0, game);
		g.updateGame(0,Direction.RIGHT);
		assertFalse(g.isWon());
		
	}
	
	@Test
	public void testMoveHeroIntoClosedDoor(){
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(0, game);
		g.updateGame(0,Direction.DOWN);
		g.updateGame(0,Direction.LEFT);
		assertEquals(new Coord(2,1), g.getHero().getPosition());
	}
	
	@Test
	public void testMoveHeroIntoLeverCell(){
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(0, game);
		g.updateGame(0,Direction.DOWN);
		g.updateGame(0,Direction.DOWN);
		assertEquals('S', g.getBoard().getBoardAt(2,0));
	}
	
	@Test
	public void testMoveHeroIntoOpenDoor(){
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(0, game);
		g.updateGame(0,Direction.DOWN);
		g.updateGame(0,Direction.DOWN);
		g.updateGame(0,Direction.LEFT);
		assertTrue(g.isWon());
	}
	
	// Task #2
	
	@Test
	public void testHeroIsCapturedByOgre(){
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(-1, game);
		g.updateGame(-1,Direction.RIGHT);
		assertFalse(g.isWon());
		
	}
	
	@Test
	public void testMoveHeroIntoLeverCellOgre(){
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(-1, game);
		g.updateGame(-1,Direction.DOWN);
		g.updateGame(-1,Direction.DOWN);
		assertEquals('K', g.getBoard().getBoardAt(3,1));
	}
	
	@Test
	public void testMoveHeroIntoClosedDoorOgre(){
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(-1, game);
		g.updateGame(-1,Direction.DOWN);
		g.updateGame(-1,Direction.LEFT);
		assertEquals(new Coord(2,1), g.getHero().getPosition());
	}
	
	@Test
	public void testMoveHeroIntoOpenDoorOgre(){
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(-1, game);
		g.updateGame(-1,Direction.DOWN);
		g.updateGame(-1,Direction.DOWN);
		g.updateGame(-1,Direction.LEFT);
		assertEquals('S', g.getBoard().getBoardAt(3,0));
	}
	
	@Test
	public void testHeroEndsGame(){
		GameConfig game = new GameConfig(5,5);
		GameLogic g = new GameLogic(-1, game);
		g.updateGame(-1,Direction.DOWN);
		g.updateGame(-1,Direction.DOWN);
		g.updateGame(-1,Direction.LEFT);
		g.updateGame(-1,Direction.LEFT);
		assertTrue(g.isWon());
	}
	
	// Task #3
	
	@Test (timeout =1000)
	public void testSomeRandomBehaviour(){
		GameConfig game = new GameConfig(6,5);
		GameLogic g = new GameLogic(-2, game);
		g.showBoard();
		g.updateGame(-2,Direction.DOWN);
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


