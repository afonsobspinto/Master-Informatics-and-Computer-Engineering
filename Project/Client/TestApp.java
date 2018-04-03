package Client;

import Server.Peer.PeerInterface;

import java.io.File;
import java.io.IOException;
import java.rmi.Naming;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Pattern;

public class TestApp {
    private PeerInterface testingPeer;
    private String operation;
    private Long diskSpace = null;
    private String filename = null;
    private Integer replicationDegree = null;

    private TestApp(String[] args) {
        System.out.println("Starting TestApp");
        operation = args[1].toUpperCase();

        if(args.length > 2){
            if(operation.equals("RECLAIM")) {
                diskSpace = Long.valueOf(args[2]);
            }
            else {
                filename = args[2];
                System.out.println(filename);
                if (operation.equals("BACKUP")) {
                    replicationDegree = Integer.valueOf(args[3]);
                }
            }
        }
        try {
            testingPeer = (PeerInterface) Naming.lookup("rmi:" + args[0]);
        }catch (Exception e){
            System.out.println("Test app failed to start.\n"+e);
            System.out.println("Check if both server and register server are correctly running.\n");
            System.exit(0);
        }

    }

    private void test() throws IllegalAccessException, NoSuchAlgorithmException, IOException {
        switch (operation){
            case "BACKUP":
                System.out.println("Starting Backup of " + filename + " with desired replication degree of " + replicationDegree);
                testingPeer.backup(filename, replicationDegree);
                break;
            case "RESTORE":
                System.out.println("Starting RESTORE of " + filename);
                testingPeer.restore(filename);
                break;
            case "DELETE":
                System.out.println("Starting DELETE of " + filename);
                testingPeer.delete(filename);
                break;
            case "RECLAIM":
                System.out.println("Starting RECLAIM of " + diskSpace);
                testingPeer.reclaim(diskSpace);
                break;
            case "STATE":
                testingPeer.state(filename);
        }
    }

    public static void main(String[] args) throws IOException, IllegalAccessException, NoSuchAlgorithmException {
        if (args.length == 2 || args.length == 3 || args.length == 4){
            if(parseInputs(args)){
                new TestApp(args).test();
                return;
            }
        }
        System.out.println("Usage: java TestApp <peer_ap> <sub_protocol> <opnd_1> <opnd_2>");
    }

    private static boolean parseInputs(String[] args) {
        Set<String> operationsAvailable = new HashSet<>(Arrays.asList("BACKUP", "RESTORE", "DELETE", "RECLAIM", "STATE"));
        boolean isValidRMI = Pattern.matches("^//((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/.+$", args[0]);
        String oper = args[1].toUpperCase();
        boolean isValidOperation = operationsAvailable.contains(oper);
        if(args.length > 2){
            if(oper.equals("RECLAIM")) {
                boolean isNumberDiskSpace = Pattern.matches("[0-9]+", args[2]);
                return isValidRMI && isValidOperation && isNumberDiskSpace;
            }
            boolean isValidFile = new File(args[2]).exists();
            if(oper.equals("BACKUP") && args.length > 3){
                boolean isNumberReplication = Pattern.matches("[0-9]", args[3]);

                return isValidRMI && isValidOperation && isValidFile && isNumberReplication;
            }
            return isValidRMI && isValidOperation && isValidFile;
        }
        return isValidRMI && isValidOperation;
    }
}
