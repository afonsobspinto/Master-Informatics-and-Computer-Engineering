
%Class[ID, Name, Area, Duration, Type]
getAllClasses(Subjects, Classes):-
	findall(Name-Area-ListOfTheoreticalHours, (member(Subject, Subjects), getSubjectName(Subject, Name), getSubjectArea(Subject, Area), getSubjectTheoreticalHours(Subject, ListOfTheoreticalHours)), TempTheoreticalClasses),
    findall(Name-Area-TDuration-'Theoretical', (member(Name-Area-ListOfTheoreticalHours, TempTheoreticalClasses), member(TDuration, ListOfTheoreticalHours)), TheoreticalClasses),	
    findall(Name-Area-ListOfPraticalHours, (member(Subject, Subjects),getSubjectName(Subject, Name), getSubjectArea(Subject, Area), getSubjectTheoreticalHours(Subject, ListOfPraticalHours)), TempPraticalClasses),
	findall(Name-Area-PDuration-'Pratical', (member(Name-Area-ListOfPraticalHours, TempPraticalClasses), member(PDuration, ListOfPraticalHours)), PraticalClasses),
    append(TheoreticalClasses, PraticalClasses, TempClasses),
    addID(TempClasses, TempTempClasses),
    findall([ID, Name, Area, Duration, Type], member(ID-Name-Area-Duration-Type, TempTempClasses), Classes).
    
    
getClassID(Class,ID):-
    nth0(0, Class, ID).

getClassArea(Class, Area):-
    nth0(2, Class, Area).

getClassType(Class, Type):-
    nth0(4, Class, Type).
    
mapClassType('Theoretical', 1).
mapClassType('Pratical', 0).

addID(TempClasses, Classes):-
    addIDAux(TempClasses, 0, [], Classes).

addIDAux([],_, ReversedClasses, Classes):-
    reverse(ReversedClasses, Classes).
    

addIDAux([Name-Area-Duration-Type|Tail], ID, TempClasses, Classes):-
    NewID is ID+1,
    NewHead = [NewID-Name-Area-Duration-Type],
    append(NewHead,TempClasses,NewTempClasses),
    addIDAux(Tail, NewID, NewTempClasses, Classes).
	