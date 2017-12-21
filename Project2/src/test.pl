:- use_module(library(clpfd)).
:- use_module(library(lists)).
:- use_module(library(between)).

test:-
    X = [W,Y,Z],
    acc(X, L),
    write(L),
    X = [1,2,3],
    write(L).

acc(List, Result):-
    accAux(List, [], Result).

accAux([], Result, Result).

accAux([Head|Tail], Acc, Result):-
    N #= Head * 2,
    append([N], Acc, NewAcc),
    accAux(Tail, NewAcc, Result). 
    