package raft.http;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import raft.Raft;

import java.io.IOException;
import java.io.OutputStream;

public class SetHandler implements HttpHandler {
    private Raft raft;
    public SetHandler(Raft raft) {
        this.raft = raft;
    }

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        String response = "Made a request to leader";
        httpExchange.sendResponseHeaders(200, response.length());
        OutputStream os = httpExchange.getResponseBody();
        os.write(response.getBytes());
        os.close();

    }
}
