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
        Integer fieldIndex = 2;
        Integer argsIndex = 0;
        String messageTypeStr = args[argsIndex++];
        this.messageType = MessageType.messageTypeHashMap.get(messageTypeStr.toUpperCase());
        StringBuilder headerBuilder = new StringBuilder(messageTypeStr);
        for( ; argsIndex < args.length; argsIndex++){
            String arg = args[argsIndex];
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

    String getFileID() {
        return fileID;
    }

    Integer getChuckNo() {
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
