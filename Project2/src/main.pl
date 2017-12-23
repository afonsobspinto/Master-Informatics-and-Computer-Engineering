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
   theoreticalRestriction(Matrix, Columns, Teachers, Classes), !,
   allClassesMustHaveATeacher(Matrix, Columns),
   workloadRestriction(Matrix, Rows, Columns, Teachers, Classes, DiffHoursExpectedMinimize),
   maximizePraticalRestriction(Matrix, Columns, Teachers, Classes, PraticalMaximize),
   preferenceRestriction(Matrix, Rows, Columns, Teachers, Classes),
   Quotient #= PraticalMaximize/DiffHoursExpectedMinimize,
   labeling([maximize(Quotient)], Matrix),
   printMatrix(Matrix, Columns, Teachers, Classes),nl,nl,
   stopTimer(TimeElapsed),
   printTimer(TimeElapsed),
   fd_statistics.

maximizePraticalRestriction(Matrix, Columns, Teachers, Classes, PraticalMaximize):-
    getAllRows(Matrix, Columns, Rows),
    maximizePraticalRestrictionAux(Rows, Teachers, Classes, 1, 0, PraticalMaximize).

maximizePraticalRestrictionAux([], _, _, _, PraticalMaximize, PraticalMaximize).

maximizePraticalRestrictionAux([Head|Tail], Teachers, Classes, ClassID, Acc, PraticalMaximize):-
    findClassTypeWithID(Classes, ClassID, ClassType),
    ClassType == 'Pratical',
    findClassAreaWithID(Classes, ClassID, ClassArea),
    parseTeachersPratical(Head, Teachers, ClassArea, 1, 0, TempAcc),
    NextClassID is ClassID + 1,
    NewAcc #= Acc + TempAcc,
    maximizePraticalRestrictionAux(Tail, Teachers, Classes, NextClassID, NewAcc, PraticalMaximize).

maximizePraticalRestrictionAux([_|Tail], Teachers, Classes, ClassID, Acc, PraticalMaximize):-
    NextClassID is ClassID + 1,
    maximizePraticalRestrictionAux(Tail, Teachers, Classes, NextClassID, Acc, PraticalMaximize).

parseTeachersPratical([], _, _, _, Acc, Acc).

parseTeachersPratical([Head|Tail], Teachers, ClassArea, TeacherID, TempAcc, Acc):-
    findTeacherAreaWithID(Teachers, TeacherID, TeacherArea),
    ClassArea == TeacherArea,
    NewTempAcc #= TempAcc + Head,
    NextTeacherID is TeacherID + 1,
    parseTeachersPratical(Tail, Teachers, ClassArea, NextTeacherID, NewTempAcc, Acc).

parseTeachersPratical([_|Tail], Teachers, ClassArea, TeacherID, TempAcc, Acc):-
    NextTeacherID is TeacherID + 1,
    parseTeachersPratical(Tail, Teachers, ClassArea, NextTeacherID, TempAcc, Acc).

theoreticalRestriction(Matrix, Cols, Teachers, Classes):-
    getAllRows(Matrix, Cols, Rows), !,
    theoreticalRestrictionAux(Rows, Teachers, Classes, 1).

theoreticalRestrictionAux([], _, _,_).

theoreticalRestrictionAux([Head|Tail], Teachers, Classes, ClassID):-

    findClassTypeWithID(Classes, ClassID, ClassType),
    ClassType == 'Theoretical',
    findClassAreaWithID(Classes, ClassID, ClassArea),
    parseTeachersTheoretical(Head, Teachers, ClassArea, 1, 0, Success), !,
    Success == 1,
    NextClassID is ClassID + 1,
    theoreticalRestrictionAux(Tail, Teachers, Classes, NextClassID).

theoreticalRestrictionAux([_|Tail], Teachers, Classes, ClassID):-
    NextClassID is ClassID + 1,
    theoreticalRestrictionAux(Tail, Teachers, Classes, NextClassID).

parseTeachersTheoretical([], _, _, _, Success, Success).

parseTeachersTheoretical([Head|Tail], Teachers, ClassArea, TeacherID, TempFlag, Success):-
    findTeacherAreaWithID(Teachers, TeacherID, TeacherArea),
    ClassArea \== TeacherArea,
    Head #= 0,
    NextTeacherID is TeacherID + 1,
    parseTeachersTheoretical(Tail, Teachers, ClassArea, NextTeacherID, TempFlag, Success).

parseTeachersTheoretical([_|Tail], Teachers, ClassArea, TeacherID, _, Success):-
    NextTeacherID is TeacherID + 1,
    parseTeachersTheoretical(Tail, Teachers, ClassArea, NextTeacherID, 1, Success).


preferenceRestriction(Matrix, Rows, Cols, Teachers, Classes):-
    getAllColumns(Matrix, Rows, Cols, Columns),
    getAllFirstSemesterClassesDuration(Classes, FirstSemesterDurations),
    getAllSecondSemesterClassesDuration(Classes, SecondSemesterDurations),
	preferenceRestrictionAux(Columns, Teachers, FirstSemesterDurations, SecondSemesterDurations,  1).

preferenceRestrictionAux([], _, _,_, _).

preferenceRestrictionAux([Head|Tail], Teachers, FirstSemesterDurations, SecondSemesterDurations, TeacherID):-
    findTeacherPreferenceWithID(Teachers, TeacherID, Preference),
    abs(SecondSemesterWorkload - FirstSemesterWorkload) #=< Preference,
    scalar_product(FirstSemesterDurations, Head, #=, FirstSemesterWorkload),
    scalar_product(SecondSemesterDurations, Head, #=, SecondSemesterWorkload),
	NextID is TeacherID + 1,
	preferenceRestrictionAux(Tail, Teachers, FirstSemesterDurations, SecondSemesterDurations, NextID).

preferenceRestrictionAux([_|Tail], Teachers, FirstSemesterDurations, SecondSemesterDurations, TeacherID):-
	NextID is TeacherID + 1,
	preferenceRestrictionAux(Tail, Teachers, FirstSemesterDurations, SecondSemesterDurations, NextID).

workloadRestriction(Matrix, Rows, Cols, Teachers, Classes, DiffHoursExpectedMinimize):-
    getAllColumns(Matrix, Rows, Cols, Columns),
    getAllClassesDurations(Classes, ListDurations),
	workloadRestrictionAux(Columns, Teachers, ListDurations, 1, 0, DiffHoursExpectedMinimize).

workloadRestrictionAux([], _, _, _, Acc, Acc).
workloadRestrictionAux([Head|Tail], Teachers, ListDurations, TeacherID, TempAcc, Acc):-
	findTeacherWorkloadWithID(Teachers, TeacherID, Workload),
    scalar_product(ListDurations, Head, #=, RealWorkload),
    NewTempAcc #= TempAcc + abs(RealWorkload - Workload),
	NextID is TeacherID + 1,
	workloadRestrictionAux(Tail, Teachers, ListDurations, NextID, NewTempAcc, Acc).


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
	
	



	
	

