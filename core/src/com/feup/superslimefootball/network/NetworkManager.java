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

    private String ipAddress = "localhost";
    private int tcpPort = 22222;
    private int udpPortServer = 22223;
    private int udpPortClient = 22224;
    private DatagramSocket udpSocket;
    private Socket tcpSocket;
    private ServerSocket serverSocket;

    private boolean connected = false;
    private boolean server = false;

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
        try{
            serverSocket.accept();
            System.out.println("Client request to join");
            connected = true;
        }catch (IOException e){
            e.printStackTrace();
        }
    }

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
            e.printStackTrace();
        }


    }

    public Object receiveData(){
        try{
            byte[] recvBuf = new byte[5000];
            DatagramPacket packet = new DatagramPacket(recvBuf, recvBuf.length);
            udpSocket.receive(packet);
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(recvBuf);
            ObjectInputStream objectInputStream = new ObjectInputStream(new BufferedInputStream(byteArrayInputStream));
            Object object =  objectInputStream.readObject();
            objectInputStream.close();
            return object;

        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        return null;
    }

    public boolean isConnected() {
        return connected;
    }

    public boolean isServer() {
        return server;
    }
}
