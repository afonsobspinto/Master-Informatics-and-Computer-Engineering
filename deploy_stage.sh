cd /home/ldsog02/t4g2/
cat server/staging.env > server/.env
cat server/docker-compose_dev.yml server/docker-compose.yml
cd /home/ldsog02/staging/server
sudo docker-compose down
cd /home/ldsog02
sudo rm -rf /home/ldsog02/staging/server
cp -r /home/ldsog02/t4g2/server /home/ldsog02/staging
sudo rm -rf /home/ldsog02/t4g2
cd /home/ldsog02/staging/server
sudo docker-compose up
