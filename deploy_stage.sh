cd /home/ldsog02/prod/server
sudo docker-compose down
cd /home/ldsog02
sudo rm -rf /home/ldsog02/prod/server
cp -r /home/ldsog02/t4g2/server /home/ldsog02/prod
sudo rm -rf /home/ldsog02/t4g2
cd /home/ldsog02/prod/server
sudo docker-compose up
