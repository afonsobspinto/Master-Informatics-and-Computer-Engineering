#!/bin/bash

for filename in resources/assets/less/*.less; do
    name=$(basename "$filename" .less)
    echo $filename
    php vendor/bin/lessc -w resources/assets/less/$name.less public/css/$name.css &
done

