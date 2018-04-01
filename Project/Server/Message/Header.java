package Server.Message;

import Server.Message.Utilities.Constants;

import java.lang.reflect.Field;

class Header {

    private MessageType messageType;
    private String headerProtocol;
    private String version = null;
    private String senderID = null;
    private String fileID = null;
    private String chuckNo = null;
    private String replicationDegree = null;

    Header(String[] args) throws IllegalAccessException {
        Field[] fields = Header.class.getDeclaredFields();
        Integer fieldIndex = 1;
        this.messageType = MessageType.messageTypeHashMap.get(args[0].toUpperCase());

        StringBuilder headerBuilder = new StringBuilder();
        for(String arg:args){
            String value = arg.trim();
            fields[fieldIndex++].set(this, value);
            headerBuilder.append(Constants.SPACE).append(value);
        }

        headerBuilder.append(Constants.SPACE + Constants.CRLF + Constants.CRLF);
        headerProtocol = headerBuilder.toString();
    }

    MessageType getMessageType() {
        return messageType;
    }

    byte[] getHeaderProtocol() {
        return headerProtocol.getBytes();
    }

    public Float getVersion() {
        if(version!=null) {
            return Float.valueOf(version);
        }
        return null;
    }

    Integer getSenderID() {
        if(senderID!=null) {
            return Integer.valueOf(senderID);
        }
        return null;
    }

    public String getFileID() {
        return fileID;
    }

    public Integer getChuckNo() {
        if(chuckNo!=null){
            return Integer.valueOf(chuckNo);
        }
        return null;
    }

    Integer getReplicationDegree() {
        if(replicationDegree!=null){
            return Integer.valueOf(replicationDegree);
        }
        return null;
    }

}
