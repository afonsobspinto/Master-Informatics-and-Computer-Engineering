#!/bin/bash
#Checks whether you have all the fabric dependencies
#
#Only tested with Node 8.16 If need install nvm and install 8.16
# nvm use 8
#
#Only run this form your LGP Repository base dir
#
#Please install the node modules inside: 
# Frontend - LGP_DIR/mogplay/mogplay 
# Composer - LGP_DIR/mogplay
#

NVM_VERSION='8' #Change to your correct verison
export FABRIC_VERSION='hlfv12'
FABRIC_DIR_BASE=~
FABRIC_DIR=$FABRIC_DIR_BASE'/fabric-dev-server'
export FABRIC_START_TIMEOUT=15

export COMPOSER_PORT=3001


#Path to your prefered Terminal Emulator uncomment to enforce it
#TERM_EMULATOR=gnome-terminal

#Project repository's base folder
LGP_DIR=$(pwd)


#Colors
RED='\033[0;31m'

#Functions
check_error () {
    if [ $? -ne 0 ];
    then
        echo "$1"
        exit 5
    fi
}

#Opens a new tab in current terminal (Deprecated)
run_new_terminal () {
    $TERM_EMULATOR -x $SHELL -c -i "nvm use ${NVM_VERSION}; $1; $SHELL;"
    #$TERM_EMULATOR -- $SHELL -c -i "$1; $SHELL;" (Opens in a completely new window)
}
#--------------------------------


#Checks for --fresh and prints usage info
if [ -n "$1" ] && [ "$1" != "--fresh" ];
then
    echo "USAGE: ./runProject.sh - runs resuming the whole project"
    echo "  --fresh - tears down the Hyperledger Fabric containers and removes"
    echo "      Hyperledger Composer's data located in ~/.composer"
    echo "  --fresh --no-chache is the same as simply --fresh and build docker image"
    echo "        using --no-cache flag"
    exit 1
fi


#Check for Docker and Docker-Composer
if ! command -v docker&>/dev/null;
then
    echo "Please install Docker"
    exit 2
fi

if ! command -v docker-compose&>/dev/null;
then
    echo "Please install Docker Compose"
    exit 2
fi


#Check for Composer Rest Server and Compose-CLI
if ! command -v composer-rest-server&>/dev/null;
then
    echo "Please install Composer Rest Server"
    echo -e "${RED}npm install -g composer-rest-server"
    exit 2
fi

if ! command -v composer&>/dev/null;
then
    echo "Please install Composer CLI"
    echo -e "${RED}npm install -g composer-cli"
    exit 2
fi

#Checks whether you have the fabric in that dir
if ! stat $FABRIC_DIR&>/dev/null;
then
    echo "Please download Hyperledger Fabric using"
    echo -e "${RED}mkdir ~/fabric-dev-server"
    echo -e "${RED}cd ~/fabric-dev-server"
    echo -e "${RED}curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz"
    echo -e "${RED}tar -xvf fabric-dev-servers.tar.gz"
    exit 3
fi

if [ "$1" = "--fresh" ];
then
    #Teardown Fabric containers
    $FABRIC_DIR/teardownFabric.sh

    #Delete composer info
    rm -rf ~/.composer
fi

#Teardown Fabric containers
$FABRIC_DIR/startFabric.sh

if [ "$1" = "--fresh" ];
then
    #Create the AdminCard
    $FABRIC_DIR/createPeerAdminCard.sh
fi

which $TERM_EMULATOR &>/dev/null #Check if it exists
if [ $? -ne 0 ] || [ -z "${TERM_EMULATOR}" ];
then
    declare -a TERMINAL_EMUS_ARR
    TERMINAL_EMUS_ARR=('gnome-terminal' 'terminator' 'konsole' 'iterm2' 'terminal' 'io.elementary.terminal')

    i=0
    while [ $i -lt ${#TERMINAL_EMUS_ARR[@]} ]
    do
        echo "${TERMINAL_EMUS_ARR[$i]}"
        if command -v ${TERMINAL_EMUS_ARR[$i]}&>/dev/null;
        then
            TERM_EMULATOR=${TERMINAL_EMUS_ARR[$i]}
            break;
        fi
        ((i++))
    done

    if [ -z ${TERM_EMULATOR} ];
    then
        echo -e "${RED}No known terminal emulator is installed,"
        echo -e "${RED}please install one of the following: gnome-terminal terminator konsole iterm2"
        echo -e "\n${RED}Otherwise specify it in TERM_EMULATOR (beggining of this script)"
        exit 4
    fi
fi

cd "$LGP_DIR"/mogplay/mogplay || exit 6

run_new_terminal "npm start"

cd .. || exit 6

#Starts the Hyperledger Composer
run_new_terminal "./startComposerAPI.sh"

check_error

#Wait for 5min to Composer to be alive
../wait-for-it.sh 127.0.0.1:$COMPOSER_PORT -t 300 

if [ "$1" = "--fresh" ];
then

    cd "$LGP_DIR"/server || exit 6
    docker-compose down
    
    #Composer Admin Cards
    rm -rf ./server/.composer
    cp -R ~/.composer ./server

    if [ "$2" = "--no-cache" ];
    then
         DOCKER_CACHE="--no-cache"
    fi

    docker-compose build $DOCKER_CACHE
fi

check_error "Wait for it, Composer did not start"

cd ../server || exit 6
docker-compose up

