:- use_module(library(lists)).

slots(4).
disciplinas(12).
disciplina(1,[1,2,3,4,5]). % Os alunos 1,2,3,4,5 estão inscritos à disciplina 1
disciplina(2,[6,7,8,9]).
disciplina(3,[10,11,12]).
disciplina(4,[1,2,3,4]).
disciplina(5,[5,6,7,8]).
disciplina(6,[9,10,11,12]).
disciplina(7,[1,2,3,5]).
disciplina(8,[6,7,8]).
disciplina(9,[4,9,10,11,12]).
disciplina(10,[1,2,4,5]).
disciplina(11,[3,6,7,8]).
disciplina(12,[9,10,11,12]).

% a)
incompat(D1, D2, NA):-
    disciplina(D1, LA1),
    disciplina(D2, LA2),
    findall(A,(member(A,LA1), member(A,LA2)),LA12),
    length(LA12, NA).

% b)
f_aval(L, V):-
    findall(NA,(nth1(D1, L, Slot), nth1(D2, L, Slot), D1 < D2, incompat(D1, D2, NA)), LInc),
    sumlist(LInc, V).

% c)
hillclimbing(S, SF):-
    f_aval(S, V),
    vizinho(S, S2),
    f_aval(S2, V2),
    V2 < V,
    !, write(S2:V2), nl,
    hillclimbing(S2, SF).
hillclimbing(SF, SF).

vizinho(S, SV):-
    slots(NSlots),
    nth1(D, S, Slot),
    between(1, NSlots, NovoSlot),
    NovoSlot \= Slot,
    D1 is D - 1,
    length(S1, D1),
    append(S1, [Slot | S2], S),
    append(S1, [NovoSlot | S2], SV).