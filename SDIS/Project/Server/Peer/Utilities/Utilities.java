package Server.Peer.Utilities;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Utilities {
    public static String generateFileId(File file) throws IOException, NoSuchAlgorithmException {
        Path path = Paths.get(file.getPath());
        BasicFileAttributes attr = Files.readAttributes(path, BasicFileAttributes.class);
        String bitString = path.toString() + attr.creationTime() + attr.isRegularFile() + attr.isRegularFile();

        return hash(bitString);

    }

    private static String hash(String bitString) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance( "SHA-256" );
        md.update( bitString.getBytes( StandardCharsets.UTF_8 ) );
        byte[] digest = md.digest();

        return String.format( "%064x", new BigInteger( 1, digest ) );

    }

    public static FileOutputStream createFile(String path){
        try {
            File targetFile = new File(path);
            File parent = targetFile.getParentFile();
            try {
                if (!parent.exists() && !parent.mkdirs() && !targetFile.createNewFile()) {
                    throw new IllegalStateException("Couldn't create file: " + targetFile);
                }
            }catch (IOException e){
                e.printStackTrace();
                return null;
            }

            return new FileOutputStream(path);

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}
