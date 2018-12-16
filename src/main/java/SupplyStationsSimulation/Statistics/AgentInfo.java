package SupplyStationsSimulation.Statistics;

import SupplyStationsSimulation.Agents.BehaviourType;
import SupplyStationsSimulation.Agents.Type;
import SupplyStationsSimulation.Utilities.Locations.Position;

public abstract class AgentInfo {
    public Type getType() {
        return type;
    }

    public abstract BehaviourType getBehaviourType();

    public abstract Position getLocation();

    Type type;
    BehaviourType behaviourType;
    Position location;


}
