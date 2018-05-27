package raft;

import raft.net.ssl.SSLChannel;

import java.net.InetSocketAddress;

import java.util.Set;
import java.util.UUID;
import java.util.concurrent.locks.ReentrantLock;

class RaftDiscover implements Runnable {
	private Raft raft;
	private SSLChannel channel;
	private boolean explorer;
	private static ReentrantLock lock = new ReentrantLock(); // We probably need more locks

	RaftDiscover(Raft raft, SSLChannel channel, boolean explorer) {
		this.raft = raft;
		this.channel = channel;
		this.explorer = explorer;
	}

	@Override
	@SuppressWarnings("unchecked")
	public void run() {
		if (explorer) {
			channel.send(RPC.callDiscoverNodes(raft));

			String[] message = channel.receiveString().split("\n");
			String[] address = message[1].split("/");
			UUID ID = UUID.fromString(address[0]);

			if (!raft.ID.equals(ID)) {
				raft.cluster.put(ID, new RaftServer(raft, channel, channel.getRemoteAddress().getAddress().getHostAddress(), Integer.valueOf(address[1])));
				raft.executor.execute((RaftServer) raft.cluster.get(ID));
				System.out.println(new InetSocketAddress(channel.getRemoteAddress().getAddress().getHostAddress(), Integer.valueOf(address[1]))); // DEBUG
			} else {
				raft.ID = UUID.randomUUID();
				// We can clear everything and start as if the current connection is the one issued by the client (we assume that all servers in cluster are well behaved and have full information about each other)
				for (RaftServer server : (Set<RaftServer>) raft.cluster.values()) {
					server.stop();
				}
				raft.cluster.clear();
				raft.executor.execute(new RaftDiscover(this.raft, this.channel, true));
			}

			for (int n = 2; n < message.length; ++n) {
				address = message[n].split("[/:]");
				ID = UUID.fromString(address[0]);
				// If the other server detected same ID, it won't send us the list of known addresses, thus we only need to check above
				if (raft.cluster.putIfAbsent(ID, new RaftServer()) == null) {
					SSLChannel channel = new SSLChannel(new InetSocketAddress(address[1], Integer.valueOf(address[2])));
					if (channel.connect()) {
						raft.executor.execute(new RaftDiscover(this.raft, channel, true));
					} else {
						// It's important we allow other RaftDiscover instances to insert a value associated with this server, seeing as the reason why this connection failed may have been erroneous information by one of the servers
						// (servers have some inertia regarding updating information about each other after initialization, but we'll design something to fix that later, namely, a way to recognize new connections as maybe not new: distinguish between DiscoverNodesRPCs and other RPCs in explorer == false)
						raft.cluster.remove(ID);
						System.out.println("Connection failed!"); // DEBUG
					}
				}
			}
		} else {
			String[] message = channel.receiveString().split("\n");
			String[] address = message[1].split("/");
			UUID ID = UUID.fromString(address[0]);

			lock.lock();
			channel.send(RPC.retDiscoverNodes(raft, ID));
			if (!raft.ID.equals(ID)) {
				// We use putIfAbsent because there may be a conflict of IDs with other servers, so we don't want to erase our probably correct information
				if (raft.cluster.putIfAbsent(ID, new RaftServer(raft, channel, channel.getRemoteAddress().getAddress().getHostAddress(), Integer.valueOf(address[1]))) == null) {
					System.out.println(new InetSocketAddress(channel.getRemoteAddress().getAddress().getHostAddress(), Integer.valueOf(address[1]))); // DEBUG
				}
			}
			lock.unlock();
		}
	}
}
