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

    Client(String[] args) throws SocketException {
        parseInputs(args);
        socket = new DatagramSocket();

    }

    public void sendRequest() throws IOException {
        byte[] buffer = this.data.getBytes();
        InetAddress address = InetAddress.getByName(this.hostname);
        DatagramPacket sendPacket = new DatagramPacket(buffer, buffer.length, address, this.portNumber);
        socket.send(sendPacket);
    }

    //TODO: Make it crash when args are not correct
    private void parseInputs(String[] args){
        this.hostname = args[0];
        String possibleNumber = args[1];
        boolean isNumber = Pattern.matches("[0-9]+", possibleNumber);
        if(isNumber){
            this.portNumber = Integer.parseInt(possibleNumber);
        }
        this.data = args[2];

        String possiblePlateNumber = args[3];
        boolean isPlate = Pattern.matches("^(\\w{2}-?\\w{2}-?\\w{2})$", possiblePlateNumber);
        if(isPlate){
            this.data += possiblePlateNumber;
        }
        this.data += this.data.equals("register") ? args[4] : "";


    }

    public static void main(String[] args) throws SocketException {
        if (!(args.length == 4 || args.length == 5)) {
            System.out.println("Usage: java Echo <hostname> <port_number> <oper> <opnd>");
            return;
        }

        Client client = new Client(args);

    }
}
