package Client;

import java.io.File;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Pattern;

public class TestApp {
    public static void main(String[] args) {
        if (args.length == 2 || args.length == 3 || args.length == 4){
            if(parseInputs(args)){
                System.out.println("Hello World");
                return;
            }
        }
        System.out.println("Usage: java TestApp <peer_ap> <sub_protocol> <opnd_1> <opnd_2>");
    }

    private static boolean parseInputs(String[] args) {
        Set<String> operationsAvailable = new HashSet<>(Arrays.asList("BACKUP", "RESTORE", "DELETE", "RECLAIM", "STATE"));
        boolean isNumberPeer = Pattern.matches("[0-9]+", args[0]);
        String oper = args[1].toUpperCase();
        boolean isValidOperation = operationsAvailable.contains(oper);
        if(args.length > 2){
            if(oper.equals("RECLAIM")) {
                boolean isNumberDiskSpace = Pattern.matches("[0-9]+", args[0]);
                return isNumberPeer && isValidOperation && isNumberDiskSpace;
            }
            boolean isValidFile = new File(args[2]).exists();
            if(oper.equals("BACKUP") && args.length > 3){
                boolean isNumberReplication = Pattern.matches("[0-9]+", args[3]);
                return isNumberPeer && isValidOperation && isValidFile && isNumberReplication;
            }
            return isNumberPeer && isValidOperation && isValidFile;
        }
        return isNumberPeer && isValidOperation;
    }
}
