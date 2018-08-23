import javax.swing.*;

public class TrainingStats {
    private JPanel panel1;
    public JTextArea textArea1;

    public void setTextArea1(String text) {
        textArea1.append(text);
    }

    public JPanel getPanel1() {
        return panel1;
    }
}