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
	Short port;

	enum State { // Adjust this
		STARTING, RUNNING, STOPPING;
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

	//	Required variables
	//Set<InetSocketAddress> cluster = ConcurrentHashMap.newKeySet();
	ConcurrentHashMap<UUID, InetSocketAddress> cluster = new ConcurrentHashMap<>();
	AtomicReference<State> state = new AtomicReference<>(State.STARTING);
	ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newCachedThreadPool();


	public Raft(Short port, InetSocketAddress cluster) {
		this.port = port;

		// Connect to known cluster
		{
			SSLChannel channel = new SSLChannel(cluster);
			if (channel.connect()) {
				this.executor.execute(new RaftDiscover(this, channel, true));
			} else {
				return; // Maybe show error message
			}
		}

		// Listen for new connections
		this.executor.execute(() -> {
			while (state.get() != State.STOPPING) {
				SSLChannel channel = new SSLChannel(port);
				if (channel.accept()) {
					executor.execute(new RaftDiscover(this, channel, false));
				}
			}
		});
	}

	public Raft(Short port) {
		this.port = port;

		// Listen for new connections
		this.executor.execute(() -> {
			while (state.get() != State.STOPPING) {
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
