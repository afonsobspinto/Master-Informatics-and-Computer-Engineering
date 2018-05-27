package raft.States;

public class CandidateState extends State {
    CandidateState() {
        super(StateID.CANDIDATE);
    }

    @Override
    public void receiveMessage(StateID stateID, String msg){

    }

    @Override
    public void handleLeaderHeartBeat() {

    }
}
