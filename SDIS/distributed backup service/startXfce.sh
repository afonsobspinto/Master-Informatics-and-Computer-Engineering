#!/usr/bin/env bash

mkdir -p bin
javac $(find ./* | grep .java) -d bin
xfce4-terminal -e "java -jar McastSnooper.jar 224.0.0.1:4446 224.0.0.2:4447 224.0.0.3:4448" &
cd bin
killall rmiregistry 2>/dev/null &
xfce4-terminal -e rmiregistry  &
sleep 1
xfce4-terminal -e "java Server.Peer.InitiatorPeer 1.0 1 //127.0.0.1/Peer1 224.0.0.1 4446 224.0.0.2 4447 224.0.0.3 4448"  &
xfce4-terminal -e "java Server.Peer.InitiatorPeer 1.0 2 //127.0.0.1/Peer2 224.0.0.1 4446 224.0.0.2 4447 224.0.0.3 4448"  &
xfce4-terminal -e "java Server.Peer.InitiatorPeer 1.0 3 //127.0.0.1/Peer3 224.0.0.1 4446 224.0.0.2 4447 224.0.0.3 4448"  &
sleep 1
xfce4-terminal -e "java Client.TestApp //127.0.0.1/Peer1 BACKUP ../TestFiles/cv.pdf 2" &
xfce4-terminal -e "java Client.TestApp //127.0.0.1/Peer1 BACKUP ../TestFiles/afonso.jpg 2" &
xfce4-terminal -e "java Client.TestApp //127.0.0.1/Peer1 BACKUP ../TestFiles/test.txt 2" &
read -n 1 -s
xfce4-terminal -e "java Client.TestApp //127.0.0.1/Peer1 RESTORE ../TestFiles/cv.pdf 2" &
read -n 1 -s
xfce4-terminal -e "java Client.TestApp //127.0.0.1/Peer1 DELETE ../TestFiles/cv.pdf 2" &
read -n 1 -s
xfce4-terminal -e "java Client.TestApp //127.0.0.1/Peer2 RECLAIM 63999995289

