
%Class[ID, Name, Area, Duration, Type, Semester]
getAllClasses(Subjects, Classes):-
	findall(Name-Area-ListOfTheoreticalHours-Semester, (member(Subject, Subjects), getSubjectName(Subject, Name), getSubjectArea(Subject, Area), getSubjectTheoreticalHours(Subject, ListOfTheoreticalHours), getSubjectSemester(Subject, Semester)), TempTheoreticalClasses),
    findall(Name-Area-TDuration-'Theoretical'-Semester, (member(Name-Area-ListOfTheoreticalHours-Semester, TempTheoreticalClasses), member(TDuration, ListOfTheoreticalHours)), TheoreticalClasses),	
    findall(Name-Area-ListOfPraticalHours-Semester, (member(Subject, Subjects),getSubjectName(Subject, Name), getSubjectArea(Subject, Area), getSubjectPraticalHours(Subject, ListOfPraticalHours), getSubjectSemester(Subject, Semester)), TempPraticalClasses),
	findall(Name-Area-PDuration-'Pratical'-Semester, (member(Name-Area-ListOfPraticalHours-Semester, TempPraticalClasses), member(PDuration, ListOfPraticalHours)), PraticalClasses),
    append(TheoreticalClasses, PraticalClasses, TempClasses),
    addID(TempClasses, TempTempClasses),
    findall([ID, Name, Area, Duration, Type, Semester], member(ID-Name-Area-Duration-Type-Semester, TempTempClasses), Classes).
    
getAllFirstSTClasses(Subjects, FirstSTClasses):-
    findall([ID, Name, Area, Duration, Type, 1], (getAllClasses(Subjects, Classes),
                                                  member([ID, Name, Area, Duration, Type, 1], Classes)), FirstSTClasses).

getAllSecondSTClasses(Subjects, SecondSTClasses):-
    findall([ID, Name, Area, Duration, Type, 2], (getAllClasses(Subjects, Classes),
                                                  member([ID, Name, Area, Duration, Type, 2], Classes)), SecondSTClasses).

getClassDuration(Class, Duration):-
    nth0(3, Class, Duration).

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
	