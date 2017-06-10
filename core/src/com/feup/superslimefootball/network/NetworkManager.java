package com.feup.superslimefootball.network;

import com.feup.superslimefootball.view.utilities.MoveEvent;

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

import static com.feup.superslimefootball.view.utilities.MoveEvent.getMoveEvent;

/**
 * Created by afonso on 6/1/17.
 */

public class NetworkManager implements Runnable {

    /**
     * The singleton instance of the game model
     */
    private static NetworkManager instance;

    private String ipAddress = "localhost";
    private int port = 22222;
    private Socket socket;
    private DataOutputStream dataOutputStream;
    private DataInputStream dataInputStream;

    private ServerSocket serverSocket;

    private boolean connected = false;
    private boolean server = false;
    private int errors = 0;


    /**
     * Returns a singleton instance of the game model
     *
     * @return the singleton instance
     */
    public static NetworkManager getInstance() {
        if (instance == null)
            instance = new NetworkManager();
        return instance;
    }


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


    public void sendInput(MoveEvent moveEvent){
        try {
            dataOutputStream.writeInt(moveEvent.getValue());
            dataOutputStream.flush();
        } catch (IOException e) {
            errors++;
            e.printStackTrace();
        }
    }

    public MoveEvent receiveInput(){
        try {
            return getMoveEvent(dataInputStream.readInt());
        } catch (IOException e) {
            errors++;
            e.printStackTrace();
        }
        return getMoveEvent(-1);
    }

    public boolean isConnected() {
        return connected;
    }

    public boolean isServer() {
        return server;
    }
}
