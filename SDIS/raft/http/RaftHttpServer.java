package raft.http;

import com.sun.net.httpserver.HttpServer;
import raft.Raft;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.Executor;

public class RaftHttpServer {

    public RaftHttpServer(int port, Executor executor, Raft raft) {
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
            server.createContext("/set", new SetHandler(raft));
            server.setExecutor(executor);
            server.start();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
