getAllClasses(Subjects, Classes):-
	findall(Name-ListOfTheoreticalClass, (member(Subject, Subjects), nth0(1, Subject, Name), nth0(4, Subject, ListOfTheoreticalClass)), TempTheoreticalClasses),
	findall(Name-TheoreticalClass-'Theoretical', (member(Name-ListOfTheoreticalClass, TempTheoreticalClasses), member(TheoreticalClass, ListOfTheoreticalClass)), TheoreticalClasses),	
	findall(Name-ListOfPraticalClass, (member(Subject, Subjects), nth0(1, Subject, Name), nth0(5, Subject, ListOfPraticalClass)), TempPraticalClasses),
	findall(Name-PraticalClass-'Pratical', (member(Name-ListOfPraticalClass, TempPraticalClasses), member(PraticalClass, ListOfPraticalClass)), PraticalClasses),
	append(TheoreticalClasses, PraticalClasses, Classes).
	
	