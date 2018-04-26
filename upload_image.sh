#!/bin/bash

# Stop execution if a step fails
set -e

DOCKER_USERNAME=ros65536 # Replace by your docker hub username
IMAGE_NAME=lbaw1764

# Modified to work from docker container
docker exec lbaw_php composer install # Ensure that dependencies are available
docker exec lbaw_php php artisan clear-compiled
docker exec lbaw_php php artisan optimize

docker build -t ros65536/lbaw1764 .
docker push ros65536/lbaw1764
