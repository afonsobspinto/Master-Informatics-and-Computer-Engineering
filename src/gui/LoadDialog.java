package gui;

import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.List;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JTextField;

public class LoadDialog extends JDialog {
	
	private GamePanel gamePanel;
	private List gamesList;
	
	/** Saved games folder path */
	private static final String savedGamesFolder = System.getProperty("user.dir") + "/Saved Games/";
	
	
	
public LoadDialog(GamePanel gamePanel) {
		
		this.gamePanel = gamePanel;
		
		setTitle("Load Game");
		this.setModalityType(JDialog.DEFAULT_MODALITY_TYPE);
		getContentPane().setLayout(new GridLayout(1,1));
		
		// Setting up dialog content
		SetUpLoadSection();
		
		pack();
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		
		this.setLocation((screenSize.width-this.getSize().width)/2, (screenSize.height-this.getSize().height)/2);
	
	}
	

private void SetUpLoadSection() {
	JLabel lblName = new JLabel("Load Game:");
	getContentPane().add(lblName);

	gamesList = new List();
	getContentPane().add(gamesList);

	JButton loadButton = new JButton("Load");
	getContentPane().add(loadButton);


	loadButton.addActionListener(new ActionListener() {
		public void actionPerformed(ActionEvent arg0) {
			System.out.println("I'm Here");
			setVisible(false);
		}
	});

}
}
