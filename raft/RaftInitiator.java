package raft;

import java.net.InetSocketAddress;

public class RaftInitiator {
	public static void main(String[] args) {
		if (args.length > 1) {
			Raft<Integer> raft = new Raft<>(Integer.valueOf(args[0]), new InetSocketAddress(args[1], Integer.valueOf(args[2])));
		}
		else {
			Raft<Integer> raft = new Raft<>(Integer.valueOf(args[0]));
		}
	}
}
