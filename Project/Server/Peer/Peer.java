package Server.Peer;

import Server.Channel.Channel;
import Server.Channel.MC;
import Server.Channel.MDB;
import Server.Message.Message;
import Server.Peer.Subprotocols.*;
import Server.Peer.Utilities.Pair;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.rmi.server.UnicastRemoteObject;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;


public class Peer extends UnicastRemoteObject implements PeerInterface {

    private Float protocolVersion;
    private Integer serverID;
    private String serverAccessPoint; //TODO: you should use as access point the name of the remote object providing the "testing" service.
    private InetAddress MC_IP, MDB_IP, MDR_IP;
    private Integer MCport, MDBport, MDRport;
    private Channel MC, MDB, MDR;
    private Backup backupProtocol;
    private Delete deleteProtocol;
    private Reclaim reclaimProtocol;
    private Restore restoreProtocol;
    private Long usedSpace = 0L;

    private final static Long diskSpace = (long) (64 * new Double(Math.pow(10, 9)));; // 64GB ~ also the max size of a file available;
    private final static String baseStorageDir = "Storage/";


    private final static String baseRestoreDir = "Restore/";


    /**
     * Chunk
     * List of Peers which stored ~ length = current replication degree
     */
    private ConcurrentHashMap<Pair<String,Integer>, HashSet<Integer>> chunksReplicationDegree = new ConcurrentHashMap<>();

    /**
     * Chunk
     * Desired replication degree
     */
    private ConcurrentHashMap<Pair<String,Integer>, Integer> storedChunks = new ConcurrentHashMap<>();

    /**
     * Chunk
     */

    private Set<Pair<String,Integer>> chunksBroadcasted = Collections.newSetFromMap(new ConcurrentHashMap<>());



    //  <protocolVersion> <serverID> <serverAccessPoint> <MC_IP> <MC_Port> <MDB_IP> <MDB_Port> <MDR_IP> <MDR_Port>
    public Peer(String[] args) throws IOException {
        protocolVersion = Float.parseFloat(args[0]);
        serverID = Integer.parseInt(args[1]);
        serverAccessPoint = args[2];
        MC_IP = InetAddress.getByName(args[3]);
        MCport = Integer.parseInt(args[4]);
        MDB_IP = InetAddress.getByName(args[5]);
        MDBport = Integer.parseInt(args[6]);
        MDR_IP = InetAddress.getByName(args[7]);
        MDRport = Integer.parseInt(args[8]);

        System.out.println("New Peer created...");

        subscribeChannels();
        subscribeSubProtocols();

        createStorage();


    }

    private void createStorage() {
        File baseDir = new File(getBaseStorageDir()+this.serverID);
        baseDir.mkdirs();
        System.out.println("Storage created");

    }

    private void subscribeSubProtocols() {
        backupProtocol = new Backup(this);
        deleteProtocol = new Delete(this);
        restoreProtocol = new Restore(this);
        reclaimProtocol = new Reclaim(this);

        System.out.println("Protocols Subscribed");

    }

    private void subscribeChannels() throws IOException {
        MC = new MC(MC_IP, MCport, this);
        MC.listen();
        MDB = new MDB(MDB_IP, MDBport, this);
        MDB.listen();
        MDR = new MDB(MDR_IP, MDRport,this);
        MDR.listen();
        System.out.println("Channels Subscribed");
    }

    public float getProtocolVersion() {
        return protocolVersion;
    }

    public int getServerID() {
        return serverID;
    }

    public String getServerAccessPoint() {
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

    public void receivePutChunk(Message message) throws IOException, IllegalAccessException {
        this.backupProtocol.receivePutChunk(message);
    }

    public void receiveStored(Message message) {
        System.out.println("Received Stored");
        increaseReplicationDegree(message.getSenderID(), new Pair<>(message.getFileID(), message.getChunkNo()));
        System.out.println("Received Stored Successfully");

    }


    @Override
    public void restore(String filepath) {
        restoreProtocol = new Restore(filepath, this);
        restoreProtocol.restore();

    }

    public void receiveGetChunk(Message message) {
        this.restoreProtocol.checkForChunk(message);
    }

    public void receiveChunk(Message message) {
        this.restoreProtocol.restoreChunk(message.getChunkNo(), message.getBody());
    }

    public void sendChunk(Message message) {
        this.restoreProtocol.sendChunk(message);
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

        Set<Integer> peers = chunksReplicationDegree.get(key);

        return peers != null ? peers.size() : 0;
    }

    public synchronized void addChunkToStorage(Pair<String,Integer> key, Integer value) {
        this.storedChunks.putIfAbsent(key, value);
        increaseReplicationDegree(this.serverID, key);
    }

    private synchronized void increaseReplicationDegree(Integer senderID, Pair<String,Integer> key){
        HashSet<Integer> peers = chunksReplicationDegree.get(key);
        if(peers==null) {
            peers = new HashSet<>();
        }
        peers.add(senderID);

        chunksReplicationDegree.put(key, peers);
    }

    public synchronized boolean hasChunk(Pair<String,Integer> key){
        return storedChunks.get(key) != null;
    }

    public boolean hasReceivedChunks(Pair<String,Integer> key) {
        return chunksBroadcasted.contains(key);
    }

    public byte[] getChunk(Pair<String,Integer> key){
        byte[] chunk = null;
        String path = Peer.getBaseStorageDir() + this.getServerID() + "/" + key.getLeft() + "/" + key.getRight();
        try {
            chunk = Files.readAllBytes(Paths.get(path));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return chunk;
    }

    public static String getBaseStorageDir() {
        return baseStorageDir;
    }


    public static String getBaseRestoreDir() {
        return baseRestoreDir;
    }



}
