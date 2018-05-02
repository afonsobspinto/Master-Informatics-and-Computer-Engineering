#!/usr/bin/env bash
/bin/cp -rf Element.java keep/
/bin/cp -rf SemanticManager.java keep/
/bin/cp -rf SemanticVisitor.java keep/
/bin/cp -rf SimpleNode.java keep/
/bin/cp -rf SymbolTable.java keep/
/bin/cp -rf SymbolTableVisitor.java keep/
/bin/cp -rf SymbolTableContextManager.java keep/
/bin/cp -rf Type.java keep/
/bin/cp -rf JasminVisitor.java keep/
/bin/cp -rf JasminGenerator.java keep/
jjtree Parser.jjt
javacc Parser.jj
javac *.java
java Parser ../yalFiles/yalTestFiles/array1.yal
#./_runAllTests.sh
#./_runAllErrorTests.sh
#java Parser ../yalFiles/yalSemanticFiles/test.yal
rm *.java
rm *.class
rm *.jj
cp keep/* .