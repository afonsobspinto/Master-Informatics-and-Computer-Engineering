cd /home/ldsog02/prod/server
docker-compose down
cd /home/ldsog02
rm -rf /home/ldsog02/prod/server
cp /home/ldsog02/t4g2/server /home/ldsog02/prod
rm -rf /home/ldsog02/t4g2
cd /home/ldsog02/prod/server
docker-compose up
