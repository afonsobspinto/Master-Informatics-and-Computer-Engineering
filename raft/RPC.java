package raft;

import java.net.InetSocketAddress;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

class RPC { // Remote Procedure Calls
	@SuppressWarnings("unchecked")
	static String callAppendEntries(Raft server) {
		StringBuilder message = new StringBuilder("AppendEntries\n")
				.append(server.currentTerm).append("\n")
				.append(server.ID).append("\n"); // TODO
		return message.toString();
	}
	@SuppressWarnings("unchecked")
	static String retAppendEntries() {
		return null;
	}

	@SuppressWarnings("unchecked")
	static String callRequestVote() {
		return null;
	}
	@SuppressWarnings("unchecked")
	static String retRequestVote() {
		return null;
	}

	@SuppressWarnings("unchecked")
	static String callDiscoverNodes(Raft server) {
		return "DiscoverNodes\n"
				.concat(server.ID.toString()).concat("/")
				.concat(server.port.toString()).concat("\n");
	}
	@SuppressWarnings("unchecked")
	static String retDiscoverNodes(Raft server) {
		StringBuilder message = new StringBuilder("DiscoverNodes\n")
				.append(server.ID).append("/")
				.append(server.port).append("\n");
		for (Map.Entry<UUID, InetSocketAddress> address : (Set<Map.Entry<UUID, InetSocketAddress>>) server.cluster.entrySet()) {
			message.append(address.getKey()).append("/")
			       .append(address.getValue().getAddress().getHostAddress()).append(":")
			       .append(address.getValue().getPort()).append("\n");
		}
		return message.toString();
	}
}
