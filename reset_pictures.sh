# called from command php artisan db:seed
rm storage/app/public/images/ -rf
cp seedImages/images storage/app/public/images -r
