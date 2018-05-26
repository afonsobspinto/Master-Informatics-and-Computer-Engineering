package raft;

import raft.net.ssl.SSLChannel;

import java.net.InetSocketAddress;
import java.util.LinkedList;

class RaftDiscover implements Runnable {
	private Raft server;
	private SSLChannel channel;
	private boolean explorer;

	RaftDiscover(Raft server, SSLChannel channel, boolean explorer) {
		this.server = server;
		this.channel = channel;
		this.explorer = explorer;
	}

	/*
		RaftDiscover, explorer = true
		discover\n
		<port>\n

		RaftDiscover, explorer = false
		discover\n
		<address:port_1>\n
		<address:port_2>\n
		...
		<address:port_N>\n
	*/

	@Override
	@SuppressWarnings("unchecked")
	public void run() {
		if (explorer) {
			LinkedList<InetSocketAddress> cluster = new LinkedList<>();
			channel.send("discover\n".concat(server.port.toString()).concat("\n"));

			String[] message = channel.receive().split("\n");
		/*	if (!message[0].equals("discover")) {
				return;
			} */
			for (int n = 1; n < message.length; ++n) {
				String[] address = message[n].split(":");
				if (this.server.cluster.add(new InetSocketAddress(address[0], Integer.valueOf(address[1])))) {
					cluster.add(new InetSocketAddress(address[0], Integer.valueOf(address[1])));
				}
			}

			if (cluster.size() > 0) {
				for (InetSocketAddress address : cluster) {
					System.out.println(address); // DEBUG
					SSLChannel channel = new SSLChannel(address);
					if (channel.connect()) {
						server.executor.execute(new RaftDiscover(server, channel, true));
					}
				}
			}
		}
		else {
			String[] message_receive = channel.receive().split("\n");

			StringBuilder message_send = new StringBuilder("discover\n");
			Iterable<InetSocketAddress> cluster = server.cluster;
			for (InetSocketAddress address : cluster) {
				message_send.append(address.getHostString()).append(":").append(address.getPort()).append("\n");
			}
			channel.send(message_send.toString());

			InetSocketAddress address = new InetSocketAddress(channel.getRemoteAddress().getHostString(), Integer.valueOf(message_receive[1]));
			server.cluster.add(address);
			System.out.println(address); // DEBUG
		}
	}
}
