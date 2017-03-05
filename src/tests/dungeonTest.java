package tests;

import static org.junit.Assert.*;

import org.junit.Test;
import gameLogic.Coord;
import gameLogic.Direction;
import gameLogic.GameConfig;
import gameLogic.GameLogic;

public class dungeonTest {

	@Test
	public void testMoveHeroIntoToFreeCell(){
		
		System.out.println("test");
		GameConfig game = new GameConfig();
		GameLogic g = new GameLogic(1, game);
		g.updateGame(1,Direction.RIGHT);
		g.showBoard();
		assertEquals(new Coord(1,2), g.getHero().getPosition());
	}

}


