:-use_module(library(lists)).

%participant(Id,Age,Performance)
participant(1234, 17, 'Pé coxinho').
participant(3423, 21, 'Programar com os pés').
participant(3788, 20, 'Sing a Bit').
participant(4865, 22, 'Pontes de esparguete').
participant(8937, 19, 'Pontes de pen-drives').
participant(2564, 20, 'Moodle hack').

%performance(Id,Times)
performance(1234,[120,120,120,120]).
performance(3423,[32,120,45,120]).
performance(3788,[110,2,6,43]).
performance(4865,[120,120,110,120]).
performance(8937,[97,101,105,110]).

%11
impoeHelper(0, List, List).

impoeHelper(N, List, L):-
  impoe(N, List),
  NewN is N-1,
  impoeHelper(NewN, List, L).

langford(N,L):-
  ListSize is 2*N,
  length(List, ListSize),
  impoeHelper(N, List, L).

%10
impoe(X,L) :- %Este predicado permite a geração de listas que seguem as restrições de espaço entre números (X) enunciadas
    length(Mid,X),
    append(L1,[X|_],L), append(_,[X|Mid],L1).

%9

predX(MaxAge,[ID|TailIds],[Performance|TailPerformance]) :- %Devolve Array de Performances cujos interpretes têm idade menor ou igual a Q
    participant(ID,Age,Performance), Age=<MaxAge, !, %cut Verde
    predX(MaxAge,TailIds,TailPerformance).
predX(MaxAge,[ID|TailIds],TailPerformance) :-
    participant(ID,Age,_), Age>MaxAge,
    predX(MaxAge,TailIds,TailPerformance).
predX(_,[],[]).


%8
eligibleOutcome(Id,Perf,TT) :-
    performance(Id,Times),
    madeItThrough(Id),
    participant(Id,_,Perf),
    sumlist(Times,TT).

nextPhase(N, Participants):-
  findall(TotalTime-ID-Name, eligibleOutcome(ID, Name, TotalTime), Result),
  sort(Result, TempParticipants),
  length(TempParticipants, Length),
  (
    Length < N -> !, fail;
    Diff is Length - N
  ),
  cutBest(TempParticipants, Diff, Participants).

cutBest(TempParticipants, 0, Participants):-
  reverse(TempParticipants, Participants).

cutBest([_|TempParticipants], Diff, Participants):-
  NextDiff is Diff - 1,
  cutBest(TempParticipants, NextDiff, Participants).


%7
 juriFans(L):-
   findall(Participant-Fan, (performance(Participant, Times), nth1(Fan, Times, 120)), Result),
   findall(X-FanLists, (participant(X,_,_), performance(X, _), findall(Fa, member(X-Fa, Result), FanLists)), L).


%6
nSuccessfulParticipants(T):-
  findall(Participant, (performance(Participant, Times), sumlist(Times, Sum), Sum == 480), Result),
  length(Result, T).

%5
allPerfs:-
  performance(ID,Times),
  participant(ID,_, Nome),
  write(ID), write(':'), write(Nome), write(':'), write(Times), nl,
  fail.
allPerfs.

%4
bestParticipant(P1, P2, P) :-
  performance(P1, Times1),
  performance(P2, Times2),
  sumlist(Times1, Score1),
  sumlist(Times2, Score2),
  (
  Score1 > Score2 -> P = P1;
  Score1 < Score2 -> P = P2;
  fail
  ).

%3 Other Method maybe?

patientJuri(JuriMember):-
  bb_put(flag, 0),
  performance(_, List),
  nth1(JuriMember, List, Time),
  bb_get(flag, Counter),
  (
  (Time == 120) -> NewCounter is Counter +1;
  NewCounter is Counter
  ),
  bb_put(flag, NewCounter),
  fail.

patientJuri(_):-
  bb_get(flag, Counter),
  Counter >= 2.

%3 Tomas's Style
patientJuri(JuriMember):-
  performance(Participant1, Avaliation1),
  performance(Participant2, Avaliation2),
  Participant1 \= Participant2,
  nth1(JuriMember, Avaliation1, 120),
  nth1(JuriMember, Avaliation2, 120).


%2
juriTimes(Participant, JuriMember, Times, Total):-
  juriTimesAux(Participant, JuriMember, [], Times, Total).
juriTimesAux([], _, TempTimes, Times, Total):-
  Times = TempTimes,
  sumlist(Times, Total).
juriTimesAux([H|Tail], JuriMember, TempTimes, Times, Total):-
  performance(H, List),
  nth1(JuriMember, List, Time),
  append(TempTimes, [Time], NewTimes),
  juriTimesAux(Tail, JuriMember, NewTimes, Times, Total).


%1
madeItThrough(Participant):-
  performance(Participant, Times),
  member(120, Times).
