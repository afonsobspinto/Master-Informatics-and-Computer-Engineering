package gui;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;

import javax.swing.ImageIcon;
import javax.swing.JPanel;

import gameLogic.GameConfig;
import gameLogic.GameLogic;
import gameLogic.Level;

public class GamePanel extends JPanel {

	private static final long serialVersionUID = 1L;

	private boolean showBackground = true;
	
	private Image background;
	private Image wall;
	private Image hero;
	private GameLogic game;
	
	private int charactersWidth;
	private int charactersHeight;
	
	public GamePanel() {
		loadImages();
	}
	
	
	private void loadImages(){
		ImageIcon temp;
		temp = new ImageIcon(this.getClass().getResource("res/background.png"));
		background = temp.getImage();
		
		temp = new ImageIcon(this.getClass().getResource("res/wall.png"));
		wall = temp.getImage();

	}
	
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		
		g.clearRect(0, 0, getWidth(), getHeight());
		Graphics2D g2d = (Graphics2D) g;
		
		if(showBackground){
		g2d.drawImage(background, 0, 0, this.getWidth(), this.getHeight(), 0, 0, 
				background.getWidth(null), background.getHeight(null), null);
		}
		else{
			drawGame(g2d);
		}
			
			
		
	}
	
	
	public void drawGame(Graphics g2d){

		for(int i = 0; i < game.getBoard().getRows(); i++){
			for(int j = 0; j < game.getBoard().getColumns(); j++){
				
				if(game.getBoard().getBoardAt(i, j) == 'X')
					drawWall(g2d, i,j);	
				
			}
		}
		
	}
	
	public void drawWall(Graphics g2d, int i, int j){
		int distX = j * charactersWidth;
		int distY = i * charactersHeight;
		
		distX += (getWidth() - charactersWidth * game.getBoard().getColumns()) / 2.0;
		distY += (getHeight() - charactersHeight * game.getBoard().getRows()) / 2.0;

		g2d.drawImage(wall, distX, distY, distX + charactersWidth, distY + charactersHeight, 0,
				0, wall.getWidth(null), wall.getHeight(null), null);
		
	}
	
	public void startNewGame(GameConfig gameConfig) {
		this.game = new GameLogic(new Level(1), gameConfig);
		showBackground = false;
		charactersHeight = this.getHeight() / gameConfig.getrows();
		charactersWidth = this.getWidth() / gameConfig.getcolumns();
		repaint();
		requestFocus();
	}


	public boolean isShowBackground() {
		return showBackground;
	}


	public void setShowBackground(boolean showBackground) {
		this.showBackground = showBackground;
	}
	
	
	
	
	
}
