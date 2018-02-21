import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;
import java.util.HashMap;
import java.util.regex.Pattern;

public class Server {
    private HashMap<String, String> licensPlates;
    private int portNumber;
    private DatagramSocket socket;


    Server(String[] args) throws SocketException {
    	parseInputs(args);
    	System.out.println(this.portNumber);
        this.socket = new DatagramSocket(this.portNumber);

    }

    public void receive() throws IOException {
        byte[] buffer = new byte[256];
        DatagramPacket receivePacket;

        receivePacket = new DatagramPacket(buffer, buffer.length);
        socket.receive(receivePacket);

        String received = new String(receivePacket.getData());
        System.out.println("Echoed Message: " + received);

    }


    public static void main(String[] args) throws IOException {
        if(args.length == 1){
            Server server = new Server(args);
            while (true){
                server.receive();
            }
        }
        else{
            System.out.println("Usage: java Server <port_number>");
        }

    }

    private void parseInputs(String[] args){

        String possibleNumber = args[0];
        boolean isNumber = Pattern.matches("[0-9]+", possibleNumber);
        if(isNumber){
            this.portNumber = Integer.parseInt(possibleNumber);
        }

    }
}
