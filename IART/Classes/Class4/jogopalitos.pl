%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Formaliza��o do jogo dos palitos:
% - existem inicialmente 10 palitos sobre a mesa
% - cada jogador pode retirar um, dois ou tr�s palitos na sua vez
% - o objectivo � evitar ficar com o �ltimo palito
%%%%%%%%%%

% a representa��o do estado vai incluir tamb�m o jogador a jogar,
% pois neste jogo � importante para efeitos de avalia��o do estado

% representa��o de um estado: (NumeroPalitos, Quemjoga)

estado_inicial((10,max)).

% estado final (ter 0 palitos � bom): s� interessa para o minimax simples
estado_final((0,max), 1).
estado_final((0,min), 0).

% transi��es entre estados (as jogadas s�o as mesmas para os 2 jogadores)
sucessor((N,max), max, (N1,min)) :- N>0, N1 is N-1.
sucessor((N,max), max, (N1,min)) :- N>1, N1 is N-2.
sucessor((N,max), max, (N1,min)) :- N>2, N1 is N-3.
sucessor((N,min), min, (N1,max)) :- N>0, N1 is N-1.
sucessor((N,min), min, (N1,max)) :- N>1, N1 is N-2.
sucessor((N,min), min, (N1,max)) :- N>2, N1 is N-3.

% avalia��o de estados
% ...

% minimax
% minimax(Estado, Jogador, ValorDaJogada, Jogada).
minimax(E, J, Valor, _):- estado_final(E, Valor).

minimax(E, max, Valor, Jogada):-
				findall( E2, sucessor(E, max, E2), LSuc),
				maxvalue(LSuc, Valor, Jogada).
				
minimax(E, min, Valor, Jogada):-
				findall( E2, sucessor(E, min, E2), LSuc),
				minvalue(LSuc, Valor, Jogada).
				
				
maxvalue([E], V, E):-
				minimax(E, min, V, _).
			
maxvalue([E|Es], V, Melhor):-
				minimax(E, min, V1, _),
				maxvalue(Es, V2, J2),
				(V1 > V2, V = V1, Melhor = E ; V1 =< V2, V = V2, Melhor = J2).
				
minvalue([E], V, E):-
				minimax(E, max, V, _).
			
minvalue([E|Es], V, Melhor):-
				minimax(E, max, V1, _),
				minvalue(Es, V2, J2),
				(V1 < V2, V = V1, Melhor = E ; V1 >= V2, V = V2, Melhor = J2).

% heuristica
avalia((N,max), 1):-
				X is N mod 4, X \= 1 .