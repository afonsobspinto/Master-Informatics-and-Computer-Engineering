membro(X,[X|_]).
membro(X,[_|Xs]).

membro(X,L):- append(_,[X|_],L).

last(L,X):- append(_,[X],L).