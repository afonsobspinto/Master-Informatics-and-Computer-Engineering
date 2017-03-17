package gui;

import javax.swing.JComboBox;
import javax.swing.JDialog;

import gameLogic.GameConfig;

public class OptionsDialog extends JDialog {

	private GameConfig gameConfig;
	private GamePanel gamePanel;
	
	private JComboBox <String> guardBehavior;
	
	public OptionsDialog(GameFrame gameFrame, GamePanel gamePanel, GameConfig gameConfig){
		this.gameConfig = gameConfig;
		setTitle("Options");
	}
	
}
