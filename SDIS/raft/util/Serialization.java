package raft.util;

import java.io.*;
import java.util.Base64;

public class Serialization {
	public static <T extends Serializable> byte[] serialize(T variable) {
		try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
		     ObjectOutputStream oos = new ObjectOutputStream(baos)){
			oos.writeObject(variable);
			return Base64.getEncoder().encode(baos.toByteArray());
		} catch (Exception e) {
			//  e.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	public static <T extends Serializable> T deserialize(byte[] buffer) {
		try (ByteArrayInputStream bais = new ByteArrayInputStream(Base64.getDecoder().decode(buffer));
		     ObjectInputStream ois = new ObjectInputStream(bais)) {
			return (T) ois.readObject();
		} catch (Exception e) {
			//  e.printStackTrace();
		}
		return null;
	}
}
