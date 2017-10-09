% --- Exercise 6 - a) --- %
delete_one(X,[X|Xs],Xs).
delete_one(X,[Y|Xs],[Y|Ys]):- delete_one(X,Xs,Ys).

% --- Exercise 6 - b) --- %
delete_all(X,[],[]).
delete_all(X,[X|Xs],Ys):- delete_all(X,Xs,Ys).
delete_all(X,[Y|Xs],[Y|Ys]):- X\=Y, delete_all(X,Xs,Ys).

% --- Exercise 6 - c) --- %
