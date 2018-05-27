package raft.States;

import raft.Raft;
import raft.RPC;
import raft.net.ssl.SSLChannel;

public class LeaderState extends State {
    LeaderState(Raft raft) {
        super(StateID.LEADER, raft);
    }

    @Override
    public void receiveMessage(){
    }

    @Override
    public void handleHeartbeats(Raft raft) {
        //channel.send(RPC.callAppendEntries(this.raft)); TODO

    }

    @Override
    public void handleLeaderHeartBeat() {

    }

    @Override
    public void handleLeaderHeartBeatFailure() {
    }
}
