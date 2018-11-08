package SupplyStationsSimulation.Utilities.Messaging;

import java.util.List;

public class Content {
    private MessageType messageType;
    private List<Object> content;
    public Content(MessageType messageType, List<Object> content) {
        this.messageType = messageType;
        this.content = content;
    }

    //TODO: Finish this parser
    public Content(String content){}

    public String getContent(){
        StringBuilder stringBuilder = new StringBuilder(messageType.getTypeStr() + "\n");
        for(Object obj: content){
            stringBuilder.append(obj.toString()).append("\n");
        }
        return stringBuilder.toString();
    }
}
