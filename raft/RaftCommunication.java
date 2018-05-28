package raft;

import raft.Raft.ServerState;
import raft.net.ssl.SSLChannel;

import java.net.InetSocketAddress;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.LinkedTransferQueue;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;

class RaftCommunication implements Runnable {
	Raft raft;
	SSLChannel channel;
	InetSocketAddress address;

	private RaftReader reader;
	private RaftWriter writer;
	LinkedTransferQueue<String> queue = new LinkedTransferQueue<>();

	Raft.ServerState state;

	// Volatile serverState
	Long nextIndex;
	Long matchIndex = 0L;

	RaftCommunication() {
		// Placeholder constructor
	}

	RaftCommunication(Raft raft, SSLChannel channel, InetSocketAddress address) {
		this.raft = raft;
		this.channel = channel;
		this.address = address;
		state = Raft.ServerState.INITIALIZING;

		this.reader = new RaftReader(this);
		this.writer = new RaftWriter(this);
	}

	public Raft getRaft() {
		return this.raft;
	}

	public SSLChannel getChannel(){
		return this.channel;
	}
	@Override
	public void run() {
		this.raft.pool.execute(this.reader);
		this.raft.pool.execute(this.writer);
	}

	public void stop() {
		// Shutdown server
	}

	public void receiveMessage(RaftCommunication anotherServer, String message) {
		//
	}

	public void sendMessage(RaftCommunication anotherServer, String message){
		anotherServer.getChannel().send(message);
	}
}
