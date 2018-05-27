package raft.States;

import raft.Raft;

public class LeaderState extends State {
    LeaderState(Raft raft) {
        super(StateID.LEADER, raft);
    }

    @Override
    public void handleLeaderHeartBeat() {

    }

    @Override
    public void handleLeaderHeartBeatFailure() {
    }
}
