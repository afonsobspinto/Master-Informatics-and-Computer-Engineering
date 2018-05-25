package dbs.raft;

import dbs.net.ssl.SSLChannel;

import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.atomic.AtomicBoolean;

public class Raft<T> {
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
	private AtomicBoolean running;
	private ThreadPoolExecutor executor;

	public Raft(int port) {
		this.running = new AtomicBoolean(true);
		this.executor = (ThreadPoolExecutor) Executors.newCachedThreadPool();
		this.executor.execute(() -> {
			while (running.get()) {
				SSLChannel channel = new SSLChannel(port).accept();
				if (channel != null) {
					executor.execute(new RaftChannel(this, channel));
				}
			}
		});
	}

	public boolean running() {
		return running.get();
	}
}
