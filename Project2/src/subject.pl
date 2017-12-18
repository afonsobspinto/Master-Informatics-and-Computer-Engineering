%Subject[Name, Area, Semester, HT, #TheoreticalClasses, HP, #PracticalClasses]

getSubjectName(Subject, Name):-
    nth0(0, Subject, Name).

getSubjectArea(Subject, Area):-
    nth0(1, Subject, Area).

getSubjectSemester(Subject, Semester):-
    nth0(2, Subject, Semester).

getSubjectHT(Subject, HT):-
    nth0(3, Subject, HT).

getSubjectNumberOfTheoreticalClasses(Subject, NumberOfTheoreticalClasses):-
    nth0(4, Subject, NumberOfTheoreticalClasses).

getSubjectHoursPerTheoreticalClass(Subject, Hours):-
    nth0(3, Subject, HT),
    nth0(4, Subject, NumberOfTheoreticalClasses),
    Hours is HT / NumberOfTheoreticalClasses.

getSubjectHP(Subject, HP):-
    nth0(5, Subject, HP).

getSubjectNumberOfPraticalClasses(Subject, NumberOfPraticalClasses):-
    nth0(6, Subject, NumberOfPraticalClasses).

getSubjectHoursPerPraticalClass(Subject, Hours):-
    nth0(5, Subject, HP),
    nth0(6, Subject, NumberOfPraticalClasses),
    Hours is HP / NumberOfPraticalClasses.

printSubjectInfo(Subject):-
    getSubjectName(Subject, Name),
    getSubjectArea(Subject, Area),
    getSubjectSemester(Subject, Semester),
    getSubjectHT(Subject, HT),
    getSubjectNumberOfTheoreticalClasses(Subject, NumberOfTheoreticalClasses),
    getSubjectHoursPerTheoreticalClass(Subject, THours),
    getSubjectHP(Subject, HP),
    getSubjectNumberOfPraticalClasses(Subject, NumberOfPraticalClasses),
    getSubjectHoursPerPraticalClass(Subject, PHours),

    write(Name), write(' '), write(Area), nl, 
    write('Semester: '), write(Semester), nl,
    write('Theoretical Hours Weekly: '), write(HT), nl,
    write('Number Of Theoretical Classes: '), write(NumberOfTheoreticalClasses), nl,
    write('Hours Per Theoretical Class: '), write(THours), nl,
    write('Pratical Hours Weekly: '), write(HP), nl,
    write('Number Of Pratical Classes: '), write(NumberOfPraticalClasses), nl,
    write('Hours Per Pratical Class: '), write(PHours), nl.




