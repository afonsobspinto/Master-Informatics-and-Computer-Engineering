package raft;

import raft.net.ssl.SSLChannel;

import java.net.InetSocketAddress;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicBoolean;

class RaftCommunication implements Runnable { // Despite the name, this class actually models a connection with another server, and not the server itself, even though we keep track of some information regarding it
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

	public Raft getRaft() {
		return this.raft;
	}

	public SLLChannel getChannel(){
		return this.channel;
	}
	@Override
	public void run() {

	}

	public void stop() {
		// Shutdown server
	}

	public void receiveMessage(RaftCommunication anotherServer, String message){
		//
		if(anotherServer.getRaft().getLeaderID() != null){ // If Leader
			if(message == RFC.appendEntriesRPC)
				anotherServer.getChannel().send(RPC.retDiscoverNodes(anotherServer.getRaft(),
																	 anotherServer.getRaft().getState().getStateID()));

		}
		else if(){ // If Candidate

		}
		else{ // If Follower

		}

	public void sendMessage(RaftCommunication anotherServer, string message){
		anotherServer.getChannel().send(message);
	}
}
