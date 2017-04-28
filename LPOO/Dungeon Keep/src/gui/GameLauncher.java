package gui;


import java.awt.EventQueue;

public class GameLauncher {

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					new GameFrame();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
				);
	}
}
