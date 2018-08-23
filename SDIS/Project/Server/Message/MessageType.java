package Server.Message;

import java.util.HashMap;

public enum MessageType {
    PUTCHUNK("PUTCHUNK"), STORED("STORED"), GETCHUNK("GETCHUNK"), CHUNK("CHUNK"), DELETE("DELETE"), REMOVED("REMOVED");
    private String str;
    public static final HashMap<String, MessageType> messageTypeHashMap;
    static
    {
        messageTypeHashMap = new HashMap<>();
        messageTypeHashMap.put("PUTCHUNK", PUTCHUNK);
        messageTypeHashMap.put("STORED", STORED);
        messageTypeHashMap.put("GETCHUNK", GETCHUNK);
        messageTypeHashMap.put("CHUNK", CHUNK);
        messageTypeHashMap.put("DELETE", DELETE);
        messageTypeHashMap.put("REMOVED", REMOVED);
    }

    MessageType(String str){
        this.str = str;
    }

    String toSring(){
        return str;
    }
}
