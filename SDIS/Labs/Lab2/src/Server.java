package src;

import java.io.IOException;
import java.net.*;
import java.util.HashMap;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

public class Server {
    private final DatagramPacket advertisePacket;
    private final int srvcPort;
    private final int mcastPort;
    private final InetAddress mcastAddr;
    private final DatagramSocket socket;
    private HashMap<String, String> plateNumbers;
    private MulticastSocket mcastSocket;


    private Server(String[] args) throws IOException {
        this.srvcPort = Integer.parseInt(args[0]);
        this.mcastAddr = InetAddress.getByName(args[1]);
        this.mcastPort = Integer.parseInt(args[2]);
        byte[] buffer = Integer.toString(srvcPort).getBytes();
        this.advertisePacket = new DatagramPacket(buffer, buffer.length, mcastAddr, mcastPort);
        this.mcastSocket = new MulticastSocket(mcastPort);
        this.mcastSocket.setTimeToLive(1);
        this.socket = new DatagramSocket(srvcPort);

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

    private void advertise() throws IOException {
        this.mcastSocket.send(this.advertisePacket);
        System.out.println( "Multicast: " + this.mcastAddr + " " + this.mcastPort + " " + this.advertisePacket.getAddress() + " " + this.srvcPort);
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
        if (args.length == 3) {
            if (parseInputs(args)) {
                Server server = new Server(args);
                System.out.println("Started Server on port " + args[0]);
                new ScheduledThreadPoolExecutor(1).scheduleAtFixedRate(()->{
                    try {
                        server.advertise();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }, 0, 1, TimeUnit.SECONDS);

                while (true) {
                    server.receive();
                }
            }
        }
        System.out.println("Usage: java Server <srvc_port> <mcast_addr> <mcast_port>");

    }

    private static boolean parseInputs(String[] args) {
        return Pattern.matches("[0-9]+", args[0]) && Pattern.matches("[0-9]+", args[2]);
    }
}
