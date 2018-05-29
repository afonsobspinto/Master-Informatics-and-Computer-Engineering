#!/bin/bash
set -e

env >> /var/www/.env
php-fpm7.1 -D
cd /var/www
php artisan migrate:refresh
php artisan db:seed
rm public/storage -f
ln -s /var/www/storage/app/public /var/www/public/storage
cron
nginx -g "daemon off;"
