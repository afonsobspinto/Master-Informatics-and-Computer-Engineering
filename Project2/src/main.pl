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
   getAllClasses(Subjects, Classes),
   startTimer,
   length(Classes, Rows),
   length(Teachers, Columns),
   TotalSize is Rows*Columns,
   length(Matrix, TotalSize),
   domain(Matrix, 0, 1),
   /*classesAndTeachersSameArea(Matrix, Rows, Columns, Teachers, Classes),*/
   allClassesMustHaveATeacher(Matrix, Columns),
   workloadRestriction(Matrix, Rows, Columns, Teachers, Classes),
   labeling([], Matrix),
   printMatrix(Matrix, Columns, Teachers, Classes),nl,nl,
   stopTimer(TimeElapsed),
   printTimer(TimeElapsed),
   fd_statistics.

classesAndTeachersSameArea(Matrix, Rows, Cols, Teachers, Classes):-
	getAllColumns(Matrix, Rows, Cols, Columns),
	applySameAreaAux(Columns, Teachers, Classes, 1).

applySameAreaAux([], _, _, _).
applySameAreaAux([Head|Tail], Teachers, Classes, TeacherID):-
	findTeacherAreaWithID(Teachers, TeacherID, TeacherArea),
	nth0(TeacherID, Classes, Class),
	getClassArea(Class, ClassArea),
	write(TeacherArea), write(' '), write(ClassArea), nl,
    TeacherArea #= ClassArea,
	NextID is TeacherID + 1,
	applySameAreaAux(Tail, Teachers, ListDurations, NextID).

workloadRestriction(Matrix, Rows, Cols, Teachers, Classes):-
	getAllColumns(Matrix, Rows, Cols, Columns),
	getAllClassesDurations(Classes, ListDurations),
	workloadRestrictionAux(Columns, Teachers, ListDurations, 1).

workloadRestrictionAux([], _, _, _).
workloadRestrictionAux([Head|Tail], Teachers, ListDurations, TeacherID):-
	findTeacherWorkloadWithID(Teachers, TeacherID, Workload),
	scalar_product(ListDurations, Head, #=<, Workload),
	NextID is TeacherID + 1,
	workloadRestrictionAux(Tail, Teachers, ListDurations, NextID).


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
    NextCol is Col - 1,
    append([TempCols], Acc, NewAcc),
    RowMaxIndex is RowSize - 1,
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
	
	



	
	

