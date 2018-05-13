
import weka.classifiers.Evaluation;
import weka.classifiers.trees.J48;
import weka.core.Instances;
import weka.core.converters.ConverterUtils;
import weka.gui.treevisualizer.PlaceNode2;
import weka.gui.treevisualizer.TreeVisualizer;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.util.Random;

public class DecisionTree {
    private Instances dataset;
    private J48 tree = new J48();

    public DecisionTree(String filePath) {
        try {
            String[] options = {"-M", "4"};
            tree.setOptions(options);

            Random random = new Random(Double.doubleToLongBits(Math.random()));

            dataset = new ConverterUtils.DataSource(filePath).getDataSet();
            dataset.setClassIndex(dataset.numAttributes()-1);
            dataset.randomize(random);
        } catch (Exception e) {
            System.out.println("Couldn't load data set");
            e.printStackTrace();
        }
        loadTree();
        score();
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

    public static void main(String[] args) throws IOException{
        if (args.length == 1 && getFileExtension(args[0]).equals("arff")){
            if(parseInputs(args)){

                DecisionTree decisionTree = new DecisionTree(args[0]);
                decisionTree.displayTree();

                return;
            }
        }
        System.out.println("Usage: java DecisionTree <dataSetFilePath>");
    }

    private static boolean parseInputs(String[] args) {
        return new File(args[0]).exists();
    }

    private static String getFileExtension(String filepath) {
        String[] tokens = filepath.split("\\.");

        return tokens[tokens.length-1];
    }

    public void score(){
        Evaluation eval = null;
        try {
            eval = new Evaluation(dataset);
            eval.crossValidateModel(tree, dataset, 10, new Random(1));

        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println(eval.toSummaryString());

    }

}