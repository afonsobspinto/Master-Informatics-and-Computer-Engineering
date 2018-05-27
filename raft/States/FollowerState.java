package raft.States;

public class FollowerState extends State {

    public FollowerState() {
        super(StateID.FOLLOWER);
    }

    @Override
    public void handleLeaderHeartBeat() {

    }
}
