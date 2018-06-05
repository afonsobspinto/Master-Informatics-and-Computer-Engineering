#Compiler of the yal0.4 language to Java Bytecodes

### GROUP: G27

Afonso Pinto | up201503316 | Grade: 20 | Contribution: 25% 
Bruno Moreno | up201504781 | Grade: 20 | Contribution: 25%  
João Moura | up201405197 | Grade: 20 | Contribution: 25%
Tomás Oliveira | up201504746 | Grade: 20 | Contribution: 25%  


### SUMMARY: 
(Describe what your tool does and its main features.)   
The intention of this assignment was to develop a "mini-compiler" which should be able to compile yal code to JVM instructions accepted by Jasmin in order to create a '.class' file with the result code.

 

### EXECUTE: 
(indicate how to run your tool)
jjtree Parser.jjt
javacc Parser.jj
javac *.java
java Parser file.yal
(in wich file is the name of the file you want to generate)
 

### DEALING WITH SYNTACTIC ERRORS: 
(Describe how the syntactic error recovery of your tool does work. Does it exit after the first error?)

 

#### SEMANTIC ANALYSIS: 
(Refer the semantic rules implemented by your tool.)

 

#### INTERMEDIATE REPRESENTATIONS (IRs): 
(for example, when applicable, briefly describe the HLIR (high-level IR) and the LLIR (low-level IR) used, if your tool includes an LLIR with structure different from the HLIR)

 

#### CODE GENERATION: 
(when applicable, describe how the code generation of your tool works and identify the possible problems your tool has regarding code generation.)

 

#### OVERVIEW: 
(refer the approach used in your tool, the main algorithms, the third-party tools and/or packages, etc.)

 

#### TESTSUITE AND TEST INFRASTRUCTURE: 
(Describe the content of your testsuite regarding the number of examples, the approach to automate the test, etc.)

 

#### TASK DISTRIBUTION: 
(Identify the set of tasks done by each member of the project.)
Afonso Pinto:
Bruno Moreno: 
João Moura:
Tomás Oliveira:

 

#### PROS: 
(Identify the most positive aspects of your tool)

 

#### CONS: 
(Identify the most negative aspects of your tool)



## Checkpoint 1

1. Develop a parser for yal using JavaCC and taking as starting point the yal grammar furnished with a global LL(1) replaced by a larger local lookahead when needed.
2. Include error treatment and recovery mechanisms -> Deep Error Recovery
3. Proceed with the specification of the file jjt to generate, using JJTree, a new version of the parser including
 in this case the generation of the syntax tree(the generated tree should be an AST),
 annotating the nodes and leafs of the tree with the information (including tokens) necessary to perform the subsequent compiler steps;
 
## Checkpoint 2

4. Change grammar to work only with LL(1).
5. Include error treatment and recovery mechanisms -> Deep Error Recovery. (aborted by teacher suggestion due to time management problems)
6. Improve AST.
7. Create a symbol table using the Visitor Pattern.
8. Add full Semantic Analysis.
9. Add very partially jasmin code generation.

## Checkpoint 3

10. Completed code generation for the invocation of functions in yal.
11. Added code generation for arithmetic expressions.
12. Added code generation for conditional instructions.
13. Added code generation for loops.
14. Added code generation for arrays.
15. Temporarily disabled semantic analysis, as it is currently misjudging errors and preventing code generation.