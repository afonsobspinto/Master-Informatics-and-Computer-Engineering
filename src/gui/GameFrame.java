package gui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;

import gameLogic.GameConfig;

public class GameFrame extends JFrame {

	private final int xResolution = 800;
	private final int yResolution = 600;
	private final int xButtonRes = 125;
	private final int yButtonRes = 25;
	
	
	private JButton btnNewGame;
	private JButton btnLoadGame;
	private JButton btnExitGame;
	
	private JDialog options;
	private GamePanel gamePanel;
	private GameConfig gameConfig;
	
	public GameFrame(){
		this.setTitle("Dungeon Keep");
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		gamePanel = new GamePanel();
		gameConfig = new GameConfig();
		options = new OptionsDialog(this, gamePanel, gameConfig);
		
		setUpButtons();
		getContentPane().setLayout(new BorderLayout(0,0));
		getContentPane().add(gamePanel);
		
	}
	
	public void setUpButtons(){
		

		/*
		 * NewGame
		 */
		
		btnNewGame = new JButton("New Game");
		btnNewGame.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
			}
		}
		);
		
		btnNewGame.setBounds((this.getWidth()-xButtonRes)/2, (int)(((this.getHeight()-yButtonRes)/2) - this.getHeight()*(1.0/4.0)), xButtonRes, yButtonRes);
		this.getContentPane().add(btnNewGame);
		
		
		/*
		 * ExitGame
		 */
		
		btnExitGame = new JButton("Exit Game");
		btnExitGame.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
			}
		}
		);
		
		btnExitGame.setBounds((this.getWidth()-xButtonRes)/2, (int)(((this.getHeight()-yButtonRes)/2) + this.getHeight()*(1.0/4.0)), xButtonRes, yButtonRes);
		this.getContentPane().add(btnExitGame);
		
		/*
		 * LoadGame
		 */
		
		btnLoadGame = new JButton("Load Game");
		btnExitGame.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
			}
		}
		);
		
		btnLoadGame.setBounds((this.getWidth()-xButtonRes)/2, (this.getHeight()-yButtonRes)/2, xButtonRes, yButtonRes);
		this.getContentPane().add(btnLoadGame);
		
	}
	
	public void start(){
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		int width = (int) screenSize.getWidth();
		int height = (int) screenSize.getHeight();
	
		this.setBounds((width-xResolution)/2, (height-yResolution)/2, xResolution, yResolution);
		setVisible(true);
	}
}
