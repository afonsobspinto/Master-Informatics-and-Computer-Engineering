#!/bin/bash
#File to startup the Hyperledger Composer REST API to interact with Hyperledger Fabric Network
#ONLY RUN THIS FROM THIS SCRIPTS OWN DIRECTORY

composer about &>/dev/null #composer about is the PHP dependency manager

if [ $? -eq 0 ] || [ "$1" = "-npx" ];
  then
    NPX_PREFIX='npx'
    echo "Composer wasn't found globally installed, we'll use the one present in node_modules"
  else
    NPX_PREFIX=''
fi

$NPX_PREFIX composer card delete -c admin@mogplay
rm -f mogplay@0.0.8.bna
rm -f mogplay.card

$NPX_PREFIX composer archive create --sourceType dir --sourceName .

$NPX_PREFIX composer network install --archiveFile mogplay@0.0.8.bna --card PeerAdmin@hlfv1

$NPX_PREFIX composer network start --networkName mogplay --networkVersion 0.0.8 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file mogplay.card

$NPX_PREFIX composer card import --file mogplay.card

$NPX_PREFIX composer network ping --card admin@mogplay


# Absolute path to this script, e.g. /home/user/bin/foo.sh
SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPT_PATH=$(dirname "$SCRIPT")


export COMPOSER_PROVIDERS='{
 "jwt": {
  "provider": "jwt",
  "module": "'$SCRIPT_PATH'/custom-jwt.js",
  "secretOrKey": "gSi4WmttWuvy2ewoTGooigPwSDoxwZOy",
  "authScheme": "saml",
  "successRedirect": "/",
  "failureRedirect": "/"
  }
}'

#Sets the shell into interactive mode
set -m

$NPX_PREFIX composer-rest-server -c admin@mogplay -m true -n never -p $COMPOSER_PORT &

$NPX_PREFIX composer card export -c admin@mogplay -f genesis.card

rm -f ../server/server/src/composer/genesis.card

mv genesis.card ../server/server/src/composer/.

#Foregrounds the Composer Rest Server
fg %1
