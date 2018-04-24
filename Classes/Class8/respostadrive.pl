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

nome(p-m) --> [rapazes].
nome(s-m) --> [rapaz].
nome(s-m) --> [rui].
nome(s-m) --> [luis].
nome(s-f) --> [rita].
nome(s-f) --> [ana].
nome(s-f) --> [maria].
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

verbo(s) --> [joga].
verbo(p) --> [jogam].
verbo(s) --> [gosta].
verbo(p) --> [gostam].
verbo(s) --> [come].
verbo(p) --> [comem].
verbo(p) --> [sao].

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

frase(A,S,Ob) --> sn(N, S), sv(N, A, Ob).
sn(N, S) --> determinante(N-G), nome(N-G, S).
sn(N, S) --> nome(N-_, S).
sv(N, gostar, Ob) --> verbo(N, Gostar), {!}, preposicao(N-G), nome(N-G, Ob).
sv(N, A, Ob) --> verbo(N, A), sn(_, Ob).

% 8.2

%%%
% gramática
%

pron_inter(_-_, qualitativa) --> [quem].
pron_inter(p-_, qualitativa) --> [quais].
pron_inter(p-m, quantitativa) --> [quantos].
pron_inter(p-f, quantitativa) --> [quantas].

pronome(_) --> [que].

frase_i(Acao, Atributo, Objeto, Pergunta) --> si(Numero, Atributo, Pergunta), sv(Numero, Acao, Objeto, _).
si(Numero, Atributo, Pergunta) --> pron_inter(Numero-Genero, Pergunta), sni(Numero-Genero, Atributo).
si(Numero, _, Pergunta) --> pron_inter(Numero-_, Pergunta).
sni(Numero-Genero, Atributo) --> determinante(Numero-Genero), nome(Numero-Genero, Atributo), pronome(_, que).
sni(Numero-Genero, Atributo) --> nome(Numero-Genero, Atributo).

valida_frase_i(F) :- frase_i(Acao, Atributo, Objeto, Pergunta, F, []), P =..[Acao, Sujeito, Objeto],
    (var(Atributo), !, findall(Sujeito, P, L) ; findall(Sujeito, (P, ser(Sujeito, Atributo)), L)),
    (Pergunta = qualitativa, !, write(L); length(L, N), write(N)).

