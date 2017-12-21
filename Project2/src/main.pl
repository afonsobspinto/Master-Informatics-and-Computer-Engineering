:- use_module(library(clpfd)).
:- use_module(library(lists)).
:- consult('data.pl').

:- include('classes.pl').
:- include('teacher.pl').
:- include('subject.pl').
:- include('stats.pl').
:- include('interface.pl').
:- include('utilities.pl').



main:-
/* 
	X = [
		[1,2,3],
		[4,5,6],
		[7,8,9],
		[10,11,12]
	],
	append(X, NewX),
	write(NewX), nl,
	allClassesMustHaveATeacher(NewX, 3). */
 	subjects(Subjects),
	teachers(Teachers),
	getAllClasses(Subjects, Classes),
	startTimer,
	length(Classes, Rows),
	length(Teachers, Columns),
	TotalSize is Rows*Columns,
	length(Matrix, TotalSize),
	domain(Matrix, 0, 1),
	write(Matrix),nl,nl,
	allClassesMustHaveATeacher(Matrix, Columns),
	labeling([], Matrix),
	write(Matrix),nl,nl,
	stopTimer(TimeElapsed),
	printTimer(TimeElapsed),
	fd_statistics.
	
allClassesMustHaveATeacher(Matrix, Columns):-
	getAllRows(Matrix, Columns, Rows),
	applyRestriction(Rows).

applyRestriction([]).

applyRestriction([Head|Tail]):-
	sum(Head, #=, 1),
	applyRestriction(Tail).
	
	
	

getAllRows(Matrix, Columns, Rows):-
	getAllRowsAux(Matrix, Columns, Columns, [], [], ReversedRows),
	reverse(ReversedRows, Rows).
	



getAllRowsAux(Matrix, Columns, 0, TempRows, Acc, Rows):-
	append([TempRows], Acc, NewAcc),
	getAllRowsAux(Matrix, Columns, Columns, [], NewAcc, Rows).

getAllRowsAux([], _, _, _, Rows, Rows).

getAllRowsAux([Head|Tail], Columns, Counter, TempRows, Acc, Rows):-
	append(TempRows, [Head], NewTempRows),
	NewCounter is Counter - 1,
	getAllRowsAux(Tail, Columns, NewCounter, NewTempRows, Acc, Rows).
	
	



	
	

