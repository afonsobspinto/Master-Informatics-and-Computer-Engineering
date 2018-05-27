package raft;

import raft.net.ssl.SSLChannel;

public class RaftRedirect implements Runnable{ //this class is used by the leader when a client requests an action
	private Raft raft;
	private SSLChannel channel;
	
	public RaftRedirect(Raft raft, SSLChannel channel) {
		this.raft = raft;
		this.channel = channel;
	}

	@Override
	public void run() {
		String message = channel.receiveString();
		
		//TODO
	}
}
