package com.feup.superslimefootball.network;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;
import java.net.SocketTimeoutException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

/**
 * Created by afonso on 6/1/17.
 */

public class NetworkManager implements Runnable {

    /**
     * The singleton instance of the game model
     */
    private static NetworkManager instance;

    /**
     * The string of the ipAddress
     */
    private String ipAddress = "localhost";

    /**
     * The tcp Port
     */
    private int tcpPort = 22222;

    /**
     * The udpPortServer
     */
    private int udpPortServer = 22223;

    /**
     * The udpPortClient
     */
    private int udpPortClient = 22224;

    /**
     * The udp Socket
     */
    private DatagramSocket udpSocket;

    /**
     * The tcp Socket
     */
    private Socket tcpSocket;

    /**
     * The server Socket
     */
    private ServerSocket serverSocket;

    /**
     * The boolean representing if the network is connect
     */
    private boolean connected = false;

    /**
     * The boolean representing if the server is activated
     */
    private boolean server = false;

    /**
     * The boolean representing if the opponent is connect
     */
    private boolean opponentDisconnected = false;

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

        if(!connected)
            listenForServerRequest();
    }

    /**
     * Gets the IPAddress of the player
     */
    private void getOwnIPAddress(){
        this.ipAddress = new String();

        List<String> addresses = new ArrayList<String>();

        checksNetworkInterface(addresses);

        for(String str:addresses)
        {
            this.ipAddress = this.ipAddress + str + "\n";
        }

        System.out.println(ipAddress);

    }

    /**
     * Checks Network Interface Exception
     */
    private void checksNetworkInterface(List<String> addresses){
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
    }


    /**
     * Finds a Server Request
     */
    private void listenForServerRequest(){
        try{
            serverSocket.accept();
            System.out.println("Client request to join");
            connected = true;
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    /**
     * Connects with the Server
     */
    private boolean connect(){
        try{
            tcpSocket = new Socket(ipAddress, tcpPort);
            udpSocket = new DatagramSocket(udpPortClient);
            connected = true;
        }catch (IOException e){
            System.out.println("Unable to connect");
            return false;
        }

        System.out.println("Connection successful");
        return true;
    }

    /**
     * Initializes the Server
     */
    private void initializeServer() {
        try {
            udpSocket = new DatagramSocket(udpPortServer);
            serverSocket = new ServerSocket(tcpPort, 8, InetAddress.getByName(ipAddress));
            System.out.println("Server Initialized");
            server = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Sends Data
     *
     * @param object
     */
    public void sendData(Object object){
        try{
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(5000);
            ObjectOutputStream objectOutputStream = new ObjectOutputStream((new BufferedOutputStream(byteArrayOutputStream)));
            objectOutputStream.flush();
            objectOutputStream.writeObject(object);
            objectOutputStream.flush();
            byte[] sendBuf = byteArrayOutputStream.toByteArray();
            DatagramPacket packet = (server) ? new DatagramPacket(sendBuf, sendBuf.length, InetAddress.getByName(ipAddress), udpPortClient) : new DatagramPacket(sendBuf, sendBuf.length, InetAddress.getByName(ipAddress), udpPortServer);
            udpSocket.send(packet);
            objectOutputStream.close();
        } catch (IOException e) {
            opponentDisconnected = true;
            e.printStackTrace();
        }


    }

    /**
     * Receives Data
     */
    public Object receiveData(){
        try{

            byte[] recvBuf = new byte[5000];
            DatagramPacket packet = new DatagramPacket(recvBuf, recvBuf.length);
            udpSocket.setSoTimeout(2000);
            udpSocket.receive(packet);
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(recvBuf);
            ObjectInputStream objectInputStream = new ObjectInputStream(new BufferedInputStream(byteArrayInputStream));
            Object object =  objectInputStream.readObject();
            objectInputStream.close();
            return object;

        }catch (SocketTimeoutException e){

            opponentDisconnected = true;
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * Returns the connected boolean
     *
     * @return connected
     */
    public boolean isConnected() {
        return connected;
    }

    /**
     * Returns the server boolean
     *
     * @return server
     */
    public boolean isServer() {
        return server;
    }

    /**
     * Returns the opponentDisconnected boolean
     *
     * @return opponentDisconnected
     */
    public boolean isOpponentDisconnected() {
        return opponentDisconnected;
    }

    /**
     * Resets the Singleton Instance
     */
    public static void resetInstance(){
        instance = new NetworkManager();
    }

    /**
     * Closes the Sockets
     */
    public void closeSockets(){
        udpSocket.disconnect();
        udpSocket.close();
        try {
            if(tcpSocket!=null)
            tcpSocket.close();
            if(server && serverSocket!=null) serverSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
