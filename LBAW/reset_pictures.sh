#!/usr/bin/env bash
# called from command php artisan db:seed
mkdir -p storage/app/public/images/
rm storage/app/public/images/ -rf
cp seedImages/images storage/app/public/images -r
