package Server.Channel;

import Server.Peer.Peer;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.InetAddress;

public class MC extends Channel {

    public MC(InetAddress address, int port, Peer peer) throws IOException {
        super(address, port, peer);
    }

}
