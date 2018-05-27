package raft.States;

public class CandidateState extends State {
    CandidateState() {
        super(StateID.CANDIDATE);
    }

    @Override
    public void handleLeaderHeartBeat() {

    }
}
