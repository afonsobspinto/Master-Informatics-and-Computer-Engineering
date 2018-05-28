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
				while (raftComm.raft.synchronize.get());
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
				break;
			case RPC.callRequestVoteRPC:
				message = RPC.callRequestVote(raftComm.raft);
				break;
			}

			raftComm.channel.send(message);
		}
	}

}
