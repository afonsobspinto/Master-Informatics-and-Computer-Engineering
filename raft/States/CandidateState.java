package raft.States;

import raft.Raft;

public class CandidateState extends State {
    public CandidateState(Raft raft) {
        super(StateID.CANDIDATE, raft);
        System.out.println("Candidate Created");
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

    }
}
