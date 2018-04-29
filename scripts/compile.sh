#!/usr/bin/env bash

jjtree ../src/Parser.jjt
javacc Parser.jj
javac  -d ../out *.java
mv -f *.java ../out
mv -f *.jj ../out
/bin/cp -rf ../src/*.java ../out
/bin/cp -rf ../src/*.class ../out