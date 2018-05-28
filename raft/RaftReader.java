package raft;

import raft.Raft.ServerState;

public class RaftReader implements Runnable{
	private RaftCommunication raftComm;
	
	public RaftReader(RaftCommunication raftComm) {
		this.raftComm = raftComm;
	}

	@Override
	public void run() {
		while (raftComm.raft.serverState.get() != ServerState.TERMINATING) {
			String message = raftComm.channel.receiveString(500);
			
			if(message == null) {
				continue;
			}
			
			String[] messageArray = message.split("\n");
			String reply = null;
			
			switch(messageArray[0]) {
			case RPC.appendEntriesRPC:
				//1
				long term = Long.parseLong(messageArray[1]);
				
				if(term < raftComm.raft.currentTerm.get()) {
					reply = RPC.retAppendEntries(raftComm.raft, false);
					break;
				}
				
				//2
				int prevLogIndex = Integer.parseInt(messageArray[3]);
				long prevLogTerm = Long.parseLong(messageArray[4]);
				
				if(prevLogIndex >= raftComm.raft.log.size()) {
					reply = RPC.retAppendEntries(raftComm.raft, false);
					break;
				}
				
				if(((RaftLog)raftComm.raft.log.get(prevLogIndex)).term != prevLogTerm) {
					reply = RPC.retAppendEntries(raftComm.raft, false);
					break;
				}
				//3
				//TODO
				break;
			case RPC.requestVoteRPC:
				break;
			}
			
			if(reply != null) {
				raftComm.queue.put(reply);
			}
		}
	}

}
