import weka.classifiers.trees.J48;
import weka.gui.treevisualizer.PlaceNode2;
import weka.gui.treevisualizer.TreeVisualizer;

import java.awt.*;

public class DisplayTree {

    private J48 tree;

    DisplayTree(J48 tree){
        this.tree = tree;
        display();
    }

    public void display() {
        // display classifier
        final javax.swing.JFrame jf =
                new javax.swing.JFrame("Weka Classifier Tree Visualizer: J48");
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        int width = (int) (screenSize.getWidth() * 1.1);
        int height = (int) screenSize.getHeight();
        jf.setSize(width, height);
        jf.getContentPane().setLayout(new BorderLayout());
        jf.setExtendedState(Frame.MAXIMIZED_BOTH);
        TreeVisualizer tv;
        try {
            tv = new TreeVisualizer(null,
                    tree.graph(),
                    new PlaceNode2());
        } catch (Exception e) {
            System.out.println("Couldn't instantiate treeVisualizer");
            e.printStackTrace();
            return;
        }
        jf.getContentPane().add(tv, BorderLayout.CENTER);
        jf.addWindowListener(new java.awt.event.WindowAdapter() {
            public void windowClosing(java.awt.event.WindowEvent e) {
                jf.dispose();
            }
        });

        jf.setVisible(true);
        Font font = new Font("Trebuchet MS", Font.PLAIN, 9);
        tv.setFont(font);
        tv.fitToScreen();
    }
}
