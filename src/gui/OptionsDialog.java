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
import javax.swing.JSlider;
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
	
	private void SetUpGuardSettingsSection() {
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
	
	private void SetUpOgresSettingsSection() {
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

	
	private void SetUpButtonsSection(){
		JPanel buttons = new JPanel(); getContentPane().add(buttons);
		
		/*
		 * Start Button
		 */
		
		JButton btnStart = new JButton("Start"); btnStart.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) { parseInfo(); gamePanel.startNewGame(gameConfig, 1); setVisible(false); }});	
		buttons.add(btnStart);
	
		/*
		 * Custom Button
		 */
		JButton btnCustom = new JButton("Custom Map"); btnCustom.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) { parseInfo(); setUpMapSize(); setVisible(false); gamePanel.startGameCustomization(gameConfig);} });
		buttons.add(btnCustom);	
		
		/*
		 * Cancel Button
		 */
		JButton btnCancel = new JButton("Cancel"); btnCancel.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) { setVisible(false); } }); buttons.add(btnCancel); }
	
	
	private void setUpMapSize(){
		
		JPanel myPanel = new JPanel();
		
		JLabel lblWidth = new JLabel("Width");
		lblWidth.setHorizontalAlignment(SwingConstants.CENTER);
		
		JSlider widthSlider = new JSlider();
		widthSlider.setMaximum(15);
		widthSlider.setMinimum(7);
		widthSlider.setValue(10);
		widthSlider.setMinorTickSpacing(1);
		widthSlider.setMajorTickSpacing(2);
		widthSlider.setPaintTicks(true);
		widthSlider.setPaintLabels(true);
		widthSlider.setSnapToTicks(true);
		

		JLabel lblHeight = new JLabel("Height");
		lblHeight.setHorizontalAlignment(SwingConstants.CENTER);
		
		JSlider heightSlider = new JSlider();
		heightSlider.setMaximum(15);
		heightSlider.setMinimum(7);
		heightSlider.setValue(10);
		heightSlider.setMinorTickSpacing(1);
		heightSlider.setMajorTickSpacing(2);
		heightSlider.setPaintTicks(true);
		heightSlider.setPaintLabels(true);
		heightSlider.setSnapToTicks(true);
		
		myPanel.add(lblWidth);
		myPanel.add(widthSlider);
		myPanel.add(lblHeight);
		myPanel.add(heightSlider);
		
		
		JOptionPane.showConfirmDialog(null, myPanel, "Map Dimensions", JOptionPane.DEFAULT_OPTION);
		
		gameConfig.setColumns(widthSlider.getValue());
		gameConfig.setRows(heightSlider.getValue());

		
	}
	
	private void parseInfo(){
		
		int guardIndex = guardSelector.getSelectedIndex();
		int numOfOgres = 1;


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
	
	}
	
}
