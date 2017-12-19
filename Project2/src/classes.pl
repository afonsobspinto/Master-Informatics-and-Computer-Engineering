

getAllClasses(Subjects, Classes):-
	findall(Name-ListOfTheoreticalClass, (member(Subject, Subjects), nth0(1, Subject, Name), nth0(4, Subject, ListOfTheoreticalClass)), TempTheoreticalClasses),
	findall(Name-TheoreticalClass-'Theoretical', (member(Name-ListOfTheoreticalClass, TempTheoreticalClasses), member(TheoreticalClass, ListOfTheoreticalClass)), TheoreticalClasses),	
	findall(Name-ListOfPraticalClass, (member(Subject, Subjects), nth0(1, Subject, Name), nth0(5, Subject, ListOfPraticalClass)), TempPraticalClasses),
	findall(Name-PraticalClass-'Pratical', (member(Name-ListOfPraticalClass, TempPraticalClasses), member(PraticalClass, ListOfPraticalClass)), PraticalClasses),
    append(TheoreticalClasses, PraticalClasses, TempClasses),
    addID(TempClasses, Classes).

addID(TempClasses, Classes):-
    addIDAux(TempClasses, 0, [], Classes).

addIDAux([],_, ReversedClasses, Classes):-
    reverse(ReversedClasses, Classes).
    

addIDAux([Name-PraticalClass-Type|Tail], ID, TempClasses, Classes):-
    NewID is ID+1,
    NewHead = [NewID-Name-PraticalClass-Type],
    append(NewHead,TempClasses,NewTempClasses),
    addIDAux(Tail, NewID, NewTempClasses, Classes).
	
	