:- use_module(library(clpfd)).
:- use_module(library(lists)).
:- consult('data.pl').


main:-
	subjects(Subjects), teachers(Teachers), scientificArea(Area),
	makeVarList(Teachers, Classes),
	write('Hello World'), nl, nl,
	nth0(0, Subjects, Subject),
	nth0(0, Teachers, Teacher),
	printSubjectInfo(Subject),
	nl, nl,
	printTeacherInfo(Teacher),
	nl, nl,
	write(Classes).


makeVarList(List, Result):-
	makeVarListAux(List, [], Result).

makeVarListAux([],TempResult,TempResult).
makeVarListAux([[_,_,_,_,_, Var2List]|List],Temp,Var):-append(Temp,[Var2List],NewTemp),makeVarListAux(List,NewTemp,Var).