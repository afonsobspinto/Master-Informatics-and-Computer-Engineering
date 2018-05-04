#!/bin/bash
set -e

env >> /var/www/.env
php-fpm7.1 -D
php artisan migrate:refresh
php artisan db:seed
nginx -g "daemon off;"
