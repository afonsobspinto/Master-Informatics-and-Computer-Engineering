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
    static private String filePath;
    static JFrame frame = new JFrame("GUI");
    final JFileChooser fc = new JFileChooser();

    public GUI() {
        viewTreeButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if(getFileExtension(filePath).equals("arff")) {
                    DecisionTree decisionTree = new DecisionTree(filePath);
                    decisionTree.displayTree();
                }
            }
        });

        classifyButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                frame.setContentPane(new Classify().getPanel1());
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.pack();
                frame.setVisible(true);
            }
        });
        loadFileButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                fc.showOpenDialog(panel1);
                File file = fc.getSelectedFile();
                if(file.exists()) {
                    filePath = file.getPath();
                    loadFileButton.setText(filePath);
                }

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

    public JPanel getPanel1() {
        return panel1;
    }

    private static String getFileExtension(String filepath) {
        String[] tokens = filepath.split("\\.");

        return tokens[tokens.length-1];
    }
}
