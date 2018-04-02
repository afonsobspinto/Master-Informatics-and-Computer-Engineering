package Server.Peer.Subprotocols;

import Server.Message.Message;
import Server.Message.MessageType;
import Server.Peer.Peer;
import Server.Peer.Utilities.Pair;

import java.io.*;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Backup {

    private Integer replicationDegree;
    private Peer peer;
    private String fileId = null;
    private File file;
    private static final Integer maxChunkSize = 64000;
    private static final Integer maxNumTries = 5;
    private static final Integer minSleepTime = 1000;
    private static final Integer maxRandomDelay = 400;


    public Backup(Peer peer) {
        this.peer = peer;
    }

    public Backup(String filepath, Integer replicationDegree, Peer peer) throws IOException, NoSuchAlgorithmException {
        this(peer);
        this.file = new File(filepath);
        this.fileId = generateFileId(file);
        this.replicationDegree = replicationDegree;
        System.out.println("New Backup Protocol Started");
    }


    public void readChunks() throws IOException, IllegalAccessException {

        FileInputStream inputStream;
        try {
            inputStream = new FileInputStream(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return;
        }

        int chunkNo = 0;
        int bytesRead;
        int lastBytesRead = 0;
        byte[] chunk = new byte[maxChunkSize];

        while ((bytesRead = inputStream.read(chunk)) != -1){
            sendChunk(chunk, chunkNo++);
            chunk = new byte[maxChunkSize];
            lastBytesRead = bytesRead;
        }

        inputStream.close();

        if(lastBytesRead==maxChunkSize){
            sendChunk(new byte[0], chunkNo);
        }

        System.out.println("Chucks Successfully Read");

    }

    private void sendChunk(byte[] chunk, int chunkNo) throws IllegalAccessException {
        new Message(new String[]{MessageType.PUTCHUNK.toString(), String.valueOf(peer.getProtocolVersion()), String.valueOf(peer.getServerID()), fileId, String.valueOf(chunkNo), String.valueOf(replicationDegree)}, chunk, this.peer).start();
    }

    public void sendPutChunk(Message message) {
        System.out.println("Sending PutChunk");

        int desiredReplicationDegree = message.getReplicationDegree();
        int attempts = 0;
        int sleepTime = minSleepTime;
        do {
            message.send(this.peer.getMDB());
            try {
                System.out.println("waiting");
                Thread.sleep((long) sleepTime * 2 ^ attempts);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }while (peer.getCurrentReplicationDegree(new Pair<>(message.getFileID(), message.getChunkNo())) < desiredReplicationDegree && attempts++ < maxNumTries);

        if(attempts >= maxNumTries){
            System.out.println("Desired replication degree not achieved");
        }
        else{
            System.out.println("Desired replication degree achieved");
        }

    }

    public void sendStored(Message message) throws IllegalAccessException {
        System.out.println("Sending Stored");
        try {
            Thread.sleep((long) (Math.random() * maxRandomDelay));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        new Message(new String[]{MessageType.STORED.toString(), String.valueOf(peer.getProtocolVersion()), String.valueOf(peer.getServerID()), message.getFileID(), String.valueOf(message.getChunkNo())}, this.peer).send(this.peer.getMC());
    }

    public void receivePutChunk(Message message) throws IOException, IllegalAccessException {
        System.out.println("Received PutChuck");

        Long availableSpace = peer.getAvailableSpace();
        Integer bodyLength = message.getBodySpace();
        if(availableSpace > bodyLength){
            FileOutputStream outputStream;
            String path = Peer.getBaseDir() + peer.getServerID() + "/" + message.getFileID() + "/" + message.getChunkNo();
            try {
                File targetFile = new File(path);
                File parent = targetFile.getParentFile();
                try {
                    if (!parent.exists() && !parent.mkdirs() && !targetFile.createNewFile()) {
                        throw new IllegalStateException("Couldn't create file: " + targetFile);
                    }
                }catch (IOException e){
                    e.printStackTrace();
                    return;
                }

                outputStream = new FileOutputStream(path);

            } catch (IOException e) {
                e.printStackTrace();
                return;
            }

            outputStream.write(message.getBody(), 0, bodyLength/8);
            peer.addUsedSpace(bodyLength);
            peer.addChunkToStorage(new Pair<>(message.getFileID(), message.getChunkNo()), message.getReplicationDegree());
            outputStream.close();
            System.out.println("Received PutChunk successfully");
            sendStored(message);
        }
        else {
            System.out.println("Not enough space");
        }
    }



    private String generateFileId(File file) throws IOException, NoSuchAlgorithmException {
        Path path = Paths.get(file.getPath());
        BasicFileAttributes attr = Files.readAttributes(path, BasicFileAttributes.class);
        String bitString = path.toString() + attr.creationTime() + attr.isRegularFile() + attr.isRegularFile();

        return hash(bitString);

    }

    private String hash(String bitString) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance( "SHA-256" );
        md.update( bitString.getBytes( StandardCharsets.UTF_8 ) );
        byte[] digest = md.digest();

        return String.format( "%064x", new BigInteger( 1, digest ) );

    }



}
