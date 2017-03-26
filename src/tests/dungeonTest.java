package tests;

import static org.junit.Assert.*;

import org.junit.Test;

import gameLogic.*;

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
	
	 //Task #2
	
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
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.LEFT);
		g.updateGame(Direction.LEFT);
		assertTrue(g.isWon());
	}
	
	// Task #3
	
	@Test (timeout =1000)
	public void testSomeRandomBehaviour(){
		
		Level l_2 = new Level(-2);
		GameConfig game = new GameConfig(6,5);
		GameLogic g = new GameLogic(l_2, game);
		g.updateGame(Direction.DOWN);
		boolean outcome1 = false, outcome2 = false; 
		while (!outcome1 && !outcome2){
			if ('O' == g.getBoard().getBoardAt(1, 3)){
				if('*' == g.getBoard().getBoardAt(1, 2) || '*' == g.getBoard().getBoardAt(1, 4) || '*' == g.getBoard().getBoardAt(2, 3))
					outcome1 = true;
				else
					break;
			}
			else if ('O' == g.getBoard().getBoardAt(2,4)){
				if('*' == g.getBoard().getBoardAt(3, 4) || '*' == g.getBoard().getBoardAt(1, 4) || '*' == g.getBoard().getBoardAt(2, 3))
					outcome1 = true;
				else
					break;
			}
			else{
				break;
			}
			
		}
		assertTrue(outcome1 || outcome2);
	}

	// Task #4 and #5
	
	@Test
	public void testLevel1(){
		Level l1 = new Level(1);
		GameConfig game = new GameConfig();
		game.setGuardIndex(0);
		game.setNumOfOgres(1);
		GameLogic g = new GameLogic(l1, game);
		
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.UP);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.LEFT);
		
		assertEquals(new Coord(8,7), g.getHero().getPosition());
	}
	
	@Test
	public void testRookie(){
		Level l2 = new Level(2);
		GameConfig game = new GameConfig();
		game.setGuardIndex(0);
		game.setNumOfOgres(1);
		GameLogic g = new GameLogic(l2, game);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.UP);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.LEFT);
		assertEquals(new Coord(8,7), g.getHero().getPosition());
	}
	
	@Test
	public void testDrunken(){
		Level l2 = new Level(2);
		GameConfig game = new GameConfig();
		game.setGuardIndex(1);
		game.setNumOfOgres(1);
		GameLogic g = new GameLogic(l2, game);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		boolean outcome = false;
		if ('G' == g.getBoard().getBoardAt(1,8) || 'g' == g.getBoard().getBoardAt(1,8))
			outcome = true;
		else if('G' == g.getBoard().getBoardAt(1,7) || 'g' == g.getBoard().getBoardAt(1,7))
			outcome = true;
		else if('G' == g.getBoard().getBoardAt(2,7) || 'g' == g.getBoard().getBoardAt(2,7))
			outcome = true;
		assertTrue(outcome);
	}
	
	@Test
	public void testSuspicious(){
		Level l2 = new Level(2);
		GameConfig game = new GameConfig();
		game.setGuardIndex(2);
		game.setNumOfOgres(1);
		GameLogic g = new GameLogic(l2, game);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		boolean outcome = false;
		if ('G' == g.getBoard().getBoardAt(1,8) || 'G' == g.getBoard().getBoardAt(2,7))
			outcome = true;
		assertTrue(outcome);
	}
	
	@Test
	public void testLevel3(){
		Level l3 = new Level(3);
		GameConfig game = new GameConfig();
		GameLogic g = new GameLogic(l3, game);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		assertEquals(new Coord(7,3), g.getHero().getPosition());
	}
	
	@Test
	public void testOgreLevel3(){
		Level l3 = new Level(3);
		GameConfig game = new GameConfig();
		GameLogic g = new GameLogic(l3, game);
		g.updateGame(Direction.RIGHT);
		boolean outcome = false;
		if ('O' == g.getBoard().getBoardAt(1,3) || 'O' == g.getBoard().getBoardAt(1,5) || 'O' == g.getBoard().getBoardAt(2,4))
			outcome = true;
		assertTrue(outcome);
	}
	
	@Test
	public void testOgreLevel4(){
		Level l4 = new Level(4);
		GameConfig game = new GameConfig();
		GameLogic g = new GameLogic(l4, game);
		g.updateGame(Direction.RIGHT);
		boolean outcome = false;
		if ('O' == g.getBoard().getBoardAt(1,3) || 'O' == g.getBoard().getBoardAt(1,5) || 'O' == g.getBoard().getBoardAt(2,4))
			outcome = true;
		assertTrue(outcome);
	}
	
	@Test
	public void testOgreClubLevel4(){
		Level l4 = new Level(4);
		GameConfig game = new GameConfig();
		GameLogic g = new GameLogic(l4, game);
		g.updateGame(Direction.RIGHT);
		boolean outcome = false;
		if ('*' == g.getBoard().getBoardAt(1,2) || '*' == g.getBoard().getBoardAt(1,4) || '*' == g.getBoard().getBoardAt(1,6)
				||'*' == g.getBoard().getBoardAt(2,3) || '*' == g.getBoard().getBoardAt(2,5) || '*' == g.getBoard().getBoardAt(3,4))
			outcome = true;
		assertTrue(outcome);
	}
	
	@Test
	public void testOgreLevel5(){
		Level l5 = new Level(5);
		GameConfig game = new GameConfig();
		GameLogic g = new GameLogic(l5, game);
		g.updateGame(Direction.RIGHT);
		assertEquals(new Coord(7,2), g.getHero().getPosition());
	}

	@Test
	public void testTroll(){
		Level l2 = new Level(-1);
		GameConfig game = new GameConfig();
		game.setGuardIndex(0);
		game.setNumOfOgres(1);
		GameLogic g = new GameLogic(l2, game);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.UP);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.DOWN);
		g.updateGame(Direction.RIGHT);
		assertEquals(new Coord(3,3), g.getHero().getPosition());
		g.updateGame(Direction.RIGHT);
		assertEquals(new Coord(3,3), g.getHero().getPosition());
		g.updateGame(Direction.RIGHT);
		g.updateGame(Direction.RIGHT);
		assertEquals(new Coord(3,3), g.getHero().getPosition());
		g.updateGame(Direction.DOWN);
		assertEquals(new Coord(3,3), g.getHero().getPosition());
		g.updateGame(Direction.DOWN);
		assertEquals(new Coord(3,3), g.getHero().getPosition());
		g.updateGame(Direction.LEFT);
		assertEquals(new Coord(3,2), g.getHero().getPosition());
	}


}



