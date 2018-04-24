% 8

% 8.1

%%%
% gramática
%

determinante(s-m) --> [o].
determinante(p-m) --> [os].
determinante(s-f) --> [a].

preposicao(_) --> [de].
preposicao(s-f) --> [da].

nome(p-m, rapazes) --> [rapazes].
nome(s-m, rapaz) --> [rapaz].
nome(s-m, rui) --> [rui].
nome(s-m, luis) --> [luis].
nome(s-f, rita) --> [rita].
nome(s-f, ana) --> [ana].
nome(s-f, maria) --> [maria].
nome(s-m) --> [elefante].
nome(p-m) --> [caes].
nome(p-m) --> [gatos].
nome(s-m) --> [cao].
nome(s-m) --> [gato].
nome(s-m) --> [futebol].
nome(p-m) --> [morangos].
nome(p-m) --> [amendoins].
nome(p-m) --> [bolachas].
nome(p-m) --> [humanos].
nome(p-f) --> [pessoas].
nome(s-m, rui) --> [rui].

verbo(s, jogar, S) --> [joga], {humano(S)}.
verbo(p, jogar, S) --> [jogam], {humano(S)}.
verbo(s, jogar, S) --> [gosta], {humano(S)}.
verbo(p, jogar, S) --> [gostam], {humano(S)}.
verbo(s, jogar, S) --> [come], {humano(S)}.
verbo(p, jogar, S) --> [comem], {humano(S)}.
verbo(p, jogar, S) --> [sao], {humano(S)}.

%%%
% base de dados
%

humano(rapaz).
humano(rui).
humano(maria).
humano(rita).
humano(ana).
humano(luis).
humano(humano).
humano([]).
humano([H|T]) :- humano(H), humano(T).

jogar(rapaz, futebol).
jogar(rui, futebol).
jogar(pokemon, futebol).

gostar(luis, morango).
gostar(rita, morango).
gostar(ana, morango).
gostar(rui, maria).
gostar(cao, bolacha).
gostar(gato, bolacha).

comer(elefante, amendoim).

ser(rui, rapaz).
ser(X, humano) :- humano(X).

frase(A,S,Ob) --> sn(N, S), sv(N, A, Ob, S).
sn(N, S) --> determinante(N-G), nome(N-G, S).
sn(N, S) --> nome(N-_, S).
sv(N, gostar, Ob, S) --> verbo(N, gostar, S), {!}, preposicao(N-G), nome(N-G, Ob).
sv(N, A, Ob, S) --> verbo(N, A, S), sn(_, Ob).
concorda_frase(A, S, Ob):-
    P =.. [A, S, Ob],
    (P, !, write(concordo),
    write(discordo)).
