package raft.States;

import raft.Raft;

public class CandidateState extends State {
    public CandidateState(Raft raft) {
        super(StateID.CANDIDATE, raft);
    }

    @Override
    public void handleLeaderHeartBeat() {

    }

    @Override
    public void handleLeaderHeartBeatFailure() {

    }
}
