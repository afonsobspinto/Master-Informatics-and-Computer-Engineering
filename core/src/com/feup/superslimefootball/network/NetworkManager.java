package com.feup.superslimefootball.network;

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

/**
 * Created by afonso on 6/1/17.
 */

public class NetworkManager {

    private String ipAddress;

    public NetworkManager() {
        getOwnIPAddress();
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
}
