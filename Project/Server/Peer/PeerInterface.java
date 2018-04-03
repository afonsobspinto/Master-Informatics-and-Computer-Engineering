package Server.Peer;

import java.io.IOException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.security.NoSuchAlgorithmException;

public interface PeerInterface extends Remote {

    void backup (String filename, Integer replicationDegree) throws IOException, NoSuchAlgorithmException, IllegalAccessException, RemoteException;
    void restore (String filename) throws RemoteException;
    void delete (String filename) throws RemoteException;
    void reclaim (Long size) throws  RemoteException;
    void state (String filename) throws RemoteException;

}
