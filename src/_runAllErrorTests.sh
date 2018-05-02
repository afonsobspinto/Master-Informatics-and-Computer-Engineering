#!/usr/bin/env bash

for file in ../yalFiles/yalErrorFiles/*.yal
do
    java Parser "$file"
    read -n 1 -s
done