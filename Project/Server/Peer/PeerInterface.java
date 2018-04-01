package Server.Peer;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;

public interface PeerInterface {

    void backup (String filename, Integer replicationDegree) throws IOException, NoSuchAlgorithmException, IllegalAccessException;
    void restore (String filename);
    void delete (String filename);
    void reclaim (Integer size);
    void state (String filename);

}
