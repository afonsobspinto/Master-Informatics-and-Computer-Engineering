% 3.1

%estado inicial
estado_inicial(b(0,0)).

%estado final
estado_final(b(2,0)).

%transições entre estados
sucessor(b(X,Y), b(4,Y), C) :- X<4, C is 4-X.
sucessor(b(X,Y), b(X,3), C) :- Y<3, C is 3-Y.
sucessor(b(X,Y), b(0,Y), X) :- X>0.
sucessor(b(X,Y), b(X,0), Y) :- Y>0.
sucessor(b(X,Y), b(4,Y1), Y1) :-
			X+Y>=4,
			X<4,
			Y1 is Y-(4-X).
sucessor(b(X,Y), b(X1,3), X1) :-
			X+Y>=3,
			Y<3,
			X1 is X-(3-Y).
sucessor(b(X,Y), b(X1,0), X1) :-
			X+Y<4,
			Y>0,
			X1 is X+Y.
sucessor(b(X,Y), b(0,Y1), Y1) :-
			X+Y<3,
			X>0,
			Y1 is X+Y.
			
h(b(X,Y), H):-
	estado_final(b(Xf,Yf)),
	H is max(abs(X-Xf), abs(Y-Yf)).

astar([(F, G, [E|Cam]) | R], (F,[E|Cam])):- estado_final(e).
astar([(F, G, [F|Cam]) | R], S):-
	findall((F2, G2, [E2|[E|Cam]]),
		(sucessor(E,E2,C),
		G2 is G+C,
		h(E2, H2),
		F2 is G2+H2),
		LS),
	append(R, LS, L2),
	sort(L2, L2Ord),
	astar(L2Ord, S).

solve_astar(S):-
	estado_inicial(Ei),
	h(Ei, Hi),
	astar([(Hi,0,[Ei])], S).
