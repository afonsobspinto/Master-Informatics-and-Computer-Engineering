package raft;

import java.io.IOException;
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

	private class ServerSocketListener implements Runnable {
		@Override
		public void run() {
			while (running.get()) {
				try {
					executor.execute(new SocketCommunicator(socket.accept()));
				} catch (IOException e) {
					//
				}
			}
		}
	}

	private class SocketCommunicator implements Runnable {
		private Socket socket;

		private SocketCommunicator(Socket socket) {
			this.socket = socket;
		}

		@Override
		public void run() {

		}
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
	private ServerSocket socket; // Maybe move this to the Listener class
	private AtomicBoolean running;
	private ThreadPoolExecutor executor;

	public Raft(int port) throws IOException {
		this.socket = new ServerSocket(port);
		this.running = new AtomicBoolean(true);
		this.executor = (ThreadPoolExecutor) Executors.newCachedThreadPool();
	}

	public Raft() throws IOException {
		this(0);
	}

}
