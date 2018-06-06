**PROJECT TITLE: Parser: A Yal to JVM Compiler

**GROUP: G51

NAME1: Afonso Pinto, NR1: up201503316, GRADE1: 18, CONTRIBUTION: 25
NAME1: Bruno Moreno, NR1: up201504781, GRADE1: 18, CONTRIBUTION: 25
NAME1: João Moura, NR1: up201405197, GRADE1: 18, CONTRIBUTION: 25
NAME1: Tomás Oliveira, NR1: up201504746, GRADE1: 18, CONTRIBUTION: 25

GLOBAL Grade of the project: 18

** SUMMARY: 
Our compiler is capable of compiling yal code to JVM instructions accepted by Jasmin. In order to make our compiler as complete and efficient as possible, our group implemented the different fases that a regular compiler executes; these are the Lexical Analysis, the Syntatic Analysis, the Semantic Analysis and Code Generation. Our compiler is build with an LL(1) grammar (programming language "yal"). Our project's features also include the output of semantic errors that let the user know where the code should be improved.
 

** EXECUTE:
To compile the source code you should follow the folling comands:
To compile the source code you need javacc and jjtree, and follow the sequence:
jjtree Parser.jjt
javacc Parser.jj
javac *.java

To run our project, you should input the following command, where "file" is the file that will be used to generate the jasmin output file.
java Parser file.yal
The output file should be a new file with the same name as the input file, with "_generated" appended to its name, and with the extension .j.


**DEALING WITH SYNTACTIC ERRORS:
In the existence of any syntatic errors our compiler exits. However, the compiler will analyse and output all the syntatic errors it finds, and only then does it stop the execution. Our group didn't improve it further due to time management issues.
 

**SEMANTIC ANALYSIS:
The group implemented many semantic rules inherent to the yal language.
Our Semantic analysis checks:
  - Variable Declarations/Initializations
  - The types and number of arguments of a function call
  - Verify different variable types when assigning a value to a variable and when doing an operation/comparison
  - If a type of a variable is compatible with the return of a function
  - Etc

//TODO (LEAVE BLANK?)
**INTERMEDIATE REPRESENTATIONS (IRs): 

**CODE GENERATION:
The Code Generation in our tool is divided in two parts. The first part consist of a class that implements the 'visitor' pattern, which allows it to visit every node, and the second part consists of a class responsible for writing JVM instructions to the output file. This second part features a set of basics functions responsible to write small portions of code, like storing a variable, printing a label, and many others.


**OVERVIEW:
When it comes to the approach and algorithms used in our tool, we developed our compiler based on contents of the theoretical classes, which means we followed the fases of a regular and modulated compiler (Lexical, Syntatic and Semantic Analysis, followed by Code Generation) to implement the project.
The main tool used in our project is JavaCC for the syntatic analysis and the jjtree extension for the AST builder. No additional packages or third-party tools were used in our project.
 

//TODO
**TESTSUITE AND TEST INFRASTRUCTURE:
In order to test the code developed, our group used the sets of example files available in the mooodle page. Our tool passed in all syntatic tests provided and most of the semantic tests provided. Furthermore, we also developed some test files of our own ([X NUMBER] to be exact), in an attempt to further analyse the performance of our compiler.
To automate the testing of our tool we created [X NUMBER] scripts one to completly compile the project (jjtree, javacc, javac) and another one to test a specific file , we would feed the script the name of the file and it would run our compiler with it. //TODO: NAO SEI O QUE METER AQUI, NAO SEI O QUE TEMOS NO QUE TOCA A SCRIPTS.
 

**TASK DISTRIBUTION:

Afonso Pinto : Conversion of the grammar to an LL(1) format. Contribution to the development of error treatment and recovery mechanisms. Contribution to the creation of the symbol table. Development of the semantic analysis. Development of the code generation. Testing and debugging the tool.

Bruno Moreno : Grammar development. Contribution to the construction of the AST. Contribution to the creation of the symbol table. Development of the semantic analysis. Development of the code generation. Contribution to the readme.txt file.

João Moura: Grammar development. Conversion of the grammar to a LL(1) formal. Contribution to the development of error treatment and recovery mechanisms. Contribution to the construction of the AST. Development of the semantic analysis. Contribution to the readme.txt file.

Tomás Oliveira : Grammar development. Conversion of the grammar to an LL(1) format. Contribution to the construction of the AST. Contribution to the development of error treatment and recovery mechanisms. Development of the code generation. Testing and debugging the project. 


**PROS: 
Our tool's most positive aspects include: an LL(1) Grammar, the construction of a very helpful symbol table aswell as printing it (which helps the debugging process), and all in all, a compiler that gets the job done.

**CONS:
Our tool could still be improved in some aspects. The most negative aspects include: a somewhat incomplete semantic analysis (some errors are not detected and some other are not detected correctly), stopping the syntatic analysis at the first error, the existence of some inexplicable NullPointerException errors and the inexistence of code otimization.
