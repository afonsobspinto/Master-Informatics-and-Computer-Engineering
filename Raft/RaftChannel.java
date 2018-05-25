package dbs.raft;

import dbs.net.ssl.SSLChannel;

class RaftChannel implements Runnable {
	private Raft server;
	private SSLChannel channel;

	public RaftChannel(Raft server, SSLChannel channel) {
		this.server = server;
		this.channel = channel;
	}

	// new ObjectOutputStream(new DataOutputStream());

	@Override
	public void run() {
		while (server.running()) {
			String message = channel.receive();
		}
	}
}
