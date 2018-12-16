package SupplyStationsSimulation.Agents;

public enum BehaviourType {
    COLLABORATIVE(0), ADVENTUROUS(1), DYNAMIC(2), STATIC(3);

    private int value;
    private BehaviourType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
