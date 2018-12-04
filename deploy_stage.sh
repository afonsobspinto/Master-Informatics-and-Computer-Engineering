cd /home/ldsog02/t4g2/
echo "Copying dev.env into .env"
cat server/dev.env > server/.env
echo "Copying docker-compose_dev.yml into docker-compose.yml"
cat server/docker-compose_dev.yml > server/docker-compose.yml
cd /home/ldsog02/staging/server
echo "Shutting server down"
sudo docker-compose down
cd /home/ldsog02
echo "Removing old server data"
sudo rm -rf /home/ldsog02/staging/server
echo "Adding new server data"
cp -r /home/ldsog02/t4g2/server /home/ldsog02/staging
echo "Removing cloned repo"
sudo rm -rf /home/ldsog02/t4g2
cd /home/ldsog02/staging/server
echo "Starting server"
sudo docker-compose up -d
