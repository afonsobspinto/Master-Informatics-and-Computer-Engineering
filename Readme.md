#Comp G51
A repository to host COMP project

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
8. Add fully Semantic Analysis.
9. Add very partially jasmin code generation.