package Server.Channel;

import java.io.IOException;
import java.net.InetAddress;

public class MDR extends Channel {
    public MDR(InetAddress address, int port) throws IOException {
        super(address, port);
    }
}
