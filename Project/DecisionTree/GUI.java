import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;

public class GUI {
    private JPanel panel1;
    private JButton viewTreeButton;
    private JButton classifyButton;
    private JButton showTrainingStatsButton;
    private JButton loadFileButton;
    private JLabel label1;
    static JFrame frame = new JFrame("GUI");
    final JFileChooser fc = new JFileChooser();

    public GUI() {
        loadFileButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                fc.showOpenDialog(panel1);
                File file = fc.getSelectedFile();
                System.out.println(file.getPath());

                loadFileButton.setText(file.getPath());

                frame.pack();
            }
        });

    }

    public static void main(String[] args) throws ClassNotFoundException, UnsupportedLookAndFeelException, InstantiationException, IllegalAccessException {
        UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());

        frame.setContentPane(new GUI().panel1);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);
    }
}
