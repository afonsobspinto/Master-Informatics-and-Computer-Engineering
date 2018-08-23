package Server.Channel;

import Server.Peer.Peer;

import java.io.IOException;
import java.net.InetAddress;

public class MDR extends Channel {
    public MDR(InetAddress address, int port, Peer peer) throws IOException {
        super(address, port, peer);
    }
}
