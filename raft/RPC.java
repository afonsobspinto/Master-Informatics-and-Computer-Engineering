package raft;

import java.util.Map;
import java.util.Set;
import java.util.UUID;

class RPC { // Remote Procedure Calls
	static final String callAppendEntriesRPC = "CallAppendEntriesRPC";
	static final String callDiscoverNodesRPC = "CallDiscoverNodesRPC";
	static final String callSetValueRPC = "CallSetValueRPC";
	static final String callGetValueRPC = "CallGetValueRPC";
	static final String callDeleteValueRPC = "CallDeleteValueRPC";
	static final String callRequestVoteRPC = "CallRequestVoteRPC";
	
	static final String retAppendEntriesRPC = "RetAppendEntriesRPC";
	static final String retDiscoverNodesRPC = "RetDiscoverNodesRPC";
	static final String retSetValueRPC = "RetSetValueRPC";
	static final String retGetValueRPC = "RetGetValueRPC";
	static final String retDeleteValueRPC = "RetDeleteValueRPC";
	static final String retRequestVoteRPC = "RetRequestVoteRPC";

	@SuppressWarnings("unchecked")
	static String callAppendEntries(Raft server) {
		StringBuilder message = new StringBuilder(callAppendEntriesRPC).append("\n")
				.append(server.currentTerm.get()).append("\n")
				.append(server.ID.toString()).append("\n");

				if(server.log.size() == 0) {
					message.append(0).append("\n")
							.append(0).append("\n");
				}
				else {
					message.append(server.log.size() - 1).append("\n")
							.append(((RaftLog) server.log.get(server.log.size() - 1)).term).append("\n");
				}

				message.append(server.commitIndex.toString()).append("\n");

        System.out.println("Append Entry: " + message.toString());

		return message.toString();
	}
	
	@SuppressWarnings("unchecked")
	static String retAppendEntries(Raft server, boolean success) {
		StringBuilder message = new StringBuilder(retAppendEntriesRPC).append("\n")
				.append(server.currentTerm.get()).append("\n")
				.append(success).append("\n");

        System.out.println("Append Entry Reply: " + message.toString());

        return message.toString();
	}

	@SuppressWarnings("unchecked")
	static String callRequestVote(Raft server) {
		StringBuilder message = new StringBuilder(callRequestVoteRPC).append("\n")
				.append(server.currentTerm.get()).append("\n")
				.append(server.ID.toString()).append("\n")
				.append(server.log.size()-1).append("\n")
				.append(((RaftLog) server.log.get(server.log.size()-1)).term).append("\n");

        System.out.println("Request Vote: " + message.toString());

        return message.toString();
	}

	@SuppressWarnings("unchecked")
	static String retRequestVote(Raft server, boolean voteGranted) {
		StringBuilder message = new StringBuilder(retRequestVoteRPC).append("\n")
				.append(server.currentTerm.get()).append("\n")
				.append(voteGranted).append("\n");

        System.out.println("Request Vote Reply: " + message.toString());

        return message.toString();
	}

	/*
        callDiscoverNodes, for RaftDiscover
        DiscoverNodes\n
        <UUID/port>\n

        retDiscoverNodes, for RaftServer
        DiscoverNodes\n
        <UUID/port>\n
        <UUID/address:port 1>\n
        <UUID/address:port 2>\n
        ...
        <UUID/address:port N>\n
    */
	@SuppressWarnings("unchecked")
	static String callDiscoverNodes(Raft server) {
		return callDiscoverNodesRPC.concat("\n")
				.concat(server.ID.toString()).concat("/")
				.concat(server.port.toString()).concat("\n");
	}
	@SuppressWarnings("unchecked")
	static String retDiscoverNodes(Raft server, UUID ID) {
		StringBuilder message = new StringBuilder(retDiscoverNodesRPC).append("\n")
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
		return callSetValueRPC.concat("\n").concat(obj).concat("\n");
	}

	@SuppressWarnings("unchecked")
	static String callGetValue() {
		return callGetValueRPC.concat("\n");
	}

	@SuppressWarnings("unchecked")
	static String callDeleteValue() {
		return callDeleteValueRPC.concat("\n");
	}

	@SuppressWarnings("unchecked")
	static String retSetValue(boolean success) {
		return success ? (retSetValueRPC + "\ntrue\n") : (retSetValueRPC + "\nfalse\n");
	}

	@SuppressWarnings("unchecked")
	static String retGetValue(String obj) {
		return retGetValueRPC.concat("\n").concat(obj).concat("\n");
	}

	@SuppressWarnings("unchecked")
	static String retDeleteValue(boolean success) {
		return success ? (retDeleteValueRPC + "\ntrue\n") : (retDeleteValueRPC + "\nfalse\n");
	}
}