:- use_module(library(clpfd)).
:- use_module(library(lists)).
:- consult('data.pl').

:- include('classes.pl').


main:-
	subjects(Subjects), teachers(Teachers), scientificArea(Area),
	makeVarList(Teachers, TeacherTheoreticalClasses),
	write(TeacherTheoreticalClasses), nl, nl,
	getAllClasses(Subjects, Classes),
	write(Classes), nl, nl.


makeVarList(List, Result):-
	makeVarListAux(List, [], Result).

makeVarListAux([],TempResult,TempResult).
makeVarListAux([[_,_,_,_,_, Var2List]|List],Temp,Var):-append(Temp,[Var2List],NewTemp),makeVarListAux(List,NewTemp,Var).

