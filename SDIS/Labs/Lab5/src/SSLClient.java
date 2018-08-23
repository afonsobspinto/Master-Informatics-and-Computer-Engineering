import java.util.HashMap;

public class SSLClient {
    private String hostname;
    private int portNumber;
    private String oper;
    String [] cypherSuite;

    SSLClient(String [] args) {
        this.hostname = args[0];
        int portNumber = Integer.parseInt(args[1]);
        oper = args[2];
        this.cypherSuite = new String[args.length-1];
    }

    public static void main(String[] args) {

        SSLClient SSLClient = new SSLClient(args);

    }
}
