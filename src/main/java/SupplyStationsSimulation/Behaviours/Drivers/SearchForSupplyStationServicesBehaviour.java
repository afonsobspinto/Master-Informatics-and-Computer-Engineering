package SupplyStationsSimulation.Behaviours.Drivers;

import SupplyStationsSimulation.Agents.DriverAgent;
import jade.core.AID;
import jade.domain.FIPAAgentManagement.DFAgentDescription;
import jade.domain.FIPAAgentManagement.ServiceDescription;
import jade.domain.FIPAException;
import sajas.core.behaviours.TickerBehaviour;
import sajas.domain.DFService;

import java.util.ArrayList;

public class SearchForSupplyStationServicesBehaviour extends TickerBehaviour {
    private DriverAgent agent;

    public SearchForSupplyStationServicesBehaviour(DriverAgent a, long period) {
        super(a, period);
        this.agent = a;
    }

    @Override
    protected void onTick() {
        if (agent.getDriverState().equals(DriverAgent.DriverState.SEARCHING)) {
            DFAgentDescription template = new DFAgentDescription();
            ServiceDescription sd = new ServiceDescription();
            sd.setType("fuel-selling");
            template.addServices(sd);
            try {
                DFAgentDescription[] results = DFService.search(agent, template);
                ArrayList<AID> supplyStations = new ArrayList<>(results.length);
                for (int i = 0; i < results.length; i++) {
                    supplyStations.add(results[i].getName());
                }
                agent.setSupplyStationsServicesAIDs(supplyStations);
            } catch (FIPAException e) {
                e.printStackTrace();
            }
        }
    }
}
