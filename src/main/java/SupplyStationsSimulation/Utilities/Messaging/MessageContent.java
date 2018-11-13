package SupplyStationsSimulation.Utilities.Messaging;

import jade.core.AID;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

public class MessageContent {

    private MessageType messageType;

    private List<String> contetObjects =  new ArrayList<>();
    public MessageContent(MessageType messageType, List<String> contetObjects) {
        this.messageType = messageType;
        this.contetObjects = contetObjects;
    }

    public MessageContent(Message message){
        String content = message.getContent();
        String lines[] = content.split("\n");
        int i = 0;
        this.messageType = MessageType.getValue(lines[i++]);
        for(; i < lines.length; i++){
            this.contetObjects.add(lines[i]);
        }
    }

    public String getContent(){
        StringBuilder stringBuilder = new StringBuilder(messageType.getTypeStr() + "\n");
        for(Object obj: contetObjects){
            stringBuilder.append(obj.toString()).append("\n");
        }
        return stringBuilder.toString();
    }

    public MessageType getMessageType() {
        return messageType;
    }

    public List<String> getContetObjects() {
        return contetObjects;
    }


}
