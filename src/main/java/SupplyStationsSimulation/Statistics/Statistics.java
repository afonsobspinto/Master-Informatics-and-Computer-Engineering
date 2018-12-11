package SupplyStationsSimulation.Statistics;

import SupplyStationsSimulation.Agents.Type;
import jade.core.AID;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Statistics {
    Map<AID, AgentInfo> map = new HashMap<AID, AgentInfo>();
    ArrayList<Map<AID,AgentInfo>> history = new ArrayList<Map<AID,AgentInfo>>();
    static int infoFlag = 500;

    private static Statistics ourInstance;

    public static Statistics getInstance() {
        if(ourInstance == null)
            ourInstance = new Statistics();
        return ourInstance;
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
        StringBuilder stringBuilder = new StringBuilder();
        for(int step = 0; step < history.size(); step++){
            Map<AID, AgentInfo> historyMap = history.get(step);
            for (AID aid : historyMap.keySet()) {
                    stringBuilder.append(step * infoFlag + infoFlag);
                    stringBuilder.append(",");
                    stringBuilder.append(historyMap.get(aid).toString());
                    stringBuilder.append("\n");
            }
        }

        stringBuilder.append("\n");

        try(FileWriter fw = new FileWriter("SSStatistics.txt", true);
            BufferedWriter bw = new BufferedWriter(fw);
            PrintWriter out = new PrintWriter(bw))
        {
            out.println(stringBuilder.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("The information about this experience was added to the statistics file");

    }

}

