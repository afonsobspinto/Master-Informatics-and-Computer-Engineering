package gui;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.List;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectInputStream;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JTextField;

import gameLogic.GameLogic;

public class LoadDialog extends JDialog {
	
	private GameFrame gameFrame;
	private GamePanel gamePanel;
	private List gamesList;
	
	/** Saved games folder path */
	private static final String savedGamesFolder = System.getProperty("user.dir") + "/Saved Games/";
	
	
	
public LoadDialog(GameFrame gameFrame, GamePanel gamePanel) {
		
		this.gameFrame = gameFrame;
		this.gamePanel = gamePanel;
		
		setTitle("Load Game");
		this.setModalityType(JDialog.DEFAULT_MODALITY_TYPE);
		getContentPane().setLayout(new GridLayout(3,1));
		
		// Setting up dialog content
		SetUpLoadSection();
		
		pack();
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		
		this.setLocation((screenSize.width-this.getSize().width)/2, (screenSize.height-this.getSize().height)/2);
	
	}
	

private void SetUpLoadSection() {
	JLabel lblName = new JLabel("Load Game:");
	getContentPane().add(lblName, BorderLayout.NORTH);

	gamesList = new List();
	getContentPane().add(gamesList);
	readFolder();

	JButton loadButton = new JButton("Load");
	getContentPane().add(loadButton);


	loadButton.addActionListener(new ActionListener() {
		public void actionPerformed(ActionEvent arg0) {
			
			GameLogic loadedGame = LoadGame();

			if (loadedGame != null){
				gamePanel.loadGame(loadedGame);
				gameFrame.getContentPane().removeAll();
				gameFrame.getContentPane().validate();
				gameFrame.getContentPane().add(gamePanel);
				setVisible(false);
			}
		}
	});

}

private GameLogic LoadGame() {
	if (gamesList.getSelectedItem() == null) {
		JOptionPane.showMessageDialog(null,
				"You must select a game to load.");
		return null;
	}

	try {
		FileInputStream fin = new FileInputStream(savedGamesFolder
				+ gamesList.getSelectedItem());
		ObjectInputStream ois = new ObjectInputStream(fin);
		GameLogic game = (GameLogic) ois.readObject();
		ois.close();
		return game;
	} catch (Exception ex) {
		ex.printStackTrace();
		JOptionPane.showMessageDialog(null,
				"An error occured while loading the game.");
		return null;
	}
}



public void readFolder() {
	File folder = new File(savedGamesFolder);
	if (!folder.isDirectory())
		return;

	gamesList.removeAll();
	for (File file : folder.listFiles())
		gamesList.add(file.getName());
}

}
