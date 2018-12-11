package SupplyStationsSimulation.Behaviours;

import SupplyStationsSimulation.Agents.DrawableAgent;
import SupplyStationsSimulation.Agents.DriverAgent;
import SupplyStationsSimulation.Agents.StatisticsAgent;
import SupplyStationsSimulation.Agents.Type;
import SupplyStationsSimulation.Statistics.Statistics;
import SupplyStationsSimulation.Utilities.Messaging.Message;
import sajas.core.Agent;
import sajas.core.behaviours.Behaviour;

import java.util.ArrayList;

public class StatisticsBehaviour extends Behaviour implements ACLMessageBehaviour {

    private StatisticsAgent statisticsAgent;
    private ArrayList<DrawableAgent> agentList;
    private int infoFlag = 0;

    public StatisticsBehaviour(StatisticsAgent a, ArrayList<DrawableAgent> agentList) {
        super(a);
        this.statisticsAgent = a;
        this.agentList = agentList;
    }

    @Override
    public void action() {
        for (DrawableAgent agent : this.agentList) {
            if(infoFlag == 500) {
                agent.saveStatistics();
                Statistics statistics = Statistics.getInstance();
                statistics.finishTick();
            }
        }
        infoFlag++;
    }

    @Override
    public boolean done() {
        return false;
    }

    @Override
    public void handleMessage(Message message) {

    }
}
