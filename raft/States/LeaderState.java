package raft.States;

public class LeaderState extends State {
    LeaderState() {
        super(StateID.LEADER);
    }

    @Override
    public void handleLeaderHeartBeat() {

    }
}
