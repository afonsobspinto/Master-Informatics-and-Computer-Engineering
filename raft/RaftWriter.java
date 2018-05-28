package raft;

import java.util.concurrent.TimeUnit;

import raft.Raft.ServerState;

public class RaftWriter implements Runnable{
	private RaftCommunication raftComm;
	
	public RaftWriter(RaftCommunication raftComm) {
		this.raftComm = raftComm;
	}

	@Override
	public void run() {
		while (raftComm.raft.serverState.get() != ServerState.TERMINATING) {
			String message = null;
			
			try {
				message = raftComm.queue.take();
				//while (raftComm.raft.synchronize.get());
			} 
			catch (InterruptedException e) {
				e.printStackTrace();
			}

			if(message == null) {
				continue;
			}

			switch (message) {
                case RPC.callAppendEntriesRPC:
                    message = RPC.callAppendEntries(raftComm.raft);
                    System.out.println("Send Append Entries: ");
                    break;
                case RPC.callRequestVoteRPC:
                    message = RPC.callRequestVote(raftComm.raft);
                    System.out.println("Send Request Vote: ");
                    break;
                case RPC.retRequestVoteRPC:
                    System.out.println("Send Request Vote Reply: ");
                    break;
                case RPC.retAppendEntriesRPC:
                    System.out.println("Send Append Entries Reply: ");
                    break;
                default:
                    switch (message.split("\n")[0]){
                        case RPC.retRequestVoteRPC:
                            System.out.println("Send Request Vote Reply: ");
                            break;
                        case RPC.retAppendEntriesRPC:
                            System.out.println("Send Append Entries Reply: ");
                            break;
                        default:
                            //System.out.println("Send Reply Something: ");
                            break;
                    }
                    break;
			}



            System.out.println(message);
			raftComm.channel.send(message);
		}
	}

}
