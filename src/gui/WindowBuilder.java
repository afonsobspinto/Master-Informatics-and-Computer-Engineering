package gui;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

import gameLogic.GameConfig;
import gameLogic.GameLogic;
import gameLogic.Level;

import javax.swing.JComboBox;
import javax.swing.JButton;
import javax.swing.JTextArea;
import java.awt.Font;
import java.awt.Color;
import javax.swing.JPanel;
import java.awt.SystemColor;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

public class WindowBuilder {

	private JFrame gameFrame;
	private GamePanel gamePanel;
	private JTextField txtInsertNumber;
	private JTextField textField;

	

	/**
	 * Create the application.
	 */
	public WindowBuilder() {
		gameFrame = new JFrame();
		gameFrame.setVisible(true);
		gameFrame.setResizable(false);
		gameFrame.setTitle("DungeonKeep");
		gameFrame.setBounds(100, 100, 450, 300);
		gameFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		gameFrame.getContentPane().setLayout(null);
		gamePanel = new GamePanel();
		
		setUpLabels();
		setUpButtons();
	}

	/**
	 * Initialize the Labels of the frame.
	 */
	private void setUpLabels() {

		
		JLabel lblHowManyOgres = new JLabel("How many Ogres? (1 / 2 / 3)");
		lblHowManyOgres.setBounds(24, 21, 147, 14);
		gameFrame.getContentPane().add(lblHowManyOgres);
		
		txtInsertNumber = new JTextField();
		txtInsertNumber.setBounds(181, 18, 31, 20);
		gameFrame.getContentPane().add(txtInsertNumber);
		txtInsertNumber.setColumns(10);
		
		JLabel lblGuardPersonality = new JLabel("Guard Personality?");
		lblGuardPersonality.setBounds(24, 57, 92, 14);
		gameFrame.getContentPane().add(lblGuardPersonality);
		
		JComboBox<String> comboBox = new JComboBox<String>();
		comboBox.setBounds(136, 54, 76, 20);
		comboBox.setEditable(true);
		comboBox.setMaximumRowCount(3);
		comboBox.setToolTipText(" ");
		comboBox.addItem("Rookie");
		comboBox.addItem("Drunken");
		comboBox.addItem("Suspicius");
		gameFrame.getContentPane().add(comboBox);
		
		
		JTextArea txtrGameStatus = new JTextArea();
		txtrGameStatus.setBackground(SystemColor.menu);
		txtrGameStatus.setBounds(24, 238, 231, 22);
		txtrGameStatus.setForeground(Color.BLACK);
		txtrGameStatus.setEditable(false);
		txtrGameStatus.setFont(new Font("Courier New", Font.PLAIN, 13));
		txtrGameStatus.setText("You can start a new game.");
		gameFrame.getContentPane().add(txtrGameStatus);
		
		textField = new JTextField();
		textField.setBounds(24, 89, 231, 138);
		gameFrame.getContentPane().add(textField);
		textField.setColumns(10);
	}
	
	private void setUpButtons() {
		JButton btnNewGame = new JButton("New gameFrame");
		btnNewGame.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				gamePanel.start();
			}
		});
		btnNewGame.setBounds(313, 34, 89, 23);
		gameFrame.getContentPane().add(btnNewGame);
		
		JButton btnExitGame = new JButton("Exit gameFrame");
		btnExitGame.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
			}
		});
		btnExitGame.setBounds(313, 219, 107, 23);
		gameFrame.getContentPane().add(btnExitGame);
		
		JButton btnUp = new JButton("Up");
		btnUp.setBounds(325, 88, 59, 23);
		btnUp.setEnabled(false);
		gameFrame.getContentPane().add(btnUp);
		
		JButton btnRight = new JButton("Right");
		btnRight.setBounds(361, 122, 59, 23);
		btnRight.setEnabled(false);
		gameFrame.getContentPane().add(btnRight);
		
		JButton btnDown = new JButton("Down");
		btnDown.setBounds(325, 156, 59, 23);
		btnDown.setEnabled(false);
		gameFrame.getContentPane().add(btnDown);
		
		JButton btnLeft = new JButton("Left");
		btnLeft.setBounds(292, 121, 59, 23);
		btnLeft.setEnabled(false);
		gameFrame.getContentPane().add(btnLeft);
	}

}
