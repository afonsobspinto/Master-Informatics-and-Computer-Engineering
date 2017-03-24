package gui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;

import javax.sound.midi.Patch;
import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.SwingConstants;

public class SaveDialog extends JDialog {


	private static final long serialVersionUID = 1L;
	private JTextField saveName;
	private GamePanel gamePanel;

	/** Saved games folder path */
	private static final String savedGamesFolder = System
			.getProperty("user.dir") + "/Saved Games/";
	
	public SaveDialog(GamePanel gamePanel) {
		
		this.gamePanel = gamePanel;
		
		setTitle("Save Game");
		this.setModalityType(JDialog.DEFAULT_MODALITY_TYPE);
		getContentPane().setLayout(new GridLayout(1,1));
		
		// Setting up dialog content
		SetUpSaveSection();
		
		pack();
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		
		this.setLocation((screenSize.width-this.getSize().width)/2, (screenSize.height-this.getSize().height)/2);
	
	}
	
	
	private void SetUpSaveSection() {

		JLabel lblName = new JLabel("Name:");
		getContentPane().add(lblName);

		saveName = new JTextField();
		getContentPane().add(saveName);
		saveName.setColumns(10);

		JButton saveButton = new JButton("Save");
		getContentPane().add(saveButton);
		
		
		saveButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				saveGame();
				setVisible(false);
			}
		});
	}
	
	private void saveGame(){

		if (saveName.getText().length() != 0) { 


			File savesFolder = new File(savedGamesFolder);
			if (!savesFolder.exists()){
				savesFolder.mkdir();
			}

			ObjectOutputStream os = null;
			try {
				os = new ObjectOutputStream(new FileOutputStream(savedGamesFolder + saveName.getText()));
				os.writeObject(gamePanel.getGame());
				os.close();
			
			} catch (IOException e) {
				e.printStackTrace();
			}

			setVisible(false);
		}
	}
}
