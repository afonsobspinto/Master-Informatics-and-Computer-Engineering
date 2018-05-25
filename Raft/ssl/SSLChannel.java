package dbs.net.ssl;

import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.UnknownHostException;

import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.SSLServerSocketFactory;

public class SSLChannel {
	private ServerSocket serverSocket;
	private Socket socket;
	private InetAddress ip;
	private int port;
	private int buffer_size;
	
	public SSLChannel(String ip, int port){
		System.setProperty("javax.net.ssl.keyStore", "keystore/client.keys");
		System.setProperty("javax.net.ssl.trustStore", "keystore/truststore");
		System.setProperty("javax.net.ssl.keyStorePassword", "123456");
		try {
			this.ip = InetAddress.getByName(ip);
			this.port = port;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}
	
	public SSLChannel(int port){
		System.setProperty("javax.net.ssl.keyStore", "keystore/server.keys");
		System.setProperty("javax.net.ssl.trustStore", "keystore/truststore");
		System.setProperty("javax.net.ssl.keyStorePassword", "123456");
		
		try {
			serverSocket = ((SSLServerSocketFactory) SSLServerSocketFactory.getDefault()).createServerSocket(port);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public SSLChannel accept() {
		try (ServerSocket ss = serverSocket) {
			socket = serverSocket.accept();
			buffer_size = socket.getReceiveBufferSize();
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		
		return this;
	}
	
	public boolean connect(){
		try {
			socket = ((SSLSocketFactory) SSLSocketFactory.getDefault()).createSocket(ip, port);
			((SSLSocket)socket).startHandshake();
			buffer_size = socket.getReceiveBufferSize();
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
		
		return new String(data, 0, bytes_read);
	}
}
