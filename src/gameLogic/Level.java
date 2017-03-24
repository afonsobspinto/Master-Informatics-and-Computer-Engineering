package gameLogic;

public class Level {

	private int level;
	
	private boolean haveGuard;
	private boolean haveLever;
	private boolean haveOgre;

	Board board;
	Hero hero;
	
	public Level(int level){
		switch (level) {
		case -2:
			level_config(-2, false, false, true);
			break;
		case -1:
			level_config(-1, false, false, true);
			break;
		case 0:
			level_config(0, true, false, false);
			break;
		case 1:
			level_config(1, true, true, false);
			break;
		case 2:
			level_config(2, true, true, false);
			break;
		case 3:
			level_config(3, false, false, true);
			break;
		case 4:
			level_config(4, false, false, true);
			break;
		case 5:
			level_config(5, false, false, true);
			break;
			
		default:
			break;
		}
	}
	
	private void level_config(int level, boolean haveGuard, boolean haveLever, boolean haveOgre) {
		this.haveGuard = haveGuard;
		this.haveLever = haveLever;
		this.haveOgre = haveOgre;
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

	@Override
	public String toString() {
		return "Level [level=" + level + ", haveGuard=" + haveGuard + ", haveLever=" + haveLever + ", haveOgre="
				+ haveOgre + ", board=" + board + ", hero=" + hero + "]";
	}
	
	
	
}
