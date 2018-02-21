import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;
import java.util.regex.Pattern;

public class Server {
    private int portNumber;
    private DatagramSocket socket;


    Server(String[] args) throws SocketException {
    	parseInputs(args);
    	System.out.println(this.portNumber);
        this.socket = new DatagramSocket(this.portNumber);

    }

    public static void main(String[] args) throws SocketException {
    	if (args.length != 1) {
    		System.out.println("Usage: java Server <port_number>");
    		return;
        }
        Server server = new Server(args);

    }

    private void parseInputs(String[] args){

        String possibleNumber = args[0];
        boolean isNumber = Pattern.matches("[0-9]+", possibleNumber);
        if(isNumber){
            this.portNumber = Integer.parseInt(possibleNumber);
        }

    }
}
 
