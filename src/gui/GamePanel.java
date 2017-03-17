package gui;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;

import javax.swing.ImageIcon;
import javax.swing.JPanel;

public class GamePanel extends JPanel {

	private Image background;
	
	public GamePanel() {
		loadImages();
	}
	
	
	private void loadImages(){
		ImageIcon temp;
		temp = new ImageIcon(this.getClass().getResource("res/background.png"));
		background = temp.getImage();
	}
	
	public void paintComponent(Graphics g) {
		super.paintComponent(g);
		
		Graphics2D g2d = (Graphics2D) g;
		g2d.drawImage(background, 0, 0, this.getWidth(), this.getHeight(), 0, 0, 
				background.getWidth(null), background.getHeight(null), null);
		
	}
}
