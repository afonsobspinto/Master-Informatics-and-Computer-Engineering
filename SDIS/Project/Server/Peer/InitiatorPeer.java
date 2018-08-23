package Server.Peer;

import java.rmi.Naming;
import java.util.regex.Pattern;

public class InitiatorPeer {

    private InitiatorPeer(String[] args) {
        System.out.println("Initializing Peer...");
        try {
            Naming.rebind(args[2], new Peer(args));
        }catch (Exception e){
            System.out.println("Error occurred on peer initialization.\n"+e.toString());
        }

    }

    public static void main(String[] args) {
        if (args.length == 9){
            if(parseInputs(args)){
                new InitiatorPeer(args);
                return;
            }
        }
        System.out.println("Usage: java InitiatorPeer <protocolVersion> <serverID> <serverAccessPoint> <MC_IP> <MC_Port> <MDB_IP> <MDB_Port> <MDR_IP> <MDR_Port>");
    }

    private static boolean parseInputs(String[] args) {
        return Pattern.matches("[0-9]+((\\.)[0-9])?", args[0]) && isNumber(args[1])
                && Pattern.matches("^//((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/.+$", args[2])
                && isIP4Address(args[3]) && isNumber(args[4]) && isIP4Address(args[5]) && isNumber(args[6]) && isIP4Address(args[7]) && isNumber(args[8]);
    }

    private static boolean isNumber(String arg){
        return Pattern.matches("[0-9]+", arg);
    }

    private static boolean isIP4Address(String arg){
        return Pattern.matches("^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$", arg);
    }


}
