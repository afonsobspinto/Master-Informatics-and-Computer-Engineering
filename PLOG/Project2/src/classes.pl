
%Class[ID, Name, Area, Duration, Type, Semester]
getAllClasses(Subjects, Classes):-
	findall(Name-Area-ListOfTheoreticalHours-Semester, (member(Subject, Subjects), getSubjectName(Subject, Name), getSubjectArea(Subject, Area), getSubjectTheoreticalHours(Subject, ListOfTheoreticalHours), getSubjectSemester(Subject, Semester)), TempTheoreticalClasses),
    findall(Name-Area-TDuration-'Theoretical'-Semester, (member(Name-Area-ListOfTheoreticalHours-Semester, TempTheoreticalClasses), member(TDuration, ListOfTheoreticalHours)), TheoreticalClasses),	
    findall(Name-Area-ListOfPraticalHours-Semester, (member(Subject, Subjects),getSubjectName(Subject, Name), getSubjectArea(Subject, Area), getSubjectPraticalHours(Subject, ListOfPraticalHours), getSubjectSemester(Subject, Semester)), TempPraticalClasses),
	findall(Name-Area-PDuration-'Pratical'-Semester, (member(Name-Area-ListOfPraticalHours-Semester, TempPraticalClasses), member(PDuration, ListOfPraticalHours)), PraticalClasses),
    append(TheoreticalClasses, PraticalClasses, TempClasses),
    addID(TempClasses, TempTempClasses),
    findall([ID, Name, Area, Duration, Type, Semester], member(ID-Name-Area-Duration-Type-Semester, TempTempClasses), Classes).

findClassWithID(Classes, ID, Class):-
    findall(Elem, (member(Elem, Classes), getClassID(Elem, ID)), List),
    nth0(0, List, Class).

findClassAreaWithID(Classes, ID, Area):-
    findClassWithID(Classes, ID, Class),
    getClassArea(Class, Area).

findClassTypeWithID(Classes, ID, Type):-
    findClassWithID(Classes, ID, Class),
    getClassType(Class, Type).

getClassID(Class,ID):-
    nth0(0, Class, ID).

getClassName(Class, Name):-
    nth0(1, Class, Name).

getClassArea(Class, Area):-
    nth0(2, Class, Area).

getClassDuration(Class, Duration):-
    nth0(3, Class, Duration).

getClassType(Class, Type):-
    nth0(4, Class, Type).

getClassSemester(Class, Semester):-
    nth0(5, Class, Semester).

getAllClassesSemesters(Classes, SemestersList):-
    findall(Semester, (member(Class, Classes), nth0(5, Class, Semester)), SemestersList).

getAllFirstSemesterClassesDuration(Classes, ClassesList):-
    getAllXSemesterClassesDurationAux(Classes, 1, [], ClassesList).

getAllSecondSemesterClassesDuration(Classes, ClassesList):-
    getAllXSemesterClassesDurationAux(Classes, 2, [], ClassesList).

getAllXSemesterClassesDurationAux([], _, ClassesList, ClassesList).

getAllXSemesterClassesDurationAux([Head|Tail], X, TempClasses, ClassesList):-
    getClassSemester(Head, Semester),
    (
    (Semester == X) -> (getClassDuration(Head, Duration),  append(TempClasses, [Duration], NewTempClasses));
    append(TempClasses, [0], NewTempClasses)
    ),
    getAllXSemesterClassesDurationAux(Tail, X, NewTempClasses, ClassesList).


getAllClassesDurations(Classes, DurationsList):-
    findall(Duration, (member(Class, Classes), nth0(3, Class, Duration)), DurationsList).



mapClassType('Theoretical', 1).
mapClassType('Pratical', 0).

addID(TempClasses, Classes):-
    addIDAux(TempClasses, 0, [], Classes).

addIDAux([],_, ReversedClasses, Classes):-
    reverse(ReversedClasses, Classes).
    
addIDAux([Name-Area-Duration-Type-Semester|Tail], ID, TempClasses, Classes):-
    NewID is ID + 1,
    NewHead = [NewID-Name-Area-Duration-Type-Semester],
    append(NewHead,TempClasses,NewTempClasses),
    addIDAux(Tail, NewID, NewTempClasses, Classes).
	