homem('rui').
homem('joao').
homem('tomas').
homem('afonso').

mulher('maria').
mulher('ana').
mulher('maria ana').
mulher('ana maria').

pais('ana','joao','maria').
pais('afonso', 'tomas', 'ana').


pai(P,F):- pais(F,P,_).
pai(P):- pais(_,P,_).

mae(M,F):- pais(F,_,M).
mae(M):- pais(_,_,M).

filho(F,X):- pai(X,F), homem(F).
filho(F,X):- mae(X,F), homem(F).

filha(F,X):- pai(X,F), mulher(F).
filha(F,X):- mae(X,F), mulher(F).

irmao(X,Y):- pais(X,P,M), pais(Y,P,M), homem(X), X \= Y.
irma(X,Y):- pais(X,P,M), pais(Y,P,M), mulher(X), X \= Y.

irmaos(X,Y):- pais(X,P,M), pais(Y,P,M), (homem(X); homem(Y)), X \= Y.

avo(A,N):- pai(A,X), (pai(X,N) ; mae(X,N)).

antepassado(A,D):- pai(A,B); mae(A,D).
antepassado(A,D):- (pai(A,F); mae(A,F)), antepassado(F,D).	