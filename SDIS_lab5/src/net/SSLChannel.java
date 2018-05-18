package net;

import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Arrays;

import javax.net.ssl.SSLServerSocket;
import javax.net.ssl.SSLServerSocketFactory;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;

public class SSLChannel {
	
	private ServerSocket serverSocket;
	private Socket socket;
	private InetAddress ip;
	private int port;
	private final static int buffer_size = 64000; 
	
	public SSLChannel(String ip, int port){
		System.setProperty("javax.net.ssl.keyStore", "client.keys");
		System.setProperty("javax.net.ssl.trustStore", "truststore");
		System.setProperty("javax.net.ssl.keyStorePassword", "123456");
		try {
			this.ip = InetAddress.getByName(ip);
			this.port = port;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}
	
	public SSLChannel(int port){
		System.setProperty("javax.net.ssl.keyStore", "server.keys");
		System.setProperty("javax.net.ssl.trustStore", "truststore");
		System.setProperty("javax.net.ssl.keyStorePassword", "123456");
		
		try {
			serverSocket = ((SSLServerSocketFactory) SSLServerSocketFactory.getDefault()).createServerSocket(port);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public boolean accept_connection(){
		try {
			socket = serverSocket.accept();
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}
	
	public boolean connect(){
		try {
			socket = ((SSLSocketFactory) SSLSocketFactory.getDefault()).createSocket(ip, port);
			((SSLSocket)socket).startHandshake();
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}
	
	public boolean disconnect(){
		try {
			socket.close();
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}
	
	public boolean send(String message){
		try {
			socket.getOutputStream().write(message.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}
	
	public String receive(){
		byte[] data = new byte[buffer_size];
		int bytes_read = 0;
		
		try {
			bytes_read = socket.getInputStream().read(data);
		} catch (IOException e) {
			e.printStackTrace();
			return "";
		}
		
		if(bytes_read == -1){
			return "";
		}
		else{
			data = Arrays.copyOfRange(data, 0, bytes_read);
		}
		
		return new String(data);
	}
	
}
