import javafx.util.Pair;

import javax.swing.*;
import java.io.File;
import java.util.ArrayList;

public class Classify {
    private JPanel panel1;
    private JTextField ip_mean;
    private JTextField ip_sd;
    private JTextField ip_ek;
    private JTextField ip_s;
    private JButton submitValues;
    private JTextField dm_mean;
    private JTextField dm_sd;
    private JTextField dm_ek;
    private JTextField dm_s;
    private JButton browseFileButton;
    private JButton submitFile;
    private final JFileChooser fc = new JFileChooser();
    private String filePath;
    public JPanel getPanel1() {
        return panel1;
    }

    public Classify() {
        submitValues.addActionListener(e -> {
            ClassifyData classifyData = new ClassifyData(Double.parseDouble(ip_mean.getText()), Double.parseDouble(ip_sd.getText()),
                    Double.parseDouble(ip_ek.getText()), Double.parseDouble(ip_s.getText()),
                    Double.parseDouble(dm_mean.getText()), Double.parseDouble(dm_sd.getText()),
                    Double.parseDouble(dm_ek.getText()), Double.parseDouble(dm_s.getText()));

            if(GUI.getFilePath() != null && GUI.getFileExtension(GUI.getFilePath()).equals("arff")) {
                DecisionTree decisionTree = new DecisionTree(GUI.getFilePath());
                double[] results = decisionTree.classify(classifyData);
                GUI.classisfyFrame.dispose();
                JOptionPane.showMessageDialog(GUI.frame, "Probability of being negative = " + results[0] * 100 + "%\nProbability of being positive = " + results[1] * 100 + "%", "Classify By Values: " + "Results", JOptionPane.INFORMATION_MESSAGE);
            }
        });

        browseFileButton.addActionListener(e -> {
            fc.showOpenDialog(panel1);
            File file = fc.getSelectedFile();
            if(file != null && file.exists()) {
                filePath = file.getPath();
                browseFileButton.setText(filePath);
            }

            GUI.classisfyFrame.pack();
        });

        submitFile.addActionListener(e -> {
            if (filePath != null && GUI.getFilePath() != null && GUI.getFileExtension(GUI.getFilePath()).equals("arff")) {
                DecisionTree decisionTree = new DecisionTree(GUI.getFilePath());
                ArrayList<Pair<Double, Double>> arrayList = decisionTree.classify(filePath);

                StringBuilder response = new StringBuilder();

                for (int i = 0; i < arrayList.size(); i++) {
                    response.append("[").append(i).append("]\n");
                    response.append("Probability of being negative = ").append(arrayList.get(i).getKey() * 100).append("%\nProbability of being positive = ").append(arrayList.get(i).getValue() * 100).append("%\n\n");
                }

                GUI.classisfyFrame.dispose();
                JOptionPane.showMessageDialog(GUI.frame, response.toString(), "Classify By File: " + "Results", JOptionPane.INFORMATION_MESSAGE);
            }
        });
    }
}
