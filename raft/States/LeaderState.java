package raft.States;

import raft.Raft;

public class LeaderState extends State {
    LeaderState(Raft raft) {
        super(StateID.LEADER, raft);
    }

    @Override
    public void receiveMessage(StateID stateID, String msg){
        if(stateID == StateID.LEADER){
            if(msg == "heartbeat")
                stateID.sendMessage(this.stateID, "ok");
        }
        else if(stateID == StateID.CANDIDATE){

        }
        else{

        }

    }

    @Override
    public void handleLeaderHeartBeat() {

    }

    @Override
    public void handleLeaderHeartBeatFailure() {
    }
}
