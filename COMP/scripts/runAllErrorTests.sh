#!/usr/bin/env bash

cd ../out

for file in ../yalFiles/yalErrorFiles/*.yal
do
    java Parser "$file"
    read -n 1 -s
done