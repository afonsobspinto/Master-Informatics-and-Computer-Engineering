package raft;

import raft.Raft.ServerState;
import raft.net.ssl.SSLChannel;

import java.net.InetSocketAddress;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicBoolean;

class RaftCommunication implements Runnable {
	private Raft raft;
	private SSLChannel channel;

	Raft.ServerState state;
	InetSocketAddress address;

	// Volatile serverState
	Long nextIndex;
	Long matchIndex = 0L;

	CompletableFuture<String> callRPC; // This is what I probably need
	AtomicBoolean callflag; // Combined with this (use this as atomic flag)
	CompletableFuture<String> retRPC;
	AtomicBoolean retflag;

	RaftCommunication() {
		// Placeholder constructor
	}

	RaftCommunication(Raft raft, SSLChannel channel, String addr, Integer port) {
		this.raft = raft;
		this.channel = channel;
		state = Raft.ServerState.INITIALIZING;
		address = new InetSocketAddress(addr, port);
		this.callRPC = new CompletableFuture<>();
		this.callflag = new AtomicBoolean(true);
		this.retRPC = new CompletableFuture<>();
		this.retflag = new AtomicBoolean(false);
	}

	@Override
	public void run() {
		while (raft.serverState.get() != ServerState.TERMINATING) {
		}
	}

	public void stop() {
		// Shutdown server
	}
}
