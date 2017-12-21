:- use_module(library(clpfd)).
:- use_module(library(lists)).
:- use_module(library(between)).
:- reconsult('data.pl').

:- include('classes.pl').
:- include('teacher.pl').
:- include('subject.pl').
:- include('stats.pl').
:- include('interface.pl').
:- include('utilities.pl').


main:-
   nl,
   subjects(Subjects),
   teachers(Teachers),
   findall(TeacherID, (member(Teacher, Teachers), getTeacherID(Teacher, TeacherID)), TeachersIDS),
   getAllClasses(Subjects, Classes),
   findall(ClassID, (member(Class, Classes), getClassID(Class, ClassID)), ClassesIDS),
   startTimer,
   length(Classes, Rows),
   length(Teachers, Columns),
   TotalSize is Rows*Columns,
   length(Matrix, TotalSize),
   domain(Matrix, 0, 1),
   allClassesMustHaveATeacher(Matrix, Columns),
   workloadRestriction(Matrix, Rows, Columns, Teachers),
   printMatrix(Matrix, Columns, TeachersIDS, ClassesIDS),nl,nl,
   labeling([], Matrix),
   printMatrix(Matrix, Columns, TeachersIDS, ClassesIDS),nl,nl,
   stopTimer(TimeElapsed),
   printTimer(TimeElapsed),
   fd_statistics.
	
workloadRestriction(Matrix, Rows, Cols, Teachers):-
	getAllColumns(Matrix, Rows, Cols, Columns),
	workloadRestrictionAux(Columns, Teachers, 1).

workloadRestrictionAux([], _, _).

workloadRestrictionAux([Head|Tail], Teachers, TeacherID):-
	findTeacherWorkloadWithID(Teachers, TeacherID, Workload),
	sum(Head, #=<, Workload),
	NextID is TeacherID + 1,
	workloadRestrictionAux(Tail, Teachers, NextID).


allClassesMustHaveATeacher(Matrix, Columns):-
	getAllRows(Matrix, Columns, Rows),
	applyMustHaveATeacherRestriction(Rows).

applyMustHaveATeacherRestriction([]).

applyMustHaveATeacherRestriction([Head|Tail]):-
	sum(Head, #=, 1),
	applyMustHaveATeacherRestriction(Tail).

getAllColumns(Matrix, Rows, Cols, Columns):-
    ColsMaxIndex is Cols - 1,
    RowsMaxIndex is Rows - 1,
    getAllColumnsAux(Matrix, RowsMaxIndex, ColsMaxIndex, Rows, Cols, [], [], Columns).
    
getAllColumnsAux(_,_, -1, _, _, _, Columns, Columns).
    
getAllColumnsAux(Matrix, -1, Col, RowSize, ColumnSize, TempCols, Acc, Columns):-
    NextCol is Col -1,
    append([TempCols], Acc, NewAcc),
    RowMaxIndex is RowSize -1,
    getAllColumnsAux(Matrix, RowMaxIndex, NextCol, RowSize, ColumnSize, [], NewAcc, Columns).
    
getAllColumnsAux(Matrix, Row, Col, RowSize, ColumnSize, TempCols, Acc, Columns):-
    getIndex(Row, Col, ColumnSize, Index),
    nth0(Index, Matrix, Elem),
    append([Elem], TempCols, NewTempCols),
    NextRow is Row - 1,
    getAllColumnsAux(Matrix, NextRow, Col, RowSize, ColumnSize, NewTempCols, Acc, Columns).
	

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
	
	



	
	

