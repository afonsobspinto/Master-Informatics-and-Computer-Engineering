package raft;

import raft.net.ssl.SSLChannel;

import java.net.InetSocketAddress;

import java.util.Set;
import java.util.UUID;

class RaftDiscover implements Runnable {
	private Raft raft;
	private SSLChannel channel;

	RaftDiscover(Raft raft, SSLChannel channel) {
		this.raft = raft;
		this.channel = channel;
	}

	@Override
	@SuppressWarnings("unchecked")
	public void run() {
		channel.send(RPC.callDiscoverNodes(raft));

		String[] message = channel.receiveString().split("\n");
		String[] address = message[1].split("/");
		UUID ID = UUID.fromString(address[0]);

		if (!raft.ID.equals(ID)) {
			raft.cluster.put(ID, new RaftCommunication(raft, channel, new InetSocketAddress(channel.getRemoteAddress().getAddress().getHostAddress(), Integer.valueOf(address[1]))));
			raft.pool.execute((RaftCommunication) raft.cluster.get(ID));
			System.out.println(new InetSocketAddress(channel.getRemoteAddress().getAddress().getHostAddress(), Integer.valueOf(address[1]))); // DEBUG
		} else { // This should practically NEVER happen
			raft.ID = UUID.randomUUID();
			// We can clear everything and start as if the current connection is the one issued by the client (we assume that all servers in cluster are well behaved and have full information about each other)
			for (RaftCommunication server : (Set<RaftCommunication>) raft.cluster.values()) {
				server.stop();
			}
			raft.cluster.clear();
			raft.pool.execute(new RaftDiscover(this.raft, this.channel));
		}

		for (int n = 2; n < message.length; ++n) {
			address = message[n].split("[/:]");
			ID = UUID.fromString(address[0]);
			// If the other server detected same ID, it won't send us the list of known addresses, thus we only need to check above
			if (raft.cluster.putIfAbsent(ID, new RaftCommunication()) == null) {
				SSLChannel channel = new SSLChannel(new InetSocketAddress(address[1], Integer.valueOf(address[2])));
				if (channel.connect()) {
					raft.pool.execute(new RaftDiscover(this.raft, channel));
				} else {
					// It's important we allow other RaftDiscover instances to insert a value associated with this server, seeing as the reason why this connection failed may have been erroneous information by one of the servers
					// (servers have some inertia regarding updating information about each other after initialization, but we'll design something to fix that later, namely, a way to recognize new connections as maybe not new: distinguish between DiscoverNodesRPCs and other RPCs in explorer == false)
					raft.cluster.remove(ID);
					System.out.println("Connection failed!"); // DEBUG
				}
			}
		}
	}
}
