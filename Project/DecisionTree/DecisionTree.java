
import javafx.util.Pair;
import weka.classifiers.Evaluation;
import weka.classifiers.meta.FilteredClassifier;
import weka.classifiers.trees.J48;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.core.Instances;
import weka.core.converters.ConverterUtils;
import weka.filters.Filter;
import weka.gui.treevisualizer.PlaceNode2;
import weka.gui.treevisualizer.TreeVisualizer;
import weka.filters.supervised.instance.ClassBalancer;

import java.awt.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Random;

public class DecisionTree {
    private Instances dataset;
    private J48 tree = new J48();
    private static String[] treeOptions = {"-M", "4"};
    private ClassBalancer cb = new ClassBalancer();
    private FilteredClassifier filteredClassifier = new FilteredClassifier();

    DecisionTree(String filePath) {
        try {
            dataset = new ConverterUtils.DataSource(filePath).getDataSet();
            dataset.setClassIndex(dataset.numAttributes() - 1);

            cb = new ClassBalancer();
            cb.setInputFormat(dataset);
            Random random = new Random(Double.doubleToLongBits(Math.random()));
            dataset.randomize(random);

        } catch (Exception e) {
            System.out.println("Couldn't load data set");
            e.printStackTrace();
        }
        loadTree();
        System.out.println(score());
    }

    private void loadTree() {
        try {
            tree.setOptions(treeOptions);
            filteredClassifier.setFilter(cb);
            filteredClassifier.setClassifier(tree);
            filteredClassifier.buildClassifier(dataset);
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
            eval.crossValidateModel(filteredClassifier, dataset, 10, new Random(1));
        } catch (Exception e) {
            e.printStackTrace();
        }

        assert eval != null;
        return eval.toSummaryString();

    }

    public double[] classify(ClassifyData classifyData) {
        double[] values = classifyData.getValues();

        int valuesSize = dataset.numAttributes() - 1;
        if (values.length != valuesSize)
            return values;

        Instances unlabeled = new Instances(dataset, 0);
        unlabeled.setClassIndex(unlabeled.numAttributes() - 1);

        Instance newInstance = new DenseInstance(valuesSize);
        for (int i = 0; i < valuesSize; i++) {
            newInstance.setValue(i, values[i]);

        }
        unlabeled.add(newInstance);
        try {
            return filteredClassifier.distributionForInstance(unlabeled.firstInstance());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new double[]{0.0,0.0};
    }

    public ArrayList<Pair<Double, Double>> classify(String filePath) {
        ArrayList<Pair<Double, Double>> ret = new ArrayList<>();

        try {
            Instances unlabeled = new Instances(
                    new BufferedReader(
                            new FileReader(filePath)));
            unlabeled.setClassIndex(unlabeled.numAttributes()-1);
            for (int i = 0; i < unlabeled.numInstances(); i++) {
                double[] clsLabel = filteredClassifier.distributionForInstance(unlabeled.instance(i));
                Pair<Double,Double> pair;
                pair = new Pair<>(clsLabel[0], clsLabel[1]);
                ret.add(pair);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


        return ret;
    }


}