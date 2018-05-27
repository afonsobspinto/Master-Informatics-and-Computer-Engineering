package raft;

public class RaftWriter implements Runnable{
	private RaftCommunication raftComm;
	
	public RaftWriter(RaftCommunication raftComm) {
		this.raftComm = raftComm;
	}
	
	
	@Override
	public void run() {
		
	}

}
