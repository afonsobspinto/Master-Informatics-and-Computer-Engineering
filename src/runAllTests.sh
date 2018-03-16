#!/usr/bin/env bash

for file in ../yalFiles/*.yal
do
    java Parser "$file"
done