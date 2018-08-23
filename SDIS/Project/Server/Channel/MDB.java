package Server.Channel;

import Server.Peer.Peer;

import java.io.IOException;
import java.net.InetAddress;

public class MDB extends Channel {
    public MDB(InetAddress address, int port, Peer peer) throws IOException {
        super(address, port, peer);
    }
}
