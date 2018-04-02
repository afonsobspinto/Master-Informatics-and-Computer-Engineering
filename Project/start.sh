#!/usr/bin/env bash

mkdir -p bin #Cria o diretorio para ter os binarios
javac $(find ./* | grep .java) -d bin #Crias os binarios
konsole -title logger -e java -jar McastSnooper.jar 224.0.0.1:4446 224.0.0.2:4447 224.0.0.3:4448 & #Lança o logger para fazer debug do programa
cd bin #muda diretorio para bin
killall rmiregistry 2>/dev/null & #mata qql processo rmi existente
konsole -title rmiregistry -e rmiregistry  & #lança um novo processo que faz rmiregistry NO BIN!
sleep 1 #espera um sec
konsole -title peer1 -e java Server.Peer.InitiatorPeer 1.0 1 //127.0.0.1/Peer1 224.0.0.1 4446 224.0.0.2 4447 224.0.0.3 4448  & #lança um peer no address 127.0.0.1 para o RMI Object Peer1 com endereços dos canais e portas 224.0.0.1 ...
konsole -title peer2 -e java Server.Peer.InitiatorPeer 1.0 2 //127.0.0.1/Peer2 224.0.0.1 4446 224.0.0.2 4447 224.0.0.3 4448  &
konsole -title peer3 -e java Server.Peer.InitiatorPeer 1.0 3 //127.0.0.1/Peer3 224.0.0.1 4446 224.0.0.2 4447 224.0.0.3 4448  &
sleep 1
konsole -title testApp --noclose  -e java Client.TestApp //127.0.0.1/Peer1 BACKUP ../TestFiles/cv.pdf 2 & # Corre o testeApp no rmi Object Peer1 para backup ...
read -n 1 -s
konsole -title testApp --noclose  -e java Client.TestApp //127.0.0.1/Peer1 RESTORE ../TestFiles/cv.pdf &
read -n 1 -s
konsole -title testApp --noclose  -e java Client.TestApp //127.0.0.1/Peer1 DELETE ../TestFiles/cv.pdf


