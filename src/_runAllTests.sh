#!/usr/bin/env bash

for file in ../yalFiles/yalTestFiles/*.yal
do
    java Parser "$file"
done