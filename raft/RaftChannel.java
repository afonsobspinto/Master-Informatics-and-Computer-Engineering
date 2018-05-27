package raft;

import raft.net.ssl.SSLChannel;

class RaftChannel implements Runnable { // This is probably gonna be erased
	private Raft server;
	private SSLChannel channel;

	public RaftChannel(Raft server, SSLChannel channel) {
		this.server = server;
		this.channel = channel;
	}

	// new ObjectOutputStream(new ByteArrayOutputStream());

	@Override
	public void run() {
	/*	while (true) {
			switch (server.state) {
				case INITIALIZING:
					String msg1 = new String(Base64.getEncoder().encode("hi".getBytes())).concat("\n");
					String msg2 = new String(Base64.getEncoder().encode("there".getBytes())).concat("\n");
					System.out.println(msg1);
					channel.send(msg1);
					try {
						Thread.sleep(5000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					System.out.println(msg2);
					channel.send(msg2);
					break;
				case RUNNING:
					String msg = channel.receive();
					msg = new String(Base64.getDecoder().decode(msg.split("\n")[0].getBytes()));
					System.out.println(msg);
					break;
				case TERMINATING:

					break;
			}
		} */
	}
}
