
import weka.classifiers.Evaluation;
import weka.classifiers.trees.J48;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.core.Instances;
import weka.core.converters.ConverterUtils;
import weka.gui.treevisualizer.PlaceNode2;
import weka.gui.treevisualizer.TreeVisualizer;

import java.awt.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.Random;

public class DecisionTree {
    private Instances dataset;
    private J48 tree = new J48();

    DecisionTree(String filePath) {
        try {
            String[] options = {"-M", "4"};
            tree.setOptions(options);

            Random random = new Random(Double.doubleToLongBits(Math.random()));

            dataset = new ConverterUtils.DataSource(filePath).getDataSet();
            dataset.setClassIndex(dataset.numAttributes() - 1);
            dataset.randomize(random);
        } catch (Exception e) {
            System.out.println("Couldn't load data set");
            e.printStackTrace();
        }
        loadTree();
        classify(new double[]{99.3671875, 41.57220208, 1.547196967, 4.154106043, 27.55518395, 61.71901588, 2.20880796, 3.662680136}); //TODO: Delete this, make it come from gui
        classify("Project/DataSet/HTRU_2_unlabeled.arff"); //TODO: Add this feature to gui.
    }

    private void loadTree() {
        try {
            tree.buildClassifier(dataset);
            //System.out.println(tree.getCapabilities().toString());
            //System.out.println(tree.graph());
        } catch (Exception e) {
            System.out.println("Couldn't load tree");
            e.printStackTrace();
        }
    }

    public void displayTree() {
        // display classifier
        final javax.swing.JFrame jf =
                new javax.swing.JFrame("Weka Classifier Tree Visualizer: J48");
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        int width = (int) (screenSize.getWidth() * 1.1);
        int height = (int) screenSize.getHeight();
        jf.setSize(width, height);
        jf.getContentPane().setLayout(new BorderLayout());
        jf.setExtendedState(jf.MAXIMIZED_BOTH);
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

    public static void main(String[] args) {
        if (args.length == 1 && getFileExtension(args[0]).equals("arff")) {
            if (parseInputs(args)) {

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

        return tokens[tokens.length - 1];
    }

    public String score() {
        Evaluation eval = null;
        try {
            eval = new Evaluation(dataset);
            eval.crossValidateModel(tree, dataset, 10, new Random(1));

        } catch (Exception e) {
            e.printStackTrace();
        }

        assert eval != null;
        return eval.toSummaryString();

    }

    public void classify(double[] values) {
        int valuesSize = dataset.numAttributes() - 1;
        if (values.length != valuesSize)
            return;

        Instances unlabeled = new Instances(dataset, 0);
        unlabeled.setClassIndex(unlabeled.numAttributes() - 1);

        Instance newInstance = new DenseInstance(valuesSize);
        for (int i = 0; i < valuesSize; i++) {
            newInstance.setValue(i, values[i]);

        }
        unlabeled.add(newInstance);
        try {
            double[] fDistribution = tree.distributionForInstance(unlabeled.firstInstance());
            System.out.println(Arrays.toString(fDistribution)); //TODO: Change the output to explain
            // fDistribution[0] is the probability of being negative
            // fDistribution[1] is the probability of being positive
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void classify(String filePath) {
        try {
            Instances unlabeled = new Instances(
                    new BufferedReader(
                            new FileReader(filePath))); //TODO: Make CSV Compatible
            unlabeled.setClassIndex(unlabeled.numAttributes()-1);
            for (int i = 0; i < unlabeled.numInstances(); i++) {
                double clsLabel = tree.classifyInstance(unlabeled.instance(i));
                System.out.println(clsLabel); //TODO: Change the output to something prettier
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


    }


}