#Comp G51
A repository to host COMP project

GROUP: G27

Afonso Pinto - up201503316
Bruno Moreno - up201504781
João Moura - up201405197
Tomás Oliveira - up201504746

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