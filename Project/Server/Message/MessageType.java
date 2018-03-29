package Server.Message;

public enum MessageType {
    PUTCHUNK("PUTCHUNK"), STORED("STORED"), GETCHUNK("GETCHUNK"), CHUNK("CHUNK"), DELETE("DELETE"), REMOVED("REMOVED");
    private String str;

    MessageType(String str){
        this.str = str;
    }

    String toSring(){
        return str;
    }
}
