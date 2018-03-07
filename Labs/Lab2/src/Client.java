package src;

import sun.security.x509.IPAddressName;

import java.io.IOException;
import java.net.*;
import java.util.regex.Pattern;

public class Client {

    private DatagramSocket socket;
    private MulticastSocket mcastSocket;
    private String data;
    private InetAddress srvcAddress;
    private int srvcPort;
    private final static int SOCKET_TIMEOUT = 3000;

    private Client(String[] args) throws IOException {
        InetAddress mcastAddress = InetAddress.getByName(args[0]);
        int mcastPort = Integer.parseInt(args[1]);
        this.data = args[2].toUpperCase().equals("REGISTER") ? args[2] + " " + args[3] + " " + args[4] : args[2] + " " + args[3];
        this.socket = new DatagramSocket();
        this.mcastSocket = new MulticastSocket(mcastPort);
        this.mcastSocket.joinGroup(mcastAddress);

    }

    private void sendRequest() throws IOException {
        byte[] buffer = this.data.getBytes();
        DatagramPacket sendPacket = new DatagramPacket(buffer, buffer.length, this.srvcAddress, this.srvcPort);
        socket.send(sendPacket);
        receive();
    }

    private void receive() throws IOException {
        byte[] buffer = new byte[256];
        DatagramPacket receivePacket;

        receivePacket = new DatagramPacket(buffer, buffer.length);
        this.socket.setSoTimeout(SOCKET_TIMEOUT);
        try {
            socket.receive(receivePacket);
        }catch (IOException e){
            sendRequest();
        }

        String received = new String(receivePacket.getData(), 0, receivePacket.getLength());
        System.out.println("Echoed Message: " + received);

    }

    private void getServerInfo() throws IOException {
        byte[] buffer = new byte[256];
        DatagramPacket multicastPacket = new DatagramPacket(buffer, buffer.length);
        System.out.println("Asking for server info.");
        this.mcastSocket.receive(multicastPacket);
        this.srvcAddress = multicastPacket.getAddress();
        String receivedMulticast = new String(multicastPacket.getData(), 0, multicastPacket.getLength()).trim();
        this.srvcPort = Integer.parseInt(receivedMulticast);
        System.out.println("Response: "+ receivedMulticast);
    }



    public static void main(String[] args) throws IOException {
        if (args.length == 4 || args.length == 5) {
            if(parseInputs(args)){
                Client client = new Client(args);
                client.getServerInfo();
                client.sendRequest();
                return;
            }

        }

        System.out.println("Usage: java Client <mcast_addr> <mcast_port> <oper> <opnd> *");

    }

    private static boolean parseInputs(String[] args){
        boolean isNumber = Pattern.matches("[0-9]+", args[1]);
        boolean isPlate = Pattern.matches("^(\\w{2}-?\\w{2}-?\\w{2})$", args[3]);
        String oper = args[2].toUpperCase();
        boolean isValidOper = oper.equals("REGISTER") || oper.equals("LOOKUP");
        boolean isValidOpnd = true;
        if(oper.equals("REGISTER")){
             if(args.length<5){
                 isValidOpnd = false;
             }
        }
        return isNumber && isPlate && isValidOper && isValidOpnd;

    }
}
