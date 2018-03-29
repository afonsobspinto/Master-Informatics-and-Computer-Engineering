package Server.Message;

import Server.Message.Utilities.Constants;

public class Header {

    private String headerProtocol;

    public Header(MessageType messageType, String[] args){ //TODO: Error handling?
        headerProtocol = messageType.toString();

        for(String arg:args){
            headerProtocol += Constants.SPACE + arg;
        }

        headerProtocol+= Constants.SPACE + Constants.CRLF + Constants.CRLF;
    }

    public String getHeaderProtocol() {
        return headerProtocol;
    }
}
