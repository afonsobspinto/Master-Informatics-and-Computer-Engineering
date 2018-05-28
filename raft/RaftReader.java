package raft;

import java.util.concurrent.LinkedTransferQueue;

public class RaftReader implements Runnable{
	private RaftCommunication raftComm;
	
	public RaftReader(RaftCommunication raftComm) {
		this.raftComm = raftComm;
	}
	
	@Override
	public void run() {
		
	}

}
