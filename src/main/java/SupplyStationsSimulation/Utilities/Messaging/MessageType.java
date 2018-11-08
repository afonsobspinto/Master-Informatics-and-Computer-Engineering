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

    public static MessageType getValue(String value) {
        for(MessageType e: MessageType.values()) {
            if(e.typeStr.equals(value)) {
                return e;
            }
        }
        return null;
    }
}
