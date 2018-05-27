package raft;

import raft.net.ssl.SSLChannel;

import java.io.*;
import java.net.InetSocketAddress;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.locks.ReentrantLock;

public class Raft<T extends Serializable> { // Stuff is package-private because I hate getters/setters
	UUID ID = UUID.randomUUID();
	Integer port;
	ConcurrentHashMap<UUID, RaftCommunication> cluster = new ConcurrentHashMap<>();
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

	// TODO we need more locks!!! (or maybe not)
	ReentrantLock lock = new ReentrantLock();

	// AtomicBoolean

	// TODO Create class (runnable) to redirect client requests (RaftForward? RaftRedirect?) Also create RPC for that (because why the hell not)

	public Raft(Integer port, InetSocketAddress cluster) {
		this.port = port;

		// Connect to known cluster
		{
			SSLChannel channel = new SSLChannel(cluster);
			if (channel.connect()) {
				this.executor.execute(new RaftDiscover(this, channel));
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
					executor.execute(new RaftServer(this, channel));
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
					executor.execute(new RaftServer(this, channel));
				}
			}
		});
	}

	public void run() {
		executor.execute(() -> {

		});
	}

	static <T extends Serializable> byte[] serialize(T variable) {
		try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
		     ObjectOutputStream oos = new ObjectOutputStream(baos)){
			oos.writeObject(variable);
			return baos.toByteArray();
		} catch (Exception e) {
		//  e.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	static <T extends Serializable> T deserialize(byte[] buffer) {
		try (ByteArrayInputStream bais = new ByteArrayInputStream(buffer);
		     ObjectInputStream ois = new ObjectInputStream(bais)) {
			return (T) ois.readObject();
		} catch (Exception e) {
		//  e.printStackTrace();
		}
		return null;
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
		
		RaftCommunication leader = this.cluster.get(this.leaderID);
		
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
