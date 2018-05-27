package raft;

import raft.net.ssl.SSLChannel;

import java.io.Serializable;
import java.net.InetSocketAddress;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.atomic.AtomicReference;

public class Raft<T extends Serializable> { // Stuff is package-private because I hate getters/setters
	UUID ID = UUID.randomUUID();
	Integer port;
	ConcurrentHashMap<UUID, RaftServer> cluster = new ConcurrentHashMap<>();
	AtomicReference<ServerState> state = new AtomicReference<>(ServerState.INITIALIZING);
	ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newCachedThreadPool();
	
	UUID leaderID;

	enum ServerState {
		INITIALIZING, WAITING, RUNNING, TERMINATING;
	}
	enum ClusterState {
		INITIALIZING, RUNNING, TERMINATING;
	}

	//	Persistent state (save this to stable storage)
	Long currentTerm = 0L;
	UUID votedFor;
	RaftLog<T>[] log;

	//	Volatile state
	Long commitIndex = 0L;
	Long lastApplied = 0L;

	//	Leader state (this is in RaftServer now)
/*	Long[] nextIndex;
	Long[] matchIndex; */

	// TODO Create class (runnable) to redirect client requests (RaftForward? RaftRedirect?) Also create RPC for that (because why the hell not)

	public Raft(Integer port, InetSocketAddress cluster) {
		this.port = port;

		// Connect to known cluster
		{
			SSLChannel channel = new SSLChannel(cluster);
			if (channel.connect()) {
				this.executor.execute(new RaftDiscover(this, channel, true));
			} else {
				System.out.println("Connection failed!"); // DEBUG
				return; // Show better error message
			}
		}

		// Listen for new connections
		this.executor.execute(() -> {
			while (state.get() != ServerState.TERMINATING) {
				SSLChannel channel = new SSLChannel(port);
				if (channel.accept()) {
					executor.execute(new RaftDiscover(this, channel, false));
				}
			}
		});
	}

	public Raft(Integer port) {
		this.port = port;

		// Listen for new connections
		this.executor.execute(() -> {
			while (state.get() != ServerState.TERMINATING) {
				SSLChannel channel = new SSLChannel(port);
				if (channel.accept()) {
					executor.execute(new RaftDiscover(this, channel, false));
				}
			}
		});
	}

	public void run() {
		executor.execute(new RaftCore(this));
	}
	
	public boolean set(T var) {
		SSLChannel channel = connectToLeader();
		
		if(channel == null) {
			return false;
		}
		
		channel.send(RPC.callSet());
		
		String message = channel.receiveString();
		
		//TODO
		
		return message.equals(RPC.success());
	}
	
	private SSLChannel connectToLeader() {
		if(this.leaderID == null) {
			return null;
		}
		
		RaftServer leader = this.cluster.get(this.leaderID);
		
		if(leader == null) {
			return null;
		}
		
		SSLChannel channel = new SSLChannel(leader.address);
		
		if (!channel.connect()) {
			System.out.println("Connection failed!"); // DEBUG
			return null; // Show better error message
		}
		
		return channel;
	}
}
