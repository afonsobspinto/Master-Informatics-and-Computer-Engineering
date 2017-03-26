package gui;

import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.SwingConstants;
import javax.swing.JTextField;

import gameLogic.GameConfig;

public class OptionsDialog extends JDialog {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private GameConfig gameConfig;
	private GamePanel gamePanel;
	private GameFrame gameFrame;
	
	private JComboBox <String> guardSelector;
	private JTextField txtNumberOfOgres;
	
	public OptionsDialog(GameFrame gameFrame, GamePanel gamePanel, GameConfig gameConfig){
		this.gameConfig = gameConfig;
		this.gamePanel = gamePanel;
		this.gameFrame = gameFrame;
		setTitle("Options");
		this.setModalityType(JDialog.DEFAULT_MODALITY_TYPE);
		
		getContentPane().setLayout(new GridLayout(5, 1));
		
		// Setting up dialog content
		SetUpGuardSettingsSection();
		SetUpOgresSettingsSection();
		SetUpButtonsSection();
		
		pack();
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		
		this.setLocation((screenSize.width-this.getSize().width)/2, (screenSize.height-this.getSize().height)/2);
	}
	
	public void SetUpGuardSettingsSection() {
		JLabel lblGuardPersonality = new JLabel("Guard Settings");
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
	
	public void SetUpOgresSettingsSection() {
		JLabel lblOgresNumber = new JLabel("Ogres Settings");
		lblOgresNumber.setHorizontalAlignment(SwingConstants.CENTER);
		getContentPane().add(lblOgresNumber);
		
		JPanel numberOfOgres = new JPanel();
		getContentPane().add(numberOfOgres);
		
		JLabel lblOgres = new JLabel("Number Of Ogres");
		lblOgres.setHorizontalAlignment(SwingConstants.LEFT);
		numberOfOgres.add(lblOgres);
		
		txtNumberOfOgres = new JTextField("3");
		txtNumberOfOgres.setColumns(2);
		numberOfOgres.add(txtNumberOfOgres);
	}
	
	public void SetUpButtonsSection(){
		JPanel buttons = new JPanel();
		getContentPane().add(buttons);
		
		/*
		 * Start Button
		 */
		
		JButton btnStart = new JButton("Start");
		btnStart.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				int guardIndex = guardSelector.getSelectedIndex();
				int numOfOgres = 1;
				boolean valid = true;

				try{
					numOfOgres = Integer.parseInt(txtNumberOfOgres.getText()); 
					if(numOfOgres <= 0 || numOfOgres >= 6){
						throw new NumberOfOgresOutofBound();
					}
				}catch(NumberFormatException e){
					String msg = "You should set a valid Number of Ogres";
					JOptionPane.showMessageDialog(rootPane, msg);
					return;
				}catch(NumberOfOgresOutofBound e){
					String msg = "Number of Ogres should be greater than 0 and lesser than 6";
					JOptionPane.showMessageDialog(rootPane, msg);
					return;

				}
				

				
				gameConfig.setNumOfOgres(numOfOgres);
				gameConfig.setGuardIndex(guardIndex);
				
				gameFrame.getContentPane().removeAll();
				gameFrame.getContentPane().validate();
				gameFrame.getContentPane().add(gamePanel);
				
				gamePanel.startNewGame(gameConfig, 1);
				
				setVisible(false);
			}
		});
		
		buttons.add(btnStart);
	
		
		/*
		 * Custom Button
		 */
		JButton btnCustom = new JButton("Custom Map");
		btnCustom.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				
				int guardIndex = guardSelector.getSelectedIndex();
				int numOfOgres = 1;
				boolean valid = true;

				try{
					numOfOgres = Integer.parseInt(txtNumberOfOgres.getText()); 
					if(numOfOgres <= 0 || numOfOgres >= 6){
						throw new NumberOfOgresOutofBound();
					}
				}catch(NumberFormatException e){
					String msg = "You should set a valid Number of Ogres";
					JOptionPane.showMessageDialog(rootPane, msg);
					return;
				}catch(NumberOfOgresOutofBound e){
					String msg = "Number of Ogres should be greater than 0 and lesser than 6";
					JOptionPane.showMessageDialog(rootPane, msg);
					return;

				}
				gameConfig.setNumOfOgres(numOfOgres);
				gameConfig.setGuardIndex(guardIndex);

				gameFrame.getContentPane().removeAll();
				gameFrame.getContentPane().validate();
				gameFrame.getContentPane().add(gamePanel);
				
				setVisible(false);
				gamePanel.startGameCustomization(gameConfig);
				
			}
		});
		buttons.add(btnCustom);
		
		
		
		/*
		 * Cancel Button
		 */
		JButton btnCancel = new JButton("Cancel");
		btnCancel.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				setVisible(false);
				
			}
		});
		buttons.add(btnCancel);
	}
}
