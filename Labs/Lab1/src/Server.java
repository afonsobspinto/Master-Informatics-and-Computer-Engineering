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
        this.portNumber = Integer.parseInt(args[0]);
        this.socket = new DatagramSocket(this.portNumber);

    }

    public void receive() throws IOException {
        byte[] buffer = new byte[256];
        DatagramPacket receivePacket;

        receivePacket = new DatagramPacket(buffer, buffer.length);
        socket.receive(receivePacket);

        String received = new String(receivePacket.getData(), 0, receivePacket.getLength());
        System.out.println("Message received: " + received);

    }


    public static void main(String[] args) throws IOException {
        if (args.length == 1) {
            if (parseInputs(args)) {
                Server server = new Server(args);
                System.out.println("Started Server on port " + args[0]);
                while (true) {
                    server.receive();
                }
                //return;
            }
        }
        System.out.println("Usage: java Server <portNumber>");

    }

    private static boolean parseInputs(String[] args) {
        return Pattern.matches("[0-9]+", args[0]);
    }
}
