package gui;

import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.Toolkit;

import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;

import gameLogic.GameConfig;

public class OptionsDialog extends JDialog {

	private GameConfig gameConfig;
	private GamePanel gamePanel;
	
	private JComboBox <String> guardSelector;
	
	public OptionsDialog(GameFrame gameFrame, GamePanel gamePanel, GameConfig gameConfig){
		this.gameConfig = gameConfig;
		setTitle("Options");
		
		getContentPane().setLayout(new GridLayout(7, 1));
		
		// Setting up dialog content
		SetUpGuardSettingsSection();
		
		pack();
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		
		this.setLocation((screenSize.width-this.getSize().width)/2, (screenSize.height-this.getSize().height)/2);
	}
	
	public void SetUpGuardSettingsSection() {
		JLabel lblGuardPersonality = new JLabel("Guard Personality");
		lblGuardPersonality.setHorizontalAlignment(SwingConstants.CENTER);
		getContentPane().add(lblGuardPersonality);
		
		JPanel guardPersonality = new JPanel();
		getContentPane().add(guardPersonality);
		
		JLabel lblGuards = new JLabel("Personality");
		lblGuards.setHorizontalAlignment(SwingConstants.LEFT);
		guardPersonality.add(lblGuards);
		
		String[] personalityStrings = { "Rookie", "Drunken",
		"Suspicius" };
		
		guardSelector = new JComboBox<String>(personalityStrings);
		guardSelector.setSelectedIndex(0);
		guardPersonality.add(guardSelector);
		
	}
	
}
