package src;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.util.HashMap;
import java.util.regex.Pattern;

public class Server {
    private HashMap<String, String> plateNumbers;
    private DatagramSocket socket;


    private Server(String[] args) throws SocketException {
        int portNumber = Integer.parseInt(args[0]);
        this.socket = new DatagramSocket(portNumber);
        this.plateNumbers = new HashMap<>();
    }

    private void receive() throws IOException {
        byte[] buffer = new byte[256];
        DatagramPacket receivePacket;

        receivePacket = new DatagramPacket(buffer, buffer.length);
        this.socket.receive(receivePacket);

        InetAddress receiveAddress = receivePacket.getAddress();
        int receivePort = receivePacket.getPort();
        String request = new String(receivePacket.getData(), 0, receivePacket.getLength());
        System.out.println("Received Request: " + request);

        sendReply(request, receiveAddress, receivePort);
    }

    private void sendReply(String request, InetAddress address, int port) throws IOException {
        String reply = handleRequest(request);
        byte[] buffer = reply.getBytes();
        DatagramPacket replyPacket = new DatagramPacket(buffer, reply.length(), address, port);
        this.socket.send(replyPacket);
        System.out.println("Replied: " + reply);

    }

    private String handleRequest(String request){
        String[] requestArray = request.trim().split(" ");

        if(requestArray.length > 0) {
            switch (requestArray[0].toUpperCase()) {
                case "REGISTER":
                    if (requestArray.length > 2) {
                        return register(requestArray[1], requestArray[2]);
                    }
                case "LOOKUP":
                    if (requestArray.length > 1) {
                        return lookup(requestArray[1]);
                    }
                default:
                    return "Invalid Request";
            }
        }

        return "Invalid Request";
    }

    private String register(String plateNumber, String ownerName){
        int result = -1;
        if(this.plateNumbers.putIfAbsent(plateNumber, ownerName)==null){
            result = this.plateNumbers.size();
        }
        return Integer.toString(result);
    }
    private String lookup(String plateNumber){
        String ownerName = this.plateNumbers.get(plateNumber);

        if(ownerName!=null){
            return plateNumber + " " + ownerName;
        }

        return  "Plate not registered";
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
