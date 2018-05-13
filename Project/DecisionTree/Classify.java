import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Classify {
    private JPanel panel1;
    private JTextField textField1;
    private JTextField textField2;
    private JTextField textField3;
    private JTextField textField4;
    private JButton submitButton;

    public JPanel getPanel1() {
        return panel1;
    }

    public Classify() {
        submitButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                GUI.frame.setContentPane(new GUI().getPanel1());
                GUI.frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                GUI.frame.pack();
                GUI.frame.setVisible(true);

            }
        });
    }
}
