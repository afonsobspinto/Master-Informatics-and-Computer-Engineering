package server;

import java.util.Hashtable;

import client.Client;
import net.SSLChannel;

public class Server {
	private Hashtable<String, String> plates;
	private SSLChannel channel;
	
	
	public Server(int port){
		channel = new SSLChannel(port);
		plates = new Hashtable<>();
	}
	
	public void start(){
		channel.accept_connection();
		while(parseMessage(channel.receive())){
		}
		channel.disconnect();
	}
	
	private boolean parseMessage(String message){
		String[] m = message.split("[ ]+");
		
		System.out.println(message);
		
		switch(m[0]){
		case "LOOKUP":
			if(plates.containsKey(m[1])){
				channel.send(m[1]+" "+plates.get(m[1]));
				System.out.println("Vehicle found!");
			}
			else{
				channel.send("-1");
				System.out.println("Vehicle not found!");
			}
			break;
		case "REGISTER":
			if(!plates.containsKey(m[1])){
				plates.put(m[1], m[2]);
				channel.send(plates.size()+"");
				System.out.println("Vehicle Registered!");
			}
			else{
				channel.send("-1");
				System.out.println("Vehicle not found...");
			}
			break;
		case "EXIT":
			System.out.println("closing server");
			return false;
		}
		
		return true;
	}
	
	
	public static void main(String[] args){
		Server s = new Server(25566);
		
		s.start();
	}

}
