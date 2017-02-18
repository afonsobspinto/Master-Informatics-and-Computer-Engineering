
public class Hero {

	private int xPos;
	private int yPos;
	private int old_xPos;
	private int old_yPos;
	private char old_char;
	
	
	public Hero(int xPos, int yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
	}


	public int getxPos() {
		return xPos;
	}


	public void setxPos(int xPos) {
		this.xPos = xPos;
	}


	public int getyPos() {
		return yPos;
	}


	public void setyPos(int yPos) {
		this.yPos = yPos;
	}


	public int getOld_xPos() {
		return old_xPos;
	}


	public void setOld_xPos(int old_xPos) {
		this.old_xPos = old_xPos;
	}


	public int getOld_yPos() {
		return old_yPos;
	}


	public void setOld_yPos(int old_yPos) {
		this.old_yPos = old_yPos;
	}


	public char getOld_char() {
		return old_char;
	}


	public void setOld_char(char old_char) {
		this.old_char = old_char;
	}
	
	

}
