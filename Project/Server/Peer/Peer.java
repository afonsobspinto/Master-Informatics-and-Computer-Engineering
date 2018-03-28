package Server.Peer;

import Server.Channel.Channel;
import Server.Channel.MC;
import Server.Channel.MDB;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;


public class Peer {

    private float protocolVersion;
    private int serverID;
    private int serverAccessPoint;
    private InetAddress MC_IP, MDB_IP, MDR_IP;
    private int MCport, MDBport, MDRport;
    Channel MC, MDB, MDR;


    //  <protocolVersion> <serverID> <serverAccessPoint> <MC_IP> <MC_Port> <MDB_IP> <MDB_Port> <MDR_IP> <MDR_Port>
    public Peer(String[] args) throws IOException {
        protocolVersion = Float.parseFloat(args[0]);
        serverID = Integer.parseInt(args[1]);
        serverAccessPoint = Integer.parseInt(args[2]);
        MC_IP = InetAddress.getByName(args[3]);
        MCport = Integer.parseInt(args[4]);
        MDB_IP = InetAddress.getByName(args[5]);
        MDBport = Integer.parseInt(args[6]);
        MDR_IP = InetAddress.getByName(args[7]);
        MDRport = Integer.parseInt(args[8]);

        createChannels();
    }

    private void createChannels() throws IOException {
        MC = new MC(MC_IP, MCport);
        MDB = new MDB(MDB_IP, MDBport);
        MDR = new MDB(MDR_IP, MDRport);
    }

}
