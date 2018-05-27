package raft.States;

import raft.Raft;

public abstract class State {
    private StateID stateID;
    private Raft raft;
    State(StateID stateID, Raft raft){
        this.stateID = stateID;
        this.raft = raft;
    }

    public abstract void handleLeaderHeartBeat();
    public abstract void handleLeaderHeartBeatFailure();
}

