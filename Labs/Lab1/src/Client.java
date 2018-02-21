import java.net.DatagramSocket;
import java.util.regex.Pattern;

public class Client {

    private String hostname;
    private int portNumber;
    private DatagramSocket socket;
    private String oper;
    private String plateNumber;
    private String ownerName;

    Client(String[] args){
        parseInputs(args);

    }

    //TODO: Make it crash when args are not correct
    private void parseInputs(String[] args){
        this.hostname = args[0];
        String possibleNumber = args[1];
        boolean isNumber = Pattern.matches("[0-9]+", possibleNumber);
        if(isNumber){
            this.portNumber = Integer.parseInt(possibleNumber);
        }
        this.oper = args[2];
        String possiblePlateNumber = args[3];
        boolean isPlate = Pattern.matches("^(\\w{2}-?\\w{2}-?\\w{2})$", possiblePlateNumber);
        if(isPlate){
            this.plateNumber = possiblePlateNumber;
        }
        this.ownerName = oper.equals("register") ? args[4] : null;

        System.out.println(this.hostname + this.portNumber + this.oper + this.plateNumber + this.ownerName);

    }

    public static void main(String[] args) {
        if (!(args.length == 4 || args.length == 5)) {
            System.out.println("Usage: java Echo <hostname> <port_number> <oper> <opnd>");
            return;
        }

        Client client = new Client(args);
    }
}
