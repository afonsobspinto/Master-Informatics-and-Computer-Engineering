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
	labeling([], Matrix),
	printMatrix(Matrix, Columns, TeachersIDS, ClassesIDS),nl,nl,
	stopTimer(TimeElapsed),
	printTimer(TimeElapsed),
	fd_statistics.

print_matrix([]).
print_matrix([Head|Tail]):-
    write(Head), nl,
    print_matrix(Tail).

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
	
	



	
	

