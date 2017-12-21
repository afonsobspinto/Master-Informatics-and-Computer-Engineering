printMatrix(Matrix, Columns, Teachers, Classes):-
    getAllRows(Matrix, Columns, Rows),
    findall(TeacherID, (member(Teacher, Teachers), getTeacherID(Teacher, TeacherID)), TeachersIDS),
    findall(ClassID, (member(Class, Classes), getClassID(Class, ClassID)), ClassesIDS),
    write('   '), printTeachersIDS(TeachersIDS),
    write('  '),  printBorder(Columns),
    printRows(Rows, ClassesIDS), nl, nl,
    printStats(Matrix, Columns, Teachers, Classes, 0).

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

takeFirstNElem(N, S, L):-
    findall(E, (nth1(I,S,E), I =< N), L).

trimFirstNElem(N, S, L):-
    length(P,N),
    append(P,L,S).

printStats([],_,_,_,_).
printStats(Matrix, Columns, Teachers, Classes, Counter):-
    takeFirstNElem(Columns, Matrix, SingleClass),
    trimFirstNElem(Columns, Matrix, Matrixx),
    nth0(Index, SingleClass, 1),
    nth0(Counter, Classes, Class),
    getClassName(Class, ClassName),
    getClassType(Class, ClassType),
    getClassDuration(Class, ClassDuration),
    getClassSemester(Class, ClassSemester),
    nth0(Index, Teachers, Teacher),
    getTeacherName(Teacher, TeacherName),
    Counter2 is Counter + 1,
    write('Teacher '), write(TeacherName),
    write(' has a '), write(ClassName),
    write(' '), write(ClassType), write(' class with a duration of '),
    write(ClassDuration), write(' hour(s) in the '),
    write(ClassSemester), write(' semester'), nl,
    printStats(Matrixx, Columns, Teachers, Classes, Counter2).


