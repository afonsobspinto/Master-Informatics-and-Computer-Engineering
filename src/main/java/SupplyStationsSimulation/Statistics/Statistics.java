package SupplyStationsSimulation.Statistics;

import SupplyStationsSimulation.Agents.Type;
import jade.core.AID;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
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

        File file = new File("SSStatistics.txt");
        FileWriter fr = null;
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

        try {
            fr = new FileWriter(file);
            fr.write(stringBuilder.toString());
        }  catch (IOException e) {
            e.printStackTrace();
        }finally{
            //close resources
            try {
                fr.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }

}

