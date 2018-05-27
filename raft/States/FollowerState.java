package raft.States;

import raft.Raft;

public class FollowerState extends State {

    public FollowerState(Raft raft) {
        super(StateID.FOLLOWER, raft);
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
