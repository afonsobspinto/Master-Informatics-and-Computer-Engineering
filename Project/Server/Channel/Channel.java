package Server.Channel;

import java.io.IOException;
import java.net.InetAddress;
import java.net.MulticastSocket;

public abstract class Channel {
    protected MulticastSocket mcastSocket;

    Channel(InetAddress address, int port) throws IOException {
        this.mcastSocket = new MulticastSocket(port);
        this.mcastSocket.joinGroup(address);
    }

}
