package SupplyStationsSimulation.Statistics;


import jade.core.AID;

import java.util.Map;

import static SupplyStationsSimulation.Agents.BehaviourType.COLLABORATIVE;
import static SupplyStationsSimulation.Agents.BehaviourType.ADVENTUROUS;

class TickStatsInfo {
    private Map<AID, AgentInfo> aidAgentInfoMap;

    public Integer getTick() {
        return tick;
    }

    private Integer tick;
    private Integer collaboratives;
    private Integer adventurous;
    private Double priceMean;
    private Double priceStdDev;
    private Double maxPrice = Double.MIN_VALUE;
    private Double minPrice = Double.MAX_VALUE;
    private Double intoleranceMean;
    private Double intoleranceStdDev;
    private Double fuelToBuyMean;
    private Double fuelToBuyStdDev;

    TickStatsInfo(int tick, Map<AID, AgentInfo> map) {
        this.aidAgentInfoMap = map;
        this.tick = tick;
        calculateStats();
    }

    private void calculateStats() {
        int collaborative = 0;
        int adventurous = 0;
        double totalPrices = 0;
        double totalPricesSquared = 0;
        double totalIntolerance = 0;
        double totalIntoleranceSquared = 0;
        double totalFuelToBuy = 0;
        double totalFuelToBuySquared = 0;
        int supplyStations = 0;

        for (AID aid : aidAgentInfoMap.keySet()) {
            AgentInfo agent = aidAgentInfoMap.get(aid);
            if (agent.getBehaviourType() == COLLABORATIVE || agent.getBehaviourType() == ADVENTUROUS) {
                if (agent.getBehaviourType() == COLLABORATIVE)
                    collaborative++;
                else {
                    adventurous++;
                }
                double intolerance = ((DriverInfo) agent).getPriceIntolerance();
                totalIntolerance += intolerance;
                totalIntoleranceSquared += intolerance * intolerance;
                double fuelToBuy = ((DriverInfo) agent).getFuelToBuy();
                totalFuelToBuy += fuelToBuy;
                totalFuelToBuySquared += fuelToBuy * fuelToBuy;
            } else {
                supplyStations++;
                double price = ((SupplyStationInfo)agent).getPrice();
                totalPrices += price;
                totalPricesSquared += price * price;
                if (price > maxPrice)
                    maxPrice = price;
                if (price < minPrice)
                    minPrice = price;
            }
        }
        this.collaboratives = collaborative;
        this.adventurous = adventurous;
        this.priceMean = totalPrices / supplyStations;
        this.priceStdDev = (totalPricesSquared - totalPrices * totalPrices / supplyStations) / supplyStations;
        int drivers = collaborative + adventurous;
        this.intoleranceMean = totalIntolerance / drivers;
        this.intoleranceStdDev = (totalIntoleranceSquared - totalIntolerance * totalIntolerance / drivers) / drivers;
        this.fuelToBuyMean = totalFuelToBuy / drivers;
        this.fuelToBuyStdDev = (totalFuelToBuySquared - totalFuelToBuy * totalFuelToBuy / drivers) / drivers;

    }

    @Override
    public String toString() {
        return collaboratives +
                "," + adventurous +
                "," + priceMean +
                "," + priceStdDev +
                "," + maxPrice +
                "," + minPrice +
                "," + intoleranceMean +
                "," + intoleranceStdDev +
                "," + fuelToBuyMean +
                "," + fuelToBuyStdDev;
    }
}
