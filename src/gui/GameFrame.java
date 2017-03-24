package gui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.Dialog.ModalityType;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;

import gameLogic.GameConfig;

public class GameFrame extends JFrame {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final int xResolution = 800;
	private final int yResolution = 600;
	private final int xButtonRes = 125;
	private final int yButtonRes = 25;
	
	
	private JButton btnNewGame;
	private JButton btnLoadGame;
	private JButton btnExitGame;
	
	private JDialog options;
	private JDialog optionInGame;
	private JDialog saveOptions;
	
	private GamePanel gamePanel;
	private GameConfig gameConfig;
	
	public GameFrame(){
		this.setTitle("Dungeon Keep");
		this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		this.setResizable(false);
		
		gamePanel = new GamePanel(this);
		gameConfig = new GameConfig();
		options = new OptionsDialog(this, gamePanel, gameConfig);
		saveOptions = new SaveDialog();
		optionInGame = new OptionsInGameDialog(saveOptions);
		
		
		this.getContentPane().setLayout(new BorderLayout(0,0));
		
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();

		this.setBounds((screenSize.width-xResolution)/2, (screenSize.height-yResolution)/2, xResolution, yResolution);
		setUpButtons();
		
		this.getContentPane().add(gamePanel);
		
		this.setVisible(true);
		
	}
	
	private void setUpButtons(){
		

		/*
		 * NewGame
		 */
		
		btnNewGame = new JButton("New Game");
		btnNewGame.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				options.setVisible(true);
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
				String msg = "Are you sure you want to Exit?";
				int res = JOptionPane.showConfirmDialog(rootPane, msg);

				if (res == JOptionPane.YES_OPTION)
					System.exit(0);
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

	public void setOptionInGameVisible(boolean arg) {
		optionInGame.setVisible(arg);
	}

	public int getxButtonRes() {
		return xButtonRes;
	}

	public int getyButtonRes() {
		return yButtonRes;
	}
	
	
	
}
