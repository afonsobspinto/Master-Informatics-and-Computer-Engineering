package SupplyStationsSimulation.Utilities.Messaging;

public enum MessageType {
    POSITION("Position");

    private String typeStr;
    MessageType(String type) {
        this.typeStr = type;
    }

    public String getTypeStr() {
        return typeStr;
    }
}
