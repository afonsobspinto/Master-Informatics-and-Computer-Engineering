:- use_module(library(clpfd)).
:- use_module(library(lists)).
:- use_module(library(between)).
:- consult('data.pl').

:- include('classes.pl').
:- include('teacher.pl').
:- include('subject.pl').
:- include('stats.pl').
:- include('interface.pl').
:- include('utilities.pl').



main:-
 	subjects(Subjects),
	teachers(Teachers),
	getAllClasses(Subjects, Classes),
	startTimer,
	length(Classes, Rows),
	length(Teachers, Columns),
	TotalSize is Rows*Columns,
	length(Matrix, TotalSize),
	domain(Matrix, 0, 1),
	allClassesMustHaveATeacher(Matrix, Columns),
	applyWorkload2Teachers(Matrix, Rows, Columns, Teachers, Classes),
	printMatrix(Matrix, Columns),nl,nl,
	labeling([], Matrix),
	printMatrix(Matrix, Columns),nl,nl,
	stopTimer(TimeElapsed),
	printTimer(TimeElapsed),
	fd_statistics. 
	

applyWorkload2Teachers(Matrix, Rows, Cols, Teachers, Classes):-
	getAllColumns(Matrix, Rows, Cols, Columns),
	applyWorkloadRestriction(Columns, 1, Teachers, Classes).

applyWorkloadRestriction([],_,_,_).

applyWorkloadRestriction([Head|Tail], ID, Teachers, Classes):-
	findTeacherWorkloadWithID(Teachers, ID, Workload),
	adaptedSum(Classes, Head, 1, [], Promise),
	sum(Promise, #=<, Workload),
	NextID is ID +1,
	applyWorkloadRestriction(Tail, NextID, Teachers, Classes).

adaptedSum(_, [], _, Promise, Promise).

adaptedSum(Classes, [Head|Tail], ClassID, Acc, Promise):-
	findClassDurationWithID(Classes, ClassID, Duration),
	Val #= Head * Duration,
	append([Val], Acc, NewAcc),
	NextID is ClassID + 1,
	adaptedSum(Classes, Tail, NextID, NewAcc, Promise).




allClassesMustHaveATeacher(Matrix, Columns):-
	getAllRows(Matrix, Columns, Rows),
	applyMustHaveATeacherRestriction(Rows).


applyMustHaveATeacherRestriction([]).

applyMustHaveATeacherRestriction([Head|Tail]):-
	sum(Head, #=, 1),
	applyMustHaveATeacherRestriction(Tail).




getAllColumns(Matrix, Rows, Cols, Columns):-
	ColsMaxIndex is Cols -1,
	getAllColumnsAux(Matrix, ColsMaxIndex, Rows, Cols, [], Columns).

getAllColumnsAux(_, -1, _,  _, Columns, Columns).

getAllColumnsAux(Matrix, Col, RowSize, ColumnSize, Acc, Columns):-
	RowMaxIndex is RowSize - 1,
	findall(Elem, (between(0,RowMaxIndex,Row), getIndex(Row, Col, ColumnSize, Index), nth0(Index, Matrix, Elem)), TempCols),
	append([TempCols], Acc, NewAcc),
	NextCol is Col - 1,
	getAllColumnsAux(Matrix, NextCol, RowSize, ColumnSize, NewAcc, Columns).
	


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
	
	



	
	

