printMatrix(Matrix, Columns, TeachersIDS, ClassesIDS):-
    getAllRows(Matrix, Columns, Rows),
    write('   '), printTeachersIDS(TeachersIDS),
    write('  '),  printBorder(Columns),
    printRows(Rows, ClassesIDS).

printTeachersIDS([]):-
    nl.
printTeachersIDS([Head|Tail]):-
    write(Head), write(' '),
    printTeachersIDS(Tail).

printBorder(0):-
    write('-'), nl.
printBorder(Size):-
    write('--'),
    NextSize is Size - 1,
    printBorder(NextSize).


printRows([],[]).
printRows([Head|Tail], [CHead|CTail]):-
    write(CHead), write(' |'),
    printRow(Head),
    length(Head, CollumSize),
    write('  '), printBorder(CollumSize),
    printRows(Tail, CTail).

printRow([]):-
    nl.
printRow([Head|Tail]):-
    write(Head), write('|'),
    printRow(Tail).