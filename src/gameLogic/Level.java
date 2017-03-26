package gameLogic;

import java.io.Serializable;

public class Level implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int level;
	
	private boolean haveGuard;
	private boolean haveLever;
	private boolean haveOgre;
	private boolean haveKey;

	Board board;
	Hero hero;
	
	public Level(){
	}
	
	public Level(int level){
		switch (level) {
		case -2:
			level_config(-2, false, false, true, true);
			break;
		case -1:
			level_config(-1, false, false, true, true);
			break;
		case 0:
			level_config(0, true, false, true, false);
			break;
		case 1:
			level_config(1, true, true, false, false);
			break;
		case 2:
			level_config(2, true, true, false, false);
			break;
		case 3:
			level_config(3, false, false, true, true);
			break;
		case 4:
			level_config(4, false, false, true, true);
			break;
		case 5:
			level_config(5, false, false, true, true);
			break;
		case 6:
			level_config(6, false, false, false, false);
			
		default:
			break;
		}
	}
	
	private void level_config(int level, boolean haveGuard, boolean haveLever, boolean haveKey, boolean haveOgre) {
		this.haveGuard = haveGuard;
		this.haveLever = haveLever;
		this.haveOgre = haveOgre;
		this.haveKey = haveKey;
		this.level = level;
		this.board = new Board(level);
		this.hero = new Hero(level);
	}


	public int getLevel() {
		return level;
	}


	public boolean isHaveGuard() {
		return haveGuard;
	}


	public boolean isHaveLever() {
		return haveLever;
	}


	public boolean isHaveOgre() {
		return haveOgre;
	}


	public Board getBoard() {
		return board;
	}


	public Hero getHero() {
		return hero;
	}

	public void setHaveGuard(boolean haveGuard) {
		this.haveGuard = haveGuard;
	}

	public void setHaveLever(boolean haveLever) {
		this.haveLever = haveLever;
	}

	public void setHaveOgre(boolean haveOgre) {
		this.haveOgre = haveOgre;
	}

	public boolean isHaveKey() {
		return haveKey;
	}

	public void setHaveKey(boolean haveKey) {
		this.haveKey = haveKey;
	}

	
	
}
