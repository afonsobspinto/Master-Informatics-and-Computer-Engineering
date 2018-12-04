package SupplyStationsSimulation.Statistics;

import SupplyStationsSimulation.Agents.BehaviourType;
import SupplyStationsSimulation.Agents.Type;
import SupplyStationsSimulation.Utilities.Locations.Position;

public abstract class AgentInfo {
    public Type getType() {
        return type;
    }

    public BehaviourType getBehaviourType() {
        return behaviourType;
    }

    public Position getLocation() {
        return location;
    }

    Type type;
    BehaviourType behaviourType;
    Position location;


}
