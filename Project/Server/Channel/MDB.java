package Server.Channel;

import java.io.IOException;
import java.net.InetAddress;

public class MDB extends Channel {
    public MDB(InetAddress address, int port) throws IOException {
        super(address, port);
    }
}
