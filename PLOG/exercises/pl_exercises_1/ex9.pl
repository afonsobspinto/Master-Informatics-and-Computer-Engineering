% --- facts list --- %

aluno(joao, paradigmas).
aluno(maria, paradigmas).
aluno(joel, lab2).
aluno(joel, estruturas).
frequenta(joao, feup).
frequenta(maria, feup).
frequenta(joel, ist).
professor(carlos, paradigmas).
professor(ana_paula, estruturas).
professor(pedro, lab2).
funcionario(pedro, ist).
funcionario(ana_paula, feup).
funcionario(carlos, feup).

% --- rules list --- %

isStudentOf(A, X):- aluno(A, D), professor(X,D).

isPersonOn(P,X):- frequenta(P,X) ; funcionario(P,X).

isColleagueOf(C,X):- aluno(C,Y), aluno(X,Y), C\=X; frequenta(C,Y), frequenta(X,Y), C\=X; funcionario(C,Y), funcionario(X,Y), C\=X.
