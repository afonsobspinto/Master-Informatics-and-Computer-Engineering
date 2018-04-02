package Server.Peer.Subprotocols;

import Server.Message.Message;
import Server.Message.MessageType;
import Server.Peer.Peer;

import java.io.File;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;

import static Server.Peer.Utilities.Utilities.generateFileId;


public class Delete {
    private Peer peer;
    private String filepath;
    private String fileID;

    private static final Integer sleepTime = 1000;
    private static final Integer maxNumTries = 3;




    public Delete(Peer peer) {
        this.peer = peer;
    }

    public Delete(String filepath, Peer peer){
        this.peer = peer;
        this.filepath = filepath;
    }

    public void delete() {
        File file = new File(filepath);
        try {
            this.fileID = generateFileId(file);
        } catch (IOException | NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        int attempts = 0;
        do {
            try {
                System.out.println("Sending Delete Instruction");
                new Message(new String[]{MessageType.DELETE.toString(), String.valueOf(peer.getProtocolVersion()), String.valueOf(peer.getServerID()), this.fileID}, this.peer).send(this.peer.getMC());
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
            try {
                System.out.println("Waiting");
                Thread.sleep((long) sleepTime);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }while (attempts++ < maxNumTries);
    }


    public void deleteChunks(String fileID) {
        String folderPath = Peer.getBaseStorageDir() + peer.getServerID() + "/" + fileID;
        File file = new File(folderPath);
        if(file.exists()) {
            deleteFolder(new File(folderPath));
            peer.updateMaps(fileID);
            System.out.println("File Completely Deleted");
        }
        else {
            System.out.println("File Doesn't Exist");
        }

    }

    private void deleteFolder(File folder){
        File[] files = folder.listFiles();
        System.out.println(folder.getAbsolutePath());
        if(files!=null) {
            for(File f: files) {
                if(f.isDirectory()) {
                    deleteFolder(f);
                } else {
                    System.out.println("Deleting "+ f.getName() + "with " + f.length());
                    peer.removeUsedSpace((int) f.length());
                    f.delete();
                }
            }
        }
        folder.delete();
    }
}
