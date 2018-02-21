import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;
import java.util.regex.Pattern;

public class Server {
    private int portNumber;
    private DatagramSocket socket;


    Server(int portNumber) throws SocketException {
        this.portNumber = portNumber;
        this.socket = new DatagramSocket(this.portNumber);

    }

    public static void main(String[] args) throws SocketException {
        int portNumber = parseInput(args);
        if(portNumber > 0){
            Server server = new Server(portNumber);
        }
        else{
            System.out.println("Usage: java Server <port_number>");
        }

    }

    private static int parseInput(String[] args){
        if (args.length != 1) {
            return -1;
        }

        int portNumber = -1;
        String possibleNumber = args[0];
        boolean isNumber = Pattern.matches("[0-9]+", possibleNumber);
        if(isNumber){
            portNumber = Integer.parseInt(possibleNumber);
        }

        return portNumber;

    }
}
