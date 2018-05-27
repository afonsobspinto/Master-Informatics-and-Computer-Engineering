package raft.net.ssl;

import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.ServerSocket;
import java.util.Arrays;
import java.util.Base64;
import java.util.LinkedList;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.SSLServerSocketFactory;

public class SSLChannel {
	private ServerSocket serverSocket;
	private Socket socket;
	private InetSocketAddress address;
	private LinkedList<String> received = new LinkedList<>();
	
	private byte[] data;
	private int BUFFER_SIZE;
	
	public SSLChannel(InetSocketAddress address){
		System.setProperty("javax.net.ssl.keyStore", "raft/net/ssl/keystore/client.keys");
		System.setProperty("javax.net.ssl.trustStore", "raft/net/ssl/truststore");
		System.setProperty("javax.net.ssl.keyStorePassword", "123456");
		this.address = address;
	}
	
	public SSLChannel(Integer port){
		System.setProperty("javax.net.ssl.keyStore", "raft/net/ssl/keystore/server.keys");
		System.setProperty("javax.net.ssl.trustStore", "raft/net/ssl/truststore");
		System.setProperty("javax.net.ssl.keyStorePassword", "123456");
		
		try {
			serverSocket = SSLServerSocketFactory.getDefault().createServerSocket(port);
		} catch (Exception e) {
		//  This one really shouldn't happen
			e.printStackTrace();
		}
	}
	
	public boolean accept() {
		try (ServerSocket ss = serverSocket) {
			socket = serverSocket.accept();
		//	((SSLSocket) socket).startHandshake();
			BUFFER_SIZE = socket.getReceiveBufferSize();
			data = new byte[BUFFER_SIZE];
		} catch (Exception e) {
		//	e.printStackTrace();
			return false;
		}

		return true;
	}

	public boolean connect(){
		try {
			socket = SSLSocketFactory.getDefault().createSocket(address.getHostString(), address.getPort());
			((SSLSocket) socket).startHandshake();
			BUFFER_SIZE = socket.getReceiveBufferSize();
			data = new byte[BUFFER_SIZE];
		} catch (Exception e) {
		//	e.printStackTrace();
			return false;
		}

		return true;
	}
	
	public boolean disconnect(){
		try {
			socket.close();
		} catch (Exception e) {
		//	e.printStackTrace();
			return false;
		}

		return true;
	}
	
	public boolean send(String message) {
		return send(message.getBytes());
	}
	
	public boolean send(byte[] message) {
		byte[] data = new String(Base64.getEncoder().encode(message)).concat("\n").getBytes();
		
		try {
			socket.getOutputStream().write(data);
		} catch (Exception e) {
		//	e.printStackTrace();
			return false;
		}
		
		return true;
	}
	
	public String receiveString() {
		if (received.size() == 0) {
			int bytes_read = 0;

			try {
				bytes_read = socket.getInputStream().read(data);
			} catch (Exception e) {
			//	e.printStackTrace();
			} finally {
				if (bytes_read == -1) {
					return null;
				}
			}

			received = new LinkedList<>(Arrays.asList(new String(data, 0, bytes_read).split("\n")));
		}
		return new String(Base64.getDecoder().decode(received.removeFirst().getBytes()));
	}
	
	public byte[] receive() {
		if (received.size() == 0) {
			int bytes_read = 0;

			try {
				bytes_read = socket.getInputStream().read(data);
			} catch (Exception e) {
			//	e.printStackTrace();
			} finally {
				if (bytes_read == -1) {
					return null;
				}
			}

			received = new LinkedList<>(Arrays.asList(new String(data, 0, bytes_read).split("\n")));
		}
		
		return Base64.getDecoder().decode(received.removeFirst().getBytes());
	}

	public InetSocketAddress getRemoteAddress() {
		return socket != null ? (InetSocketAddress) socket.getRemoteSocketAddress() : null;
	}
}
