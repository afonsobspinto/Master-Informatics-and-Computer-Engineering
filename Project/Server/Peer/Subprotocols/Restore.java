package Server.Peer.Subprotocols;

import Server.Message.Message;
import Server.Message.MessageType;
import Server.Peer.Peer;
import Server.Peer.Utilities.Pair;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static Server.Peer.Utilities.Utilities.createFile;
import static Server.Peer.Utilities.Utilities.generateFileId;

public class Restore {
    private Peer peer;
    private String filepath;
    private String fileID;
    private Integer restoredChunks = 0;

    private static final Integer maxChunkSize = 64000;
    private static final Integer maxNumTries = 5;
    private static final Integer minSleepTime = 1000;
    private static final Integer maxRandomDelay = 400;




    /**
     * Integer is the chunk number
     * byte[] holds the chunk data
     */
    private Map<Integer, byte[]> chunks = new ConcurrentHashMap<>();

    public Restore(Peer peer)
    {
        this.peer = peer;
    }

    public Restore(String filepath, Peer peer)
    {
        this.filepath = filepath;
        this.peer = peer;
        System.out.print("\n\n\n\n\n");
        System.out.println("New Restore Protocol Started");

    }

    public void restore(){
        File file = new File(filepath);
        Integer totalChunks = (int) Math.floor(file.length() / maxChunkSize) + 1;
        try {
            this.fileID = generateFileId(file);
        } catch (IOException | NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        int chunkNo = 0;
        while (chunkNo < totalChunks){
            try {
                System.out.println("Requesting Chunk " + chunkNo);
                new Message(new String[]{MessageType.GETCHUNK.toString(), String.valueOf(peer.getProtocolVersion()), String.valueOf(peer.getServerID()), this.fileID, String.valueOf(chunkNo)}, this.peer).send(this.peer.getMC());
                chunkNo++;
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }

        int attempts = 0;
        do {
            try {
                System.out.println("waiting");
                Thread.sleep((long) minSleepTime * 2 ^ attempts);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }while (restoredChunks< totalChunks && attempts++ < maxNumTries);

        if(attempts >= maxNumTries){
            System.out.println("Couldn't Restore All Chunks");
            return;
        }
        else{
            System.out.println("All Chunks Restored");
        }

        restoreFile(file.getName());
    }


    private void restoreFile(String filename){
        String path = Peer.getBaseRestoreDir() + peer.getServerID() + "/" + filename;
        FileOutputStream outputStream = createFile(path);
        if(outputStream==null){
            return;
        }
        for(int chunkNo = 0; chunkNo < chunks.size(); chunkNo++){
            try {
                if(chunks.get(chunkNo)!=null){
                    System.out.println("Writing chunk " + chunkNo + chunks.get(chunkNo).length);
                }
                outputStream.write(chunks.get(chunkNo));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        try {
            outputStream.flush();
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("File Restored Under " + path);
    }

    public void restoreChunk(Integer chunkNo, byte[] chunk){
        if(chunks.get(chunkNo)==null){
            chunks.put(chunkNo, chunk);
            restoredChunks++;
            System.out.println("Restored Chunk " + chunkNo);
        }

    }

    public void checkForChunk(Message message) {
        System.out.println("Received GetChunk");
        Pair<String,Integer> key = new Pair<>(message.getFileID(), message.getChunkNo());
        if(peer.hasChunk(key)){
            try {
                Thread.sleep((long) (Math.random() * maxRandomDelay));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if(!peer.hasReceivedChunks(key)){
                byte[] chunk = peer.getChunk(key);
                if(chunk!=null) {
                    try {
                        new Message(new String[]{MessageType.CHUNK.toString(), String.valueOf(peer.getProtocolVersion()), String.valueOf(peer.getServerID()), message.getFileID(), String.valueOf(message.getChunkNo())}, chunk, this.peer).start();
                    } catch (IllegalAccessException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    public void sendChunk(Message message){
        System.out.println("Sending Chunk" + message.getChunkNo());
        message.send(this.peer.getMDR());

    }
}
