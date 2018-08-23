#!/usr/bin/env bash

cd ../out

for file in ../yalFiles/yalTestFiles/*.yal
do
    java Parser "$file"
done