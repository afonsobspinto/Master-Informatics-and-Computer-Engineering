package raft.States;

public abstract class State {

    private StateID stateID;
    State(StateID stateID){
        this.stateID = stateID;
    }

    public StateID getStateID() {
        return stateID;
    }

    public abstract void receiveMessage(StateID stateID, String msg);

    public abstract void handleLeaderHeartBeat();
}

