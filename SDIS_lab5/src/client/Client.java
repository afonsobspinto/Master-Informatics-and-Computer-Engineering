package client;

import net.SSLChannel;

public class Client {
	private SSLChannel channel;
	
	public Client(String ip, int port){
		channel = new SSLChannel(ip, port);
		channel.connect();
	}
	
	public String lookup(String plate){
		channel.send("LOOKUP" + " " + plate);
		return channel.receive();
	}
	
	public String register(String plate, String name){
		channel.send("REGISTER" + " " + plate + " " + name);
		return channel.receive();
	}
	
	public void disconnect(){
		channel.send("EXIT");
		channel.disconnect();
	}
	
	public static void main(String[] args){
		Client c = new Client("localhost", 25566);
		System.out.println("connected");
		
		System.out.println(c.register("A3-F5-46", "Maria"));
		System.out.println(c.register("A3-F5-47", "Jose"));
		System.out.println(c.register("A3-F5-48", "Joao"));
		System.out.println(c.register("A3-F5-49", "Pedro"));
		
		System.out.println(c.lookup("A3-F5-46"));
		System.out.println(c.lookup("A3-F5-47"));
		System.out.println(c.lookup("A3-F5-48"));
		System.out.println(c.lookup("A3-F5-49"));
		System.out.println(c.lookup("A3-F5-50"));
		
		c.disconnect();
	}
}
