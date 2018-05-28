package raft;

import raft.net.ssl.SSLChannel;
import raft.util.Serialization;

import java.io.*;
import java.net.InetSocketAddress;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

public class Raft<T extends Serializable> {
    enum ServerState {
        INITIALIZING, WAITING, RUNNING, TERMINATING;
    }
    enum ClusterState {
        INITIALIZING, RUNNING, TERMINATING;
    }

	AtomicReference<ServerState> serverState = new AtomicReference<>(ServerState.INITIALIZING);
//	AtomicReference<ClusterState> clusterState = new AtomicReference<>(ClusterState.INITIALIZING);

	UUID ID = UUID.randomUUID();
	Integer port;

	ConcurrentHashMap<UUID, RaftCommunication> cluster = new ConcurrentHashMap<>();
	ReentrantLock clusterLock = new ReentrantLock();
	AtomicReference<RaftState> state = new AtomicReference<>(RaftState.FOLLOWER);

	LinkedTransferQueue<RaftLog<T>> clientRequests = new LinkedTransferQueue<>();

	ThreadPoolExecutor pool = (ThreadPoolExecutor) Executors.newCachedThreadPool();
    private Timer timer = new Timer();
    TimerTask followerTimerTask;
	TimerTask candidateTimerTask;
	TimerTask leaderTimerTask;

	private TimerTask followerTimerTask() {
		return new TimerTask() {
			@Override
			public void run() {
				lock.lock();
				state.set(RaftState.CANDIDATE);
				currentTerm.getAndAdd(1);
				votedFor = ID;
				votes.set(1);
				condition.signal();
				lock.unlock();
			}
		};
	}
	private TimerTask candidateTimerTask() {
		return new TimerTask() {
			@Override
			public void run() {
				lock.lock();
				if (votes.get() > (cluster.size() + 1) / 2) {
					if (state.compareAndSet(RaftState.CANDIDATE, RaftState.LEADER)) {
						for (RaftCommunication node : cluster.values()) {
							node.nextIndex = log.size();
							node.matchIndex = 0;
						}
					}
				} else {
					currentTerm.getAndAdd(1);
					votes.set(1);
				}
				condition.signal();
				lock.unlock();
			}
		};
	}
	private TimerTask leaderTimerTask() {
		return new TimerTask() {
			@Override
			public void run() {
				lock.lock();
				condition.signal();
				lock.unlock();
			}
		};
	}

	private void followerTimeout() {
		timer.schedule(followerTimerTask = followerTimerTask(), ThreadLocalRandom.current().nextInt(RaftProtocol.maxElectionTimeout - RaftProtocol.minElectionTimeout) + RaftProtocol.minElectionTimeout);
	}
	private void candidateTimeout() {
		timer.schedule(candidateTimerTask = candidateTimerTask(), ThreadLocalRandom.current().nextInt(RaftProtocol.maxElectionTimeout - RaftProtocol.minElectionTimeout) + RaftProtocol.minElectionTimeout);
	}
	private void leaderTimeout() {
		timer.schedule(leaderTimerTask = leaderTimerTask(), RaftProtocol.HeartbeatPeriod);
	}

	//	Persistent state (save this to stable storage)
	AtomicInteger currentTerm = new AtomicInteger(0);
	UUID votedFor = null;
	AtomicInteger votes = new AtomicInteger(0);
	ArrayList<RaftLog<T>> log = new ArrayList<>();

	//	Volatile state
	UUID leaderID;
//	Integer prevLogIndex = 0;
//	Integer prevLogTerm = 0;
	Integer commitIndex = 0;
	Integer lastApplied = 0;

	AtomicBoolean synchronize = new AtomicBoolean(false);

	ReentrantLock lock = new ReentrantLock();
	Condition condition = lock.newCondition();

	/*
		Constructors
	 */

	public Raft(Integer port, InetSocketAddress cluster) {
		this.port = port;

		// Connect to known cluster
		{
			SSLChannel channel = new SSLChannel(cluster);
			if (channel.connect()) {
				this.pool.execute(new RaftDiscover(this, channel));
			} else {
				System.out.println("Connection failed!"); // DEBUG
				return; // Show better error message
			}
		}

		// Listen for new connections
		this.pool.execute(() -> {
			while (serverState.get() != ServerState.TERMINATING) {
				SSLChannel channel = new SSLChannel(port);
				if (channel.accept()) {
					pool.execute(new RaftServer<T>(this, channel));
				}
			}
		});
	}

	public Raft(Integer port) {
		this.port = port;

		// Listen for new connections
		this.pool.execute(() -> {
			while (serverState.get() != ServerState.TERMINATING) {
				SSLChannel channel = new SSLChannel(port);
				if (channel.accept()) {
					pool.execute(new RaftServer<T>(this, channel));
				}
			}
		});
	}

	/*
		Public methods
	 */

	public void run() {
		pool.execute(() -> {
			lock.lock();
			while (serverState.get() != ServerState.TERMINATING) {
				switch (state.get()) {
					case FOLLOWER:
						followerTimeout();
						condition.awaitUninterruptibly();
						break;
					case CANDIDATE:
						synchronize.set(true);
						for (RaftCommunication node : cluster.values()) {
							node.queue.put(RPC.requestVoteRPC);
						}
						synchronize.set(false);
						candidateTimeout();
						condition.awaitUninterruptibly();
						break;
					case LEADER:
						synchronize.set(true);
						for (RaftCommunication node : cluster.values()) {
							node.queue.put(RPC.appendEntriesRPC);
						}
						synchronize.set(false);
						leaderTimeout();
						condition.awaitUninterruptibly();
						RaftLog<T> request = null;
						try {
							request = clientRequests.poll();
						} catch (Exception e) {
							// e.printStackTrace();
						}
						if (request != null) {
							log.add(request);
						}
						break;
				}
			}
		});
	}

	public T get() {
		SSLChannel channel = connectToLeader();

		if(channel == null) {
			return null;
		}

		channel.send(RPC.callGetValue());

		String message = channel.receiveString();

		T obj = Serialization.deserialize(message.split("\n")[1].getBytes());

		return obj;
	}

	public boolean set(T var) {
		SSLChannel channel = connectToLeader();

		if(channel == null) {
			return false;
		}

		String serObj = new String(Serialization.serialize(var));

		channel.send(RPC.callSetValue(serObj));

		String message = channel.receiveString();

		return message.equals(RPC.retSetValue(true));
	}

	public boolean delete() {
		SSLChannel channel = connectToLeader();

		if(channel == null) {
			return false;
		}

		channel.send(RPC.callDeleteValue());

		String message = channel.receiveString();

		return message.equals(RPC.retDeleteValue(true));
	}

	/*
		Private methods
	 */

	SSLChannel connectToLeader() {
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

	T getValue() {
		return log.get((int) (commitIndex - 1)).entry;
	}

	boolean setValue(T object) {
		RaftLog<T> result = new RaftLog<>(object, currentTerm.get());
		clientRequests.put(result);
		return result.get();
	}

	boolean deleteValue() {
		RaftLog<T> result = new RaftLog<>(null, currentTerm.get());
		clientRequests.put(result);
		return result.get();
	}
}
