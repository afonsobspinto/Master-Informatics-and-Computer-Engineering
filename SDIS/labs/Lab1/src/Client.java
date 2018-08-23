package src;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.util.regex.Pattern;

public class Client {

    private String hostname;
    private int portNumber;
    private DatagramSocket socket;
    private String data;
    private final static int SOCKET_TIMEOUT = 3000;

    private Client(String[] args) throws SocketException {
        this.hostname = args[0];
        this.portNumber = Integer.parseInt(args[1]);
        this.data = args[2].toUpperCase().equals("REGISTER") ? args[2] + " " + args[3] + " " + args[4] : args[2] + " " + args[3];
        socket = new DatagramSocket();

    }

    private void sendRequest() throws IOException {
        byte[] buffer = this.data.getBytes();
        InetAddress address = InetAddress.getByName(this.hostname);
        DatagramPacket sendPacket = new DatagramPacket(buffer, buffer.length, address, this.portNumber);
        socket.send(sendPacket);
        receive();
    }

    private void receive() throws IOException {
        byte[] buffer = new byte[256];
        DatagramPacket receivePacket;

        receivePacket = new DatagramPacket(buffer, buffer.length);
        this.socket.setSoTimeout(this.SOCKET_TIMEOUT);
        try {
            socket.receive(receivePacket);
        }catch (IOException e){
            sendRequest();
        }

        String received = new String(receivePacket.getData(), 0, receivePacket.getLength());
        System.out.println("Echoed Message: " + received);

    }



    public static void main(String[] args) throws IOException {
        if (args.length == 4 || args.length == 5) {
            if(parseInputs(args)){
                Client client = new Client(args);
                client.sendRequest();
                return;
            }

        }

        System.out.println("Usage: java Client <hostname> <portNumber> <oper> <opnd>");


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
