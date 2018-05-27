package raft;

import raft.net.ssl.SSLChannel;

import java.net.InetSocketAddress;
import java.util.*;
import java.util.concurrent.locks.ReentrantLock;

class RaftDiscover implements Runnable {
	private Raft server;
	private SSLChannel channel;
	private boolean explorer;
	private static ReentrantLock lock = new ReentrantLock();

	RaftDiscover(Raft server, SSLChannel channel, boolean explorer) {
		this.server = server;
		this.channel = channel;
		this.explorer = explorer;
	}

	/*
		RaftDiscover, explorer = true
		DiscoverNodes\n
		<UUID/port>\n

		RaftDiscover, explorer = false
		DiscoverNodes\n
		<UUID/port>\n
		<UUID/address:port 1>\n
		<UUID/address:port 2>\n
		...
		<UUID/address:port N>\n
	*/

	@Override
	@SuppressWarnings("unchecked")
	public void run() {
		if (explorer) {
			channel.send(RPC.callDiscoverNodes(server));

			String[] message = channel.receive().split("\n");

			String[] node = message[1].split("/");
			UUID ID = UUID.fromString(node[0]);
			if (!server.ID.equals(ID)) { // Do something if same ID; (generate new ID and resend discover to other nodes)
				if (server.cluster.putIfAbsent(ID, new InetSocketAddress(channel.getRemoteAddress().getAddress().getHostAddress(), Integer.valueOf(node[1]))) == null) {
					System.out.println(new InetSocketAddress(channel.getRemoteAddress().getAddress().getHostAddress(), Integer.valueOf(node[1]))); // DEBUG
				}
			}
			for (int n = 2; n < message.length; ++n) {
				node = message[n].split("[/:]");
				ID = UUID.fromString(node[0]);
				if (!server.cluster.containsKey(ID) && !server.ID.equals(ID)) {
					SSLChannel channel = new SSLChannel(new InetSocketAddress(node[1], Integer.valueOf(node[2])));
					if (channel.connect()) {
						server.executor.execute(new RaftDiscover(server, channel, true));
					}
				}
			}
		} else {
			String[] message = channel.receive().split("\n");

			lock.lock();
			channel.send(RPC.retDiscoverNodes(server));

			String[] node = message[1].split("/");
			UUID ID = UUID.fromString(node[0]);
			if (!server.ID.equals(ID)) {
				if (server.cluster.putIfAbsent(ID, new InetSocketAddress(channel.getRemoteAddress().getAddress().getHostAddress(), Integer.valueOf(node[1]))) == null) {
					System.out.println(new InetSocketAddress(channel.getRemoteAddress().getAddress().getHostAddress(), Integer.valueOf(node[1]))); // DEBUG
				}
			}
			lock.unlock();
		}
	}
}
