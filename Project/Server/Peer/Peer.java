package Server.Peer;

import Server.Channel.Channel;
import Server.Channel.MC;
import Server.Channel.MDB;
import Server.Message.Message;
import Server.Peer.Subprotocols.*;
import Server.Peer.Utilities.Pair;

import java.io.IOException;
import java.math.BigInteger;
import java.net.InetAddress;
import java.nio.file.Path;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;


public class Peer implements PeerInterface {

    private Float protocolVersion;
    private Integer serverID;
    private Integer serverAccessPoint; //TODO: you should use as access point the name of the remote object providing the "testing" service.
    private InetAddress MC_IP, MDB_IP, MDR_IP;
    private Integer MCport, MDBport, MDRport;
    private Channel MC, MDB, MDR;
    private Backup backupProtocol;
    private Delete deleteProtocol;
    private Reclaim reclaimProtocol;
    private Restore restoreProtocol;
    private final static Long diskSpace = (long) (64 * new Double(Math.pow(10, 9)).intValue()); // 64GB ~ also the max size of a file available;
    private Long usedSpace = 0L;
    private static final String baseDir = "Storage/";

    /**
     * Chunk
     * Current replication degree
     */
    private ConcurrentHashMap<Pair<String,Integer>, Integer> chunksReplicationDegree = new ConcurrentHashMap<>();
    /**
     * Chunk
     * Desired replication degree
     */
    private ConcurrentHashMap<Pair<String,Integer>, Integer> storedChunks = new ConcurrentHashMap<>();


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

        subscribeChannels();
        subscribeSubProtocols();
    }

    private void subscribeSubProtocols() {
        backupProtocol = new Backup(this);
        deleteProtocol = new Delete(this);
        restoreProtocol = new Restore(this);
        reclaimProtocol = new Reclaim(this);
    }

    private void subscribeChannels() throws IOException {
        MC = new MC(MC_IP, MCport, this);
        MC.listen();
        MDB = new MDB(MDB_IP, MDBport, this);
        MDB.listen();
        MDR = new MDB(MDR_IP, MDRport,this);
        MDR.listen();
    }

    public float getProtocolVersion() {
        return protocolVersion;
    }

    public int getServerID() {
        return serverID;
    }

    public int getServerAccessPoint() {
        return serverAccessPoint;
    }

    @Override
    public void backup(String filepath, Integer replicationDegree) throws IOException, NoSuchAlgorithmException, IllegalAccessException {
        this.backupProtocol = new Backup(filepath, replicationDegree, this);
        this.backupProtocol.readChunks();
    }

    public void sendPutChunk(Message message) {
        this.backupProtocol.sendPutChunk(message);
    }
    public void sendStored(Message message) throws IllegalAccessException {
        this.backupProtocol.sendStored(message);
    }

    public void receivePutChunk(Message message) throws IOException, IllegalAccessException {
        this.backupProtocol.receivePutChunk(message);
    }

    public void receiveStored(Message message) {
        increaseReplicationDegree(new Pair<>(message.getFileID(), message.getChunKNo()));

    }

    @Override
    public void restore(String filepath) {

    }

    @Override
    public void delete(String filepath) {

    }

    @Override
    public void reclaim(Integer size) {

    }

    @Override
    public void state(String filepath) {

    }

    public Channel getMC() {
        return MC;
    }

    public Channel getMDB() {
        return MDB;
    }

    public Channel getMDR() {
        return MDR;
    }

    public Long getAvailableSpace() {
        return diskSpace-this.usedSpace;
    }

    public void addUsedSpace(Integer newFileSize) {
        this.usedSpace += newFileSize;
    }

    public synchronized Integer getCurrentReplicationDegree(Pair<String,Integer> key) {

        Integer value = chunksReplicationDegree.get(key);

        return value != null ? value : 0;
    }

    public synchronized void addChunkToStorage(Pair<String,Integer> key, Integer value) {
        this.storedChunks.putIfAbsent(key, value);
        increaseReplicationDegree(key);
    }

    private synchronized void increaseReplicationDegree(Pair<String,Integer> key){
        Integer currentReplicationDegree = chunksReplicationDegree.get(key);
        if(currentReplicationDegree == null){
            chunksReplicationDegree.put(key,1);
        }
        else{
            chunksReplicationDegree.put(key, ++currentReplicationDegree);
        }
    }

    public static String getBaseDir() {
        return baseDir;
    }

}
