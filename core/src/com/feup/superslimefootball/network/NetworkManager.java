package com.feup.superslimefootball.network;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

/**
 * Created by afonso on 6/1/17.
 */

public class NetworkManager implements Runnable {

    private String ipAddress = "localhost";
    private int port = 22222;
    private Socket socket;
    private DataOutputStream dataOutputStream;
    private DataInputStream dataInputStream;

    private ServerSocket serverSocket;

    private boolean connected = false;
    private boolean server = false;


    @Override
    public void run() {
        if(!connect()) initializeServer();

        if(!connected) //todo: add condition to distinguish btw server and client
            listenForServerRequest();
    }

    private void getOwnIPAddress(){
        this.ipAddress = new String();

        List<String> addresses = new ArrayList<String>();

        try {
            Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
            for(NetworkInterface ni : Collections.list(interfaces)){
                for(InetAddress address : Collections.list(ni.getInetAddresses()))
                {
                    if(address instanceof Inet4Address){
                        addresses.add(address.getHostAddress());
                    }
                }
            }
        } catch (SocketException e) {
            e.printStackTrace();
        }
        for(String str:addresses)
        {
            this.ipAddress = this.ipAddress + str + "\n";
        }

        System.out.println(ipAddress);

    }

    private void listenForServerRequest(){
        Socket socket = null;
        try{
            socket = serverSocket.accept();
            dataOutputStream = new DataOutputStream(socket.getOutputStream());
            dataInputStream = new DataInputStream(socket.getInputStream());
            System.out.println("Client request to join");
            connected = true;
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    private boolean connect(){
        try{
            socket = new Socket(ipAddress, port);
            dataOutputStream = new DataOutputStream(socket.getOutputStream());
            dataInputStream = new DataInputStream(socket.getInputStream());
            connected = true;
        }catch (IOException e){
            System.out.println("Unable to connect");
            return false;
        }

        System.out.println("Connection successful");
        return true;
    }

    private void initializeServer() {
        try {
            serverSocket = new ServerSocket(port, 8, InetAddress.getByName(ipAddress));
            System.out.println("Server Initialized");
            server = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean isConnected() {
        return connected;
    }

    public boolean isServer() {
        return server;
    }
}
