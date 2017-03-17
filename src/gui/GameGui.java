package gui;

import java.awt.EventQueue;

public class GameGui {

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					WindowBuilder window = new WindowBuilder();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

}
