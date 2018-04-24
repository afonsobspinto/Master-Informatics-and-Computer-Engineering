
import weka.classifiers.trees.J48;
import weka.core.Instances;
import weka.core.converters.ConverterUtils;
import weka.filters.Filter;
import weka.filters.unsupervised.attribute.Normalize;
import weka.gui.treevisualizer.PlaceNode2;
import weka.gui.treevisualizer.TreeVisualizer;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.util.Random;

public class DecisionTree {
    private Instances dataset;
    private J48 tree = new J48();
    private Normalize filterNorm = new Normalize();

    public DecisionTree(String filePath) {

        try {
            //String[] options = {new String("-O")};
            //tree.setOptions(options);                 //TODO: Set tree options

            Random random = new Random(Double.doubleToLongBits(Math.random()));

            dataset = new ConverterUtils.DataSource(filePath).getDataSet();
            dataset.setClassIndex(dataset.numAttributes()-1);
            dataset.randomize(random);
            filterNorm.setInputFormat(dataset);
            dataset = Filter.useFilter(dataset, filterNorm);
        } catch (Exception e) {
            System.out.println("Couldn't load data set");
            e.printStackTrace();
        }
        loadTree();
    }

    private void loadTree() {
        try {
            tree.buildClassifier(dataset);
            System.out.println(tree.getCapabilities().toString());
            System.out.println(tree.graph());
        } catch (Exception e) {
            System.out.println("Couldn't load tree");
            e.printStackTrace();
        }
    }

    public void displayTree(){
        // display classifier
        final javax.swing.JFrame jf =
                new javax.swing.JFrame("Weka Classifier Tree Visualizer: J48");
        jf.setSize(500,400);
        jf.getContentPane().setLayout(new BorderLayout());
        TreeVisualizer tv = null;
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
        tv.fitToScreen();
    }
}
/*
//TODO:
Random Split + Cross Validation  / Random Split
Fit
Predict
Score
Graphviz
Tree Options
DataSet Formats

*/