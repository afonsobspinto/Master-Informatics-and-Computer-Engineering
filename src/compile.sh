#!/usr/bin/env bash

jjtree Parser.jjt
javacc Parser.jj
javac *.java