package raft;

import java.util.concurrent.TimeUnit;

import raft.Raft.ServerState;

public class RaftReader implements Runnable{
	private RaftCommunication raftComm;
	
	public RaftReader(RaftCommunication raftComm) {
		this.raftComm = raftComm;
	}

	@Override
	public void run() {
		
	}

}
