:- use_module(library(clpfd)).
:- use_module(library(lists)).
:- consult('data.pl').


main:-
	subjects(Subjects), teachers(Teachers), scientificArea(Area),
	write('Hello World'), nl, nl,
	nth0(0, Subjects, Subject),
	nth0(0, Teachers, Teacher),
	printSubjectInfo(Subject),
	nl, nl,
	printTeacherInfo(Teacher),
	nl, nl.
