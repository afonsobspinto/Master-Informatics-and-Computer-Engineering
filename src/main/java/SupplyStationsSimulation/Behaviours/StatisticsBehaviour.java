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
        if(infoFlag == 500) {
            for (DrawableAgent agent : this.agentList) {
                agent.saveStatistics();
                Statistics statistics = Statistics.getInstance();
                statistics.finishTick();
            }
            infoFlag=0;
        }
        infoFlag++;
    }

    @Override
    public boolean done() {
        for (DrawableAgent agent : agentList) {
            if (agent.getType() == Type.DRIVER && !agent.isDone()) {
                return false;
            }
        }
        Statistics.getInstance().export();
        return true;
    }

    @Override
    public void handleMessage(Message message) {

    }
}
