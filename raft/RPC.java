package raft;

import java.util.Map;
import java.util.Set;
import java.util.UUID;

class RPC { // Remote Procedure Calls
	static final String appendEntriesRPC = "AppendEntriesRPC";
	static final String discoverNodesRPC = "DiscoverNodesRPC";
	static final String setValueRPC = "SetValueRPC";
	static final String getValueRPC = "GetValueRPC";
	static final String deleteValueRPC = "DeleteValueRPC";
	static final String requestVoteRPC = "RequestVoteRPC";

	@SuppressWarnings("unchecked")
	static String callAppendEntries(Raft server) {
		StringBuilder message = new StringBuilder(appendEntriesRPC).append("\n")
				.append(server.currentTerm.get()).append("\n")
				.append(server.ID.toString()).append("\n")
				.append(server.log.size() - 1).append("\n")
				.append(((RaftLog) server.log.get(server.log.size() - 1)).term).append("\n")
				.append(server.leaderID.toString()); //TODO
		return message.toString();
	}
	
	@SuppressWarnings("unchecked")
	static String retAppendEntries(Raft server, boolean success) {
		StringBuilder message = new StringBuilder(appendEntriesRPC).append("\n")
				.append(server.currentTerm.get()).append("\n")
				.append(success).append("\n");
		return message.toString();
	}

	@SuppressWarnings("unchecked")
	static String callRequestVote(Raft server) {
		StringBuilder message = new StringBuilder(requestVoteRPC).append("\n")
				.append(server.currentTerm.get()).append("\n")
				.append(server.ID.toString()).append("\n")
				.append(server.log.size()-1).append("\n")
				.append(((RaftLog) server.log.get(server.log.size()-1)).term).append("\n");

		return message.toString();
	}

	@SuppressWarnings("unchecked")
	static String retRequestVote(Raft server, boolean voteGranted) {
		StringBuilder message = new StringBuilder(requestVoteRPC).append("\n")
				.append(server.currentTerm.get()).append("\n")
				.append(voteGranted).append("\n");

		return message.toString();
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
		return discoverNodesRPC.concat("\n")
				.concat(server.ID.toString()).concat("/")
				.concat(server.port.toString()).concat("\n");
	}
	@SuppressWarnings("unchecked")
	static String retDiscoverNodes(Raft server, UUID ID) {
		StringBuilder message = new StringBuilder(discoverNodesRPC).append("\n")
				.append(server.ID.toString()).append("/")
				.append(server.port).append("\n");
		if (!server.ID.equals(ID)) {
			for (Map.Entry<UUID, RaftCommunication> data : (Set<Map.Entry<UUID, RaftCommunication>>) server.cluster.entrySet()) {
				message.append(data.getKey().toString()).append("/")
						.append(data.getValue().address.getAddress().getHostAddress()).append(":")
						.append(data.getValue().address.getPort()).append("\n");
			}
		}
		return message.toString();
	}

	@SuppressWarnings("unchecked")
	static String callSetValue(String obj) {
		return setValueRPC.concat("\n").concat(obj).concat("\n");
	}

	@SuppressWarnings("unchecked")
	static String callGetValue() {
		return getValueRPC.concat("\n");
	}

	@SuppressWarnings("unchecked")
	static String callDeleteValue() {
		return deleteValueRPC.concat("\n");
	}

	@SuppressWarnings("unchecked")
	static String retSetValue(boolean success) {
		return success ? (setValueRPC + "\ntrue\n") : (setValueRPC + "\nfalse\n");
	}

	@SuppressWarnings("unchecked")
	static String retGetValue(String obj) {
		return getValueRPC.concat("\n").concat(obj).concat("\n");
	}

	@SuppressWarnings("unchecked")
	static String retDeleteValue(boolean success) {
		return success ? (deleteValueRPC + "\ntrue\n") : (deleteValueRPC + "\nfalse\n");
	}
}