printMatrix(Matrix):-

    nth0(0, Matrix, Elem),
    length(Elem, CollumSize),
    printBorder(CollumSize),
    printRows(Matrix).

printBorder(0):-
    nl.
printBorder(Size):-
    write('--'),
    NextSize is Size-1,
    printBorder(NextSize).


printRows([]).
printRows([Head|Tail]):-
    printRow(Head),
    length(Head, CollumSize),
    printBorder(CollumSize),
    printRows(Tail).

printRow([]):-
    nl.
printRow([Head|Tail]):-
    write(Head), write('|'),
    printRow(Tail).