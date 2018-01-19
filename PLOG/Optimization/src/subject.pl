%Subject[ID, Name, Area, Semester, [Hours Per Theoretical], [Hours Per Pratical]]

getSubjectID(Subject, ID):-
    nth0(0, Subject, ID).

getSubjectName(Subject, Name):-
    nth0(1, Subject, Name).

getSubjectArea(Subject, Area):-
    nth0(2, Subject, Area).

getSubjectSemester(Subject, Semester):-
    nth0(3, Subject, Semester).

getSubjectTheoreticalHours(Subject, HT):-
    nth0(4, Subject, HT).

getSubjectTotalTheoreticalHours(Subject, THours):-
    nth0(4, Subject, HT),
    sumlist(HT, THours).

getSubjectPraticalHours(Subject, HP):-
    nth0(5, Subject, HP).

getSubjectTotalPraticalHours(Subject, PHours):-
    nth0(5, Subject, HP),
    sumlist(HP, PHours).
    

printSubjectInfo(Subject):-
    getSubjectID(Subject, ID),
    getSubjectName(Subject, Name),
    getSubjectArea(Subject, Area),
    getSubjectSemester(Subject, Semester),
    getSubjectTheoreticalHours(Subject, HT),
    getSubjectTotalTheoreticalHours(Subject, TotalHT),
    getSubjectPraticalHours(Subject, HP),
    getSubjectTotalPraticalHours(Subject, TotalHP),

    write(ID), write(' - '), write(Name), write(' '), write(Area), nl,
    write('Semester: '), write(Semester), nl,
    write('Theoretical Classes: '), write(HT), nl,
    write('Theoretical Hours Weekly: '), write(TotalHT), nl,
    write('Pratical Classes: '), write(HP), nl,
    write('Pratical Hours Weekly: '), write(TotalHP), nl.




