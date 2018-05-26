package raft;

import raft.net.ssl.SSLChannel;

import java.net.InetSocketAddress;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.atomic.AtomicReference;

public class Raft<T> {
	public enum State{
		STARTING, RUNNING, STOPPING;
	}

	private class Log {
		private T entry;
		private Long term = 0L;
	}

	//	Persistent state
	private Long currentTerm = 0L;
	//	private ID votedFor;
	private Log[] log;

	//	Volatile state
	private Long commitIndex = 0L;
	private Long lastApplied = 0L;

	//	Leader state
	private Long[] nextIndex;
	private Long[] matchIndex;

	//	Required variables
	Set<InetSocketAddress> cluster = ConcurrentHashMap.newKeySet();
	AtomicReference<State> state = new AtomicReference<>(State.STARTING);
	ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newCachedThreadPool();
	Integer port;

	public Raft(Integer port, InetSocketAddress cluster) {
		this.port = port;

		// Connect to known cluster
		this.cluster.add(cluster);
		{
			System.out.println(cluster); // DEBUG
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

	public Raft(Integer port) {
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
