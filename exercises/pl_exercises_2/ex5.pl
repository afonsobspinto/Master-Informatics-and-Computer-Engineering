% --- Exercise 5 --- %

e_primo(2).
e_primo(3).
e_primo(P) :- integer(P), P > 3, P mod 2 =\= 0, \+tem_factor(P,3).
tem_factor(N,L) :- N mod L =:= 0.
tem_factor(N,L) :- L * L < N, L2 is L + 2, tem_factor(N,L2).
