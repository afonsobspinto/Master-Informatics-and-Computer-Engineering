package raft;

import raft.net.ssl.SSLChannel;

import java.net.InetSocketAddress;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.atomic.AtomicReference;

public class Raft<T> { // Stuff is package-private because I hate getters/setters
	UUID ID = UUID.randomUUID();
	Integer port;
	ConcurrentHashMap<UUID, RaftServer> cluster = new ConcurrentHashMap<>();
	AtomicReference<ServerState> state = new AtomicReference<>(ServerState.INITIALIZING);
	ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newCachedThreadPool();

	enum ServerState {
		INITIALIZING, PASSIVE, ACTIVE, TERMINATING;
	}
	enum ClusterState {
		INITIALIZING, RUNNING, TERMINATING;
	}

	//	Persistent state
	Long currentTerm = 0L;
	UUID votedFor;
	RaftLog<T>[] log;

	//	Volatile state
	Long commitIndex = 0L;
	Long lastApplied = 0L;

	//	Leader state
	Long[] nextIndex;
	Long[] matchIndex;

	public Raft(Integer port, InetSocketAddress cluster) {
		this.port = port;

		// Connect to known cluster
		{
			SSLChannel channel = new SSLChannel(cluster);
			if (channel.connect()) {
				this.executor.execute(new RaftDiscover(this, channel, true));
			} else {
				System.out.println("Connection failed!"); // DEBUG
				return; // Maybe show error message
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

	public void start() {

	}
}
