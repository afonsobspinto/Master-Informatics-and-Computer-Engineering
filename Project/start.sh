#!/usr/bin/env bash

mkdir -p bin
javac $(find ./* | grep .java) -d bin
konsole -title logger -e java -jar McastSnooper.jar 224.0.0.1:4446 224.0.0.2:4447 224.0.0.3:4448 &
cd bin
killall rmiregistry 2>/dev/null &
konsole -title rmiregistry -e rmiregistry  &
sleep 1
konsole -title peer1 -e java Server.Peer.InitiatorPeer 1.0 1 //127.0.0.1/Peer1 224.0.0.1 4446 224.0.0.2 4447 224.0.0.3 4448  &
konsole -title peer2 -e java Server.Peer.InitiatorPeer 1.0 2 //127.0.0.1/Peer2 224.0.0.1 4446 224.0.0.2 4447 224.0.0.3 4448  &
konsole -title peer3 -e java Server.Peer.InitiatorPeer 1.0 3 //127.0.0.1/Peer3 224.0.0.1 4446 224.0.0.2 4447 224.0.0.3 4448  &
sleep 1
konsole -title testApp --noclose  -e java Client.TestApp //127.0.0.1/Peer1 BACKUP ../TestFiles/20MB.zip 2

