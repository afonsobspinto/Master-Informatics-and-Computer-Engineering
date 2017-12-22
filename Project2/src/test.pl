:- use_module(library(clpfd)).
:- use_module(library(lists)).
:- use_module(library(between)).
:- include('utilities.pl').

test:-
    domain([A,B], 1, 10),
    labeling([], [A,B]),
    write(A), write(B).

    
/*     X = [
		[1,0,0],
		[0,1,0],
		[0,0,1],
		[0,1,0]
	],
	append(X, NewX),
    write(NewX), nl,
    getAllColumns(NewX, 4, 3, Columns),
    write(Columns), nl,
 */

acc(List, Result):-
    accAux(List, [], Result).

accAux([], Result, Result).

accAux([Head|Tail], Acc, Result):-
    N #= Head * 2,
    append([N], Acc, NewAcc),
    accAux(Tail, NewAcc, Result). 


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