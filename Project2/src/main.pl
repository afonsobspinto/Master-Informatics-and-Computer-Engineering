:- use_module(library(clpfd)).
:- use_module(library(lists)).


:- include('example.pl').
:- include('teacher.pl').
:- include('subject.pl').

main(Subjects, Teachers):-

	write('Hello World'), nl, nl,
	nth0(0, Subjects, Subject),
	nth0(0, Teachers, Teacher),
	printSubjectInfo(Subject),
	nl, nl,
	printTeacherInfo(Teacher),
	nl, nl.
