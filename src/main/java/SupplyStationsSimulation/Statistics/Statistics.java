package SupplyStationsSimulation.Statistics;

import SupplyStationsSimulation.Agents.DrawableAgent;
import SupplyStationsSimulation.Agents.SupplyStationAgent;
import jade.core.AID;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class Statistics {
    private Map<TickStatsInfo, Map<AID, SupplyStationInfo>> history = new LinkedHashMap<>();
    private static Statistics ourInstance;

    public static Statistics getInstance() {
        if (ourInstance == null)
            ourInstance = new Statistics();
        return ourInstance;
    }


    private HashMap getAgentsMap(ArrayList<DrawableAgent> agentList) {
        Map<AID, AgentInfo> agentsMap = new HashMap<>();
        Map<AID, SupplyStationInfo> supplyStationMap = new HashMap<>();
        for (DrawableAgent agent : agentList) {
            agentsMap.put(agent.getAID(), agent.getAgentInfo());
            if (agent instanceof SupplyStationAgent) {
                supplyStationMap.put(agent.getAID(), (SupplyStationInfo) agent.getAgentInfo());
            }
        }

        HashMap<String, Map> ret = new HashMap<>();
        ret.put("agentsMap", agentsMap);
        ret.put("supplyStationMap", supplyStationMap);
        return ret;
    }

    public void finishTick(int tick, ArrayList<DrawableAgent> agentList) {
        HashMap maps = getAgentsMap(agentList);
        Map<AID, AgentInfo> agentsMap = (Map<AID, AgentInfo>) maps.get("agentsMap");
        Map<AID, SupplyStationInfo> supplyStationsMap = (Map<AID, SupplyStationInfo>) maps.get("supplyStationMap");
        history.put(new TickStatsInfo(tick, agentsMap), supplyStationsMap);

    }


    public void export() {
        StringBuilder stringBuilder = new StringBuilder();
        for (TickStatsInfo tickStatsInfo : history.keySet()) {
            Map<AID, SupplyStationInfo> historyMap = history.get(tickStatsInfo);
            for (AID aid : historyMap.keySet()) {
                stringBuilder.append(tickStatsInfo.getTick());
                stringBuilder.append(",");
                stringBuilder.append(historyMap.get(aid).toString());
                stringBuilder.append(",");
                stringBuilder.append(tickStatsInfo.toString());
                stringBuilder.append('\n');
            }

        }

        try (FileWriter fw = new FileWriter("SSStatistics.txt", true);
             BufferedWriter bw = new BufferedWriter(fw);
             PrintWriter out = new PrintWriter(bw)) {
            out.println(stringBuilder.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("The information about this experience was added to the statistics file");

    }

}

