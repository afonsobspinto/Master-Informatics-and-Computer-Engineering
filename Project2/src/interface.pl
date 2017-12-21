printMatrix(Matrix, Columns):-
    getAllRows(Matrix, Columns, Rows),
    printBorder(Columns),
    printRows(Rows).

printBorder(0):-
    write('-'), nl.
printBorder(Size):-
    write('--'),
    NextSize is Size - 1,
    printBorder(NextSize).


printRows([]).
printRows([Head|Tail]):-
    write('|'),
    printRow(Head),
    length(Head, CollumSize),
    printBorder(CollumSize),
    printRows(Tail).

printRow([]):-
    nl.
printRow([Head|Tail]):-
    write(Head), write('|'),
    printRow(Tail).