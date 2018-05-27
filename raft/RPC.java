package raft;

import java.util.Map;
import java.util.Set;
import java.util.UUID;

class RPC { // Remote Procedure Calls
	@SuppressWarnings("unchecked")
	static String callAppendEntries(Raft server) {
		StringBuilder message = new StringBuilder("AppendEntriesRPC\n")
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

/*
	callDiscoverNodes, for RaftDiscover with explorer = true
	DiscoverNodes\n
	<UUID/port>\n

	retDiscoverNodes, for RaftDiscover with explorer = false
	DiscoverNodes\n
	<UUID/port>\n
	<UUID/address:port 1>\n
	<UUID/address:port 2>\n
	...
	<UUID/address:port N>\n
*/
	@SuppressWarnings("unchecked")
	static String callDiscoverNodes(Raft server) {
		return "DiscoverNodesRPC\n"
				.concat(server.ID.toString()).concat("/")
				.concat(server.port.toString()).concat("\n");
	}
	@SuppressWarnings("unchecked")
	static String retDiscoverNodes(Raft server, UUID ID) {
		StringBuilder message = new StringBuilder("DiscoverNodesRPC\n")
				.append(server.ID).append("/")
				.append(server.port).append("\n");
		if (!server.ID.equals(ID)) {
			for (Map.Entry<UUID, RaftCommunication> data : (Set<Map.Entry<UUID, RaftCommunication>>) server.cluster.entrySet()) {
				message.append(data.getKey()).append("/")
				       .append(data.getValue().address.getAddress().getHostAddress()).append(":")
				       .append(data.getValue().address.getPort()).append("\n");
			}
		}
		return message.toString();
	}
	
	@SuppressWarnings("unchecked")
	static String callSet() {
		return null;
	}
	
	@SuppressWarnings("unchecked")
	static String failure() {
		return "false";
	}
	
	@SuppressWarnings("unchecked")
	static String success() {
		return "true";
	}
}
