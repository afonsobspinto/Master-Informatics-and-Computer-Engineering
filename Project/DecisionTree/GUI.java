import javax.swing.*;
import java.io.File;

public class GUI {
    private JPanel panel1;
    private JButton viewTreeButton;
    private JButton classifyButton;
    private JButton showTrainingStatsButton;
    private JButton loadFileButton;
    static private String filePath;
    static JFrame frame = new JFrame("GUI");
    private static JFrame tsFrame = new JFrame("Training Stats");
    static JFrame classisfyFrame = new JFrame("Classify");
    private final JFileChooser fc = new JFileChooser();

    public GUI() {
        viewTreeButton.addActionListener(e -> {

            if(filePath != null && getFileExtension(filePath).equals("arff")) {
                DecisionTree decisionTree = new DecisionTree(filePath);
                decisionTree.displayTree();
            }
        });

        classifyButton.addActionListener(e -> {
            if(filePath != null && getFileExtension(filePath).equals("arff")) {
                classisfyFrame.setContentPane(new Classify().getPanel1());
                classisfyFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
                classisfyFrame.pack();
                classisfyFrame.setVisible(true);
            }
        });

        loadFileButton.addActionListener(e -> {
            fc.showOpenDialog(panel1);
            File file = fc.getSelectedFile();
            if(file != null && file.exists()) {
                filePath = file.getPath();
                loadFileButton.setText(filePath);
            }

            frame.pack();
        });

        this.showTrainingStatsButton.addActionListener(e -> {

            if(filePath != null && getFileExtension(filePath).equals("arff")) {
                TrainingStats trainingStats = new TrainingStats();
                tsFrame.setContentPane(trainingStats.getPanel1());
                tsFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
                DecisionTree decisionTree = new DecisionTree(filePath);
                String stats = decisionTree.score();

                trainingStats.setTextArea1(stats);
                tsFrame.pack();
                tsFrame.setVisible(true);
            }
        });

    }

    public static void main(String[] args) throws ClassNotFoundException, UnsupportedLookAndFeelException, InstantiationException, IllegalAccessException {
        UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());

        GUI gui = new GUI();
        frame.setContentPane(gui.panel1);
        frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);
    }

    public static String getFilePath() {
        return filePath;
    }

    static String getFileExtension(String filepath) {
        String[] tokens = filepath.split("\\.");

        return tokens[tokens.length-1];
    }
}
