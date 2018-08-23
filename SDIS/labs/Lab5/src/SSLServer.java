import java.util.HashMap;

public class SSLServer {

    private HashMap<String, String> plateNumbers;
    /*is a sequence, possibly empty, of strings specifying the combination of cryptographic algorithms the server should use, in order of preference. If no cypher suite is specified, the server shall use any of the cypher-suites negotiated by default by the SSL provider of JSE.*/
    String [] cypherSuite;

    SSLServer(String [] args) {
        int portNumber = Integer.parseInt(args[0]);
        this.plateNumbers = new HashMap<>();
        this.cypherSuite = new String[args.length-1];
    }

    public static void main(String[] args) {

        SSLServer SSLServer = new SSLServer(args);

    }
}
