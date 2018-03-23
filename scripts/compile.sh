#!/usr/bin/env bash

jjtree ../src/Parser.jjt
javacc Parser.jj
javac  -d ../out *.java
mv *.java ../out
mv *.jj ../out
cp ../src/SimpleNode.java ../out