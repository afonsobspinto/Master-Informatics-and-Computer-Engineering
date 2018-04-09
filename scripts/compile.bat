@ECHO OFF

jjtree ../src/Parser.jjt
javacc Parser.jj
javac  -d ../out *.java
copy /Y ..\src\SimpleNode.java ..\out
copy /Y ..\src\SimpleNode.class ..\out
move /Y *.java ../out
move /Y *.jj ../out
copy /Y ..\out\SimpleNode.java ..\src
