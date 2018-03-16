#!/usr/bin/env bash

for file in ../yalErrorFiles/*.yal
do
    java Parser "$file"
    read -n 1 -s
done