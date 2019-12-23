cd /home/ldsog02/t4g2/
echo "Copying prod.env into .env"
cat server/prod.env > server/.env
cd /home/ldsog02/prod/server
echo "Shutting server down"
sudo docker-compose down
cd /home/ldsog02
echo "Removing old server data"
sudo rm -rf /home/ldsog02/prod/server
echo "Adding new server data"
cp -r /home/ldsog02/t4g2/server /home/ldsog02/prod
echo "Removing cloned repo"
sudo rm -rf /home/ldsog02/t4g2
cd /home/ldsog02/prod/server
sudo docker-compose up -d
echo "Starting server"

