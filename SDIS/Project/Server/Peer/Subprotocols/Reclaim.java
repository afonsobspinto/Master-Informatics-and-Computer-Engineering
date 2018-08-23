package Server.Peer.Subprotocols;

import Server.Message.Message;
import Server.Message.MessageType;
import Server.Peer.Peer;
import Server.Peer.Utilities.Pair;

import java.io.File;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Reclaim {
    private Peer peer;
    private Long sizeReclaimed;
    private Long sizeToReduce;
    private static final Integer maxRandomDelay = 400;


    public Reclaim(Peer peer) {
        this.peer = peer;
    }

    public Reclaim(Long size, Peer peer) {
        this.peer = peer;
        this.sizeReclaimed = size;
        this.sizeToReduce = size;

        System.out.println("New Reclaim Protocol Started");

    }

    public void reclaim() {
        Long availableSpace = peer.getAvailableSpace();
        if (availableSpace > sizeReclaimed) {
            peer.addUsedSpace(sizeReclaimed);
            System.out.println("Available Space Reduced From " + availableSpace + " To " + peer.getAvailableSpace());
            return;
        }

        Long totalDiskSpace = Peer.getDiskSpace();
        if (sizeReclaimed > totalDiskSpace) {
            sizeToReduce = totalDiskSpace;
        }

        sizeToReduce -= availableSpace;
        System.out.println("Storage Space To Be Deleted: " + sizeToReduce);
        peer.setUsedSpace(totalDiskSpace);

        deleteChunks();
    }

    private void deleteChunks() {

        for (Map.Entry<Pair<String, Integer>, Integer> entry : peer.getStoredChunks().entrySet()) {
            Pair<String, Integer> key = entry.getKey();

            int currentReplicationDegree = peer.getCurrentReplicationDegree(key);
            if (currentReplicationDegree > 1) {
                removeChunk(key);
            }
            if (sizeToReduce <= 0)
                return;
        }

        for (Map.Entry<Pair<String, Integer>, Integer> entry : peer.getStoredChunks().entrySet()) {
            removeChunk(entry.getKey());
            if (sizeToReduce <= 0)
                return;
        }

    }

    private void removeChunk(Pair<String, Integer> key) {
        String keyFileID = key.getLeft();
        Integer keyChunkNo = key.getRight();


        String path = Peer.getBaseStorageDir() + peer.getServerID() + "/" + keyFileID + "/" + keyChunkNo;
        File file = new File(path);
        int chunkSize = (int) file.length();
        System.out.println("Removing Chunk: " + file.getName() + " " + file.length());

        System.out.println("Deleting "+  file.getAbsolutePath());

        if(file.delete()){
            File parent = file.getParentFile();
            System.out.println("Chunk Deleted");
            if(parent.isDirectory()){
                if(Objects.requireNonNull(parent.list()).length==0){
                    if(parent.delete()){
                        System.out.println("Folder Deleted");
                    }
                }
            }

        }
        else{
            System.out.println("Couldn't Delete Chunk");
            return;
        }

        peer.decreaseReplicationDegree(key);
        peer.removeChunk(key);
        sendRemoveMessage(keyFileID, keyChunkNo);

        sizeToReduce -= chunkSize;
        System.out.println("Size To Reduce: " + sizeToReduce );

    }

    private void sendRemoveMessage(String keyFileID, Integer keyChunkNo) {
        try {
            System.out.println("Sending Remove Message");
            new Message(new String[]{MessageType.REMOVED.toString(), String.valueOf(peer.getProtocolVersion()), String.valueOf(peer.getServerID()), keyFileID, String.valueOf(keyChunkNo)}, this.peer).send(this.peer.getMC());
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }

    }

    public void updateReplicationDegree(Message message) {
        System.out.println("Received Remove Message");
        Pair<String,Integer> key = new Pair<>(message.getFileID(), message.getChunkNo());
        peer.decreaseReplicationDegree(key);

        if(peer.hasChunk(key)){
            int desiredReplicationDegree =  peer.getDesiredReplicationDegree(key);
            if(peer.getCurrentReplicationDegree(key) < desiredReplicationDegree){
                initiateBackupSubprotocol(key, desiredReplicationDegree);
            }
        }
    }

    private void initiateBackupSubprotocol(Pair<String,Integer> key, Integer desiredReplicationDegree){

        ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);

        peer.resetReceivedPutChunks(key);
        try {
            executor.awaitTermination((long) (Math.random() * maxRandomDelay), TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        if(!peer.hasReceivedPutChunks(key)){
            byte[] chunk = peer.getChunk(key);
            if(chunk!=null) {
                try {
                    new Backup(this.peer, key.getLeft(), desiredReplicationDegree).sendChunk(chunk, key.getRight());
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
