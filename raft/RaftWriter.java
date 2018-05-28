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
				message = raftComm.queue.poll(500, TimeUnit.MILLISECONDS);
			} 
			catch (InterruptedException e) {
				e.printStackTrace();
			}
			
			if(message == null) {
				continue;
			}
		
			raftComm.channel.send(message);
		}
	}

}
