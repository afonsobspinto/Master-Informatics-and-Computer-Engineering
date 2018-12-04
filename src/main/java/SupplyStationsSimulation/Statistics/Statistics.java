package SupplyStationsSimulation.Statistics;

import jade.core.AID;

import java.util.ArrayList;
import java.util.Map;

public class Statistics {
    Map<AID, AgentInfo> map;
    ArrayList<Map<AID,AgentInfo>> history;

    private static Statistics ourInstance = new Statistics();

    public static Statistics getInstance() {
        return ourInstance;
    }

    private Statistics() {
    }

    public AgentInfo getAgentInfo(AID aid){
        return map.get(aid);
    }

    public void updateAgentInfo(AID aid, AgentInfo agentInfo){
        map.put(aid, agentInfo);

    }

    public void finishTick(){
        history.add(map);
    }
    public void export(){

    }
}

