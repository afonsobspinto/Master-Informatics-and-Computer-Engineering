package Server.Channel;

import java.io.IOException;
import java.net.InetAddress;

public class MC extends Channel {

    public MC(InetAddress address, int port) throws IOException {
        super(address, port);
    }
}
