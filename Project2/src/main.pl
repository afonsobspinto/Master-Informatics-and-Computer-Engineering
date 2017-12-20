:- use_module(library(clpfd)).
:- use_module(library(lists)).
:- consult('data.pl').

:- include('classes.pl').
:- include('teacher.pl').
:- include('subject.pl').


main:-
	subjects(Subjects),
	getAllClasses(Subjects, Classes),
	write(Classes).
	/*restrictTheoretical.*/
	


restrictTheoretical:-
	nth0(TeacherIndex, Teachers, Teacher),
	length(Teachers, TeachersSize),
	TeachersMaxIndex is TeachersSize-1,
	domain([TeacherIndex], 0, TeachersMaxIndex),
	getTeacherArea(Teacher, TeacherArea),
	subjects(Subjects), getAllClasses(Subjects, Classes),
	nth0(ClassIndex, Classes, Class),
	length(Classes, ClassesSize),
	ClassesMaxIndex is ClassesSize-1,
	domain([ClassIndex], 0, ClassesMaxIndex),
	getClassArea(Class, ClassArea),
	getClassType(Class, ClassType),
	mapClassType(ClassType, MappedClassType),
	MappedClassType #= 1,
	ClassArea #= TeacherArea,
	getTeacherTheoreticalClasses(Teacher,TheoreticalClass),
	getClassID(Class, ID),
	TheoreticalClass #= ID,
	labeling([],[TeacherIndex, ClassIndex]),	
	teachers(Teachers).

