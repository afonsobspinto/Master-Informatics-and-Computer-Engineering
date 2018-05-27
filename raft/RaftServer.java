package raft;

import raft.net.ssl.SSLChannel;

import java.net.InetSocketAddress;

class RaftServer implements Runnable { // Despite the name, this class actually models a connection with another server, and not the server itself, even though we keep track of some information regarding it
	private Raft raft;
	private SSLChannel channel;
	Raft.ServerState state;
	InetSocketAddress address;

	RaftServer() {
		// Placeholder constructor
	}

	RaftServer(Raft raft, SSLChannel channel, String addr, Integer port) {
		this.raft = raft;
		this.channel = channel;
		state = Raft.ServerState.INITIALIZING;
		address = new InetSocketAddress(addr, port);
	}

	@Override
	public void run() {

	}

	public void stop() {
		// Shutdown server
	}
}
