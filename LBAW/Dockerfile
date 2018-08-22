FROM ubuntu:17.10

# Install dependencies
RUN apt-get update
RUN apt-get install -y --no-install-recommends libpq-dev vim nginx php-fpm php-mbstring php-xml php-pgsql

# Copy project code and install project dependencies
COPY . /var/www/
RUN chown -R www-data:www-data /var/www/

# Copy project configurations
COPY ./etc/php/php.ini /usr/local/etc/php/conf.d/php.ini
COPY ./etc/nginx/default.conf /etc/nginx/sites-enabled/default
COPY .env_production /var/www/.env
COPY docker_run.sh /docker_run.sh
RUN mkdir /var/run/php

# Install crontab and cron job
RUN apt-get install -y --no-install-recommends cron
RUN touch /var/log/laravel-cron.log
RUN echo "* * * * * /usr/bin/php /var/www/artisan schedule:run >> /var/log/laravel-cron.log 2>&1" >> mycron
RUN crontab mycron

# Start command
CMD sh /docker_run.sh
