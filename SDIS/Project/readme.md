# SDIS 2016/2017 - 2nd Semester - T02G03

## Project 1 -- Distributed Backup Service

The idea is to use the free disk space of the computers in a LAN for backing up files in other computers in the same LAN. The service is provided by servers in an environment that is assumed cooperative (rather than hostile). Nevertheless, each server retains control over its own disks and, if needed, may reclaim the space it made available for backing up other computers' files. 

### Instructions:

Script to compile, run the rmi, snooper and launch peers:

./start.sh

### Run manually:

  - Create the directory for the binaries:

    `mkdir -p bin`

  - Create the binaries:

    `javac $(find ./* | grep .java) -d bin`

  - Launch the logger to debug the program:
    
    `konsole -title logger -e java -jar McastSnooper.jar 224.0.0.1:4446 224.0.0.2:4447 224.0.0.3:4448 &`

  - Change directory to bin:

    `cd bin`

  - Kill any rmi existing process:

    `killall rmiregistry 2>/dev/null &`

  - Launch a new process that makes rmiregistry on bin:

    `konsole -title rmiregistry -e rmiregistry  &`

  - Launches a peer with address 127.0.0.1 to the RMI Object PeerN with port and gate address 224.0.0.1 ... 224.0.0.N
  
    ```
    konsole -title peer1 -e java Server.Peer.InitiatorPeer 1.0 1 //127.0.0.1/Peer1 224.0.0.1 4446 224.0.0.2 4447 224.0.0.3 4448  &
    
    konsole -title peer2 -e java Server.Peer.InitiatorPeer 1.0 2 //127.0.0.1/Peer2 224.0.0.1 4446 224.0.0.2 4447 224.0.0.3 4448  &
    
    konsole -title peer3 -e java Server.Peer.InitiatorPeer 1.0 3 //127.0.0.1/Peer3 224.0.0.1 4446 224.0.0.2 4447 224.0.0.3 4448  &
    
    sleep 1
    
    ```
  - Run the backup protocol:

    `konsole -title testApp --noclose  -e java Client.TestApp //127.0.0.1/Peer1 BACKUP ../TestFiles/cv.pdf 2 &`

  - Run the delete protocol:
    
    `konsole -title testApp --noclose  -e java Client.TestApp //127.0.0.1/Peer1 DELETE ../TestFiles/cv.pdf`

  - Run the restore protocol:
    
    `konsole -title testApp --noclose  -e java Client.TestApp //127.0.0.1/Peer1 RESTORE ../TestFiles/cv.pdf`

  - Run the reclaim protocol:
  
    `konsole -title testApp --noclose  -e java Client.TestApp //127.0.0.1/Peer1 RECLAIM 0`

  - Run the state protocol:
    
    `konsole -title testApp --noclose  -e java Client.TestApp //127.0.0.1/Peer1 STATE `
    
  ## Authors
* Afonso Pinto – [@afonsobspinto](https://github.com/afonsobspinto)
* Tomás Oliveira – [@Toliveira97](https://github.com/Toliveira97)
