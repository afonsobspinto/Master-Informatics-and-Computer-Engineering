package gui;

import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JDialog;
import javax.swing.JOptionPane;


public class OptionsInGameDialog extends JDialog {


	private static final long serialVersionUID = 1L;
	private JDialog saveOptions;
	
	public OptionsInGameDialog(JDialog saveOptions){

		setTitle("Pause Menu");
		this.setModalityType(JDialog.DEFAULT_MODALITY_TYPE);
		getContentPane().setLayout(new GridLayout(3, 1));
		this.saveOptions = saveOptions;
		
		// Setting up dialog content
		SetUpButtonsSection();
		
		pack();
		Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		
		this.setLocation((screenSize.width-this.getSize().width)/2, (screenSize.height-this.getSize().height)/2);
	}
	
	
	public void SetUpButtonsSection(){
		
		
		/*
		 * Resume Button
		 */
		
		JButton btnResume = new JButton("Resume"); btnResume.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) { setVisible(false); } }); getContentPane().add(btnResume);
		
		/*
		 * Save Button
		 */
		JButton btnSave = new JButton("Save"); btnSave.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) { setVisible(false); saveOptions.setVisible(true); setVisible(true); } });
		getContentPane().add(btnSave);
		
		/*
		 * Quit Button
		 */
		JButton btnQuit = new JButton("Quit");
		btnQuit.addActionListener(new ActionListener() { public void actionPerformed(ActionEvent arg0) {
				String msg = "Are you sure you want to Exit?"; int res = JOptionPane.showConfirmDialog(rootPane, msg);

				if (res == JOptionPane.YES_OPTION) System.exit(0); } });
		getContentPane().add(btnQuit);
	}
	
}
