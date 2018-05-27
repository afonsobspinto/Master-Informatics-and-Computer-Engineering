package raft;

import raft.net.ssl.SSLChannel;

import java.io.Serializable;
import java.net.InetSocketAddress;
import java.util.UUID;

class RaftServer<T extends Serializable> implements Runnable {
	private Raft raft;
	private SSLChannel channel;

	RaftServer(Raft raft, SSLChannel channel) {
		this.raft = raft;
		this.channel = channel;
	}

	@Override
	public void run() {
		String[] message = channel.receiveString().split("\n");
		
		switch(message[0]) {
		case RPC.setValueRPC:
			raft.pool.execute(new RaftRedirect<T>(raft, channel, message[1], RaftCommand.SET));
			break;
		case RPC.getValueRPC:
			raft.pool.execute(new RaftRedirect<T>(raft, channel, message[1], RaftCommand.GET));
			break;
		case RPC.deleteValueRPC:
			raft.pool.execute(new RaftRedirect<T>(raft, channel, message[1], RaftCommand.DELETE));
			break;
		case RPC.discoverNodesRPC:
			String[] address = message[1].split("/");
			UUID ID = UUID.fromString(address[0]);

			raft.lock.lock();
			channel.send(RPC.retDiscoverNodes(raft, ID));
			if (!raft.ID.equals(ID)) {
				// We use putIfAbsent because there may be a conflict of IDs with other servers, so we don't want to erase our probably correct information
				if (raft.cluster.putIfAbsent(ID, new RaftCommunication(raft, channel, channel.getRemoteAddress().getAddress().getHostAddress(), Integer.valueOf(address[1]))) == null) {
					System.out.println(new InetSocketAddress(channel.getRemoteAddress().getAddress().getHostAddress(), Integer.valueOf(address[1]))); // DEBUG
				}
			}
			raft.lock.unlock();
			break;
		}
	}
}
