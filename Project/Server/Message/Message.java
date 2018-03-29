package Server.Message;

public class Message {

    Header header;

    public Message(MessageType messageType, String[] args) {
        header = new Header(messageType, args);
        System.out.println(header.getHeaderProtocol());
    }

}
