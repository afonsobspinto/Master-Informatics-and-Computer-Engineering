package raft.States;

public class LeaderState extends State {
    LeaderState() {
        super(StateID.LEADER);
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
}
