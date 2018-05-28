package raft;

import java.io.Serializable;

import raft.net.ssl.SSLChannel;
import raft.util.Serialization;

public class RaftRedirect<T extends Serializable> implements Runnable{ //this class is used by the leader when a client requests an action
	private Raft<T> raft;
	private SSLChannel channel;
	private String obj;
	private RaftCommand command;
	
	public RaftRedirect(Raft<T> raft, SSLChannel channel, String obj, RaftCommand command) {
		this.raft = raft;
		this.channel = channel;
		this.obj = obj;
		this.command = command;
	}

	@Override
	public void run() {
		T object;
		
		switch(command) {
		case GET:
			object = raft.getValue();
			byte[] obj_bytes = Serialization.serialize(object);

			channel.send(RPC.retGetValue(new String(obj_bytes)));
			break;
		case SET:
			object = Serialization.deserialize(obj.getBytes());
			channel.send(RPC.retSetValue(raft.setValue(object)));
			break;
		case DELETE:
			channel.send(RPC.retDeleteValue(raft.deleteValue()));
			break;
		}
	}
}
