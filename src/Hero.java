
public class Hero {
		
	private int xPos;
	private int yPos;
	
	private int old_xPos;
	private int old_yPos;
	
	private char old_char;
	
	
	public Hero(int xPos, int yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.old_char=' ';
	}

	public int getxPos() {
		return xPos;
	}

	public void setxPos(int xPos) {
		this.old_xPos = this.xPos;
		this.xPos = xPos;
	}

	public int getyPos() {
		return yPos;
	}

	public void setyPos(int yPos) {
		this.old_yPos = this.yPos;
		this.yPos = yPos;
	}

	public int getOld_xPos() {
		return old_xPos;
	}

	public int getOld_yPos() {
		return old_yPos;
	}

	public char getOld_char() {
		return old_char;
	}

	public void setOld_char(char old_char) {
		this.old_char = old_char;
	}
	
	

}
