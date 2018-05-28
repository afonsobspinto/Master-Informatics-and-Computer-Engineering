package raft;

import java.util.UUID;

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
			int term;
			
			switch(messageArray[0]) {
			case RPC.callAppendEntriesRPC:
				//1
				term = Integer.parseInt(messageArray[1]);
				
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
			case RPC.callRequestVoteRPC:
				//1
				term = Integer.parseInt(messageArray[1]);
				
				if(term < raftComm.raft.currentTerm.get()) {
					reply = RPC.retRequestVote(raftComm.raft, false);
					break;
				}
				
				//2
				if(raftComm.raft.votedFor == null) {
					reply = RPC.retRequestVote(raftComm.raft, true);
					break;
				}
				
				//TODO
				UUID candidateID = UUID.fromString(messageArray[2]);
				
				int lastLogIndex = Integer.parseInt(messageArray[3]);
				long lastLogTerm = Long.parseLong(messageArray[4]);
				
				long lastReceiverLogTerm = ((RaftLog)raftComm.raft.log.get(raftComm.raft.log.size() - 1)).term;
				
				if(lastReceiverLogTerm != lastLogTerm) {
					if(lastReceiverLogTerm < lastLogTerm){
						reply = RPC.retRequestVote(raftComm.raft, true);
					}
					else {
						reply = RPC.retRequestVote(raftComm.raft, false);
					}
					
					break;
				}
				
				if(raftComm.raft.log.size() <= lastLogIndex) {
					reply = RPC.retRequestVote(raftComm.raft, true);
					break;
				}
				
				reply = RPC.retRequestVote(raftComm.raft, false);
				break;
			case RPC.retAppendEntriesRPC:
				break;
			case RPC.retRequestVoteRPC:
				term = Integer.parseInt(messageArray[1]);
				boolean gotAVote = Boolean.parseBoolean(messageArray[2]);
				
				if(term > raftComm.raft.currentTerm.get()) {
					raftComm.raft.state.set(RaftState.FOLLOWER);
					raftComm.raft.candidateTimerTask.cancel();
					break;
				}
				
				if(gotAVote) {
					raftComm.raft.votes.incrementAndGet();
				}
				
				if(raftComm.raft.votes.get() > (raftComm.raft.cluster.size() + 1)/2) {
					raftComm.raft.state.set(RaftState.LEADER);
					raftComm.raft.leaderID = raftComm.raft.ID;
					raftComm.raft.candidateTimerTask.cancel();
					break;
				}
				
				break;
			}
			
			if(reply != null) {
				raftComm.queue.put(reply);
			}
		}
	}

}
