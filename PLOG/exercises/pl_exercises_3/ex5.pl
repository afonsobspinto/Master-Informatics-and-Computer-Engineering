% --- Exercise 5 - a) --- %
eMembro(X,[_|Xs]):-membro(X,Xs).

% --- Exercise 5 - b) --- %
membro(X,L):- append(_,[X|_],L).

% --- Exercise 5 - c) --- %
last(L,X):- append(_,[X],L).

% --- Exercise 5 - d) --- %
nth_membro(1,[M|_],M). 
nth_membro(N,[_|T],M):- N>1, N1 is N-1, nth_membro(N1,T,M).
