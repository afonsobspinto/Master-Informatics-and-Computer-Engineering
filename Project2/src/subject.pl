%Subject[Name, Area, Semester, [Hours Per Theoretical], [Hours Per Pratical]]

getSubjectName(Subject, Name):-
    nth0(0, Subject, Name).

getSubjectArea(Subject, Area):-
    nth0(1, Subject, Area).

getSubjectSemester(Subject, Semester):-
    nth0(2, Subject, Semester).

getSubjectTheoreticalHours(Subject, HT):-
    nth0(3, Subject, HT).

getSubjectTotalTheoreticalHours(Subject, THours):-
    nth0(3, Subject, HT),
    sumlist(HT, THours).

getSubjectPraticalHours(Subject, HP):-
    nth0(4, Subject, HP).

getSubjectTotalPraticalHours(Subject, PHours):-
    nth0(4, Subject, HP),
    sumlist(HP, PHours).
    

printSubjectInfo(Subject):-
    getSubjectName(Subject, Name),
    getSubjectArea(Subject, Area),
    getSubjectSemester(Subject, Semester),
    getSubjectTheoreticalHours(Subject, HT),
    getSubjectTotalTheoreticalHours(Subject, TotalHT),
    getSubjectPraticalHours(Subject, HP),
    getSubjectTotalPraticalHours(Subject, TotalHP),

    write(Name), write(' '), write(Area), nl, 
    write('Semester: '), write(Semester), nl,
    write('Theoretical Classes: '), write(HT), nl,
    write('Theoretical Hours Weekly: '), write(TotalHT), nl,
    write('Pratical Classes: '), write(HP), nl,
    write('Pratical Hours Weekly: '), write(TotalHP), nl.




