package raft;

import java.net.InetSocketAddress;

public class RaftInitiator {
	public static void main(String[] args) {
/*
		if (args.length > 1) {
			Raft<Integer> raft = new Raft<>(Integer.valueOf(args[0]), new InetSocketAddress(args[1], Integer.valueOf(args[2])));
			raft.run();
		} else {
			Raft<Integer> raft = new Raft<>(Integer.valueOf(args[0]));
			raft.run();
		}
*/

        Raft<Integer> raft1 = new Raft<>(8001);
        raft1.run();
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Raft<Integer> raft2 = new Raft<>(8002, new InetSocketAddress("localhost", 8001));
        Raft<Integer> raft3 = new Raft<>(8003, new InetSocketAddress("localhost", 8001));


        raft2.run();
        raft3.run();
        try {
            Thread.sleep(20000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        raft2.set(5);
	}

}
