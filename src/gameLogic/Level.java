package gameLogic;

public class Level {

	private int level;
	
	private boolean haveGuard;
	private boolean haveLever;
	private boolean haveOgre;


	public Level(int level, boolean haveGuard, boolean haveLever, boolean haveOgre) {
		this.haveGuard = haveGuard;
		this.haveLever = haveLever;
		this.haveOgre = haveOgre;
		this.level = level;
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
	
	
	
}
