package raft.States;

import raft.RPC;
import raft.Raft;
import raft.net.ssl.SSLChannel;

public class FollowerState extends State {

    public FollowerState(Raft raft) {
        super(StateID.FOLLOWER, raft);
    }

    @Override
    public void receiveMessage(){
    }

    @Override
    public void handleHeartbeats(Raft raft) {

    }

    @Override
    public void handleLeaderHeartBeat() {

    }

    @Override
    public void handleLeaderHeartBeatFailure() {
        System.out.println("HeartbeatFailed. Changing state from follower to candidate");
        this.raft.setState(new CandidateState(raft));

    }
}
