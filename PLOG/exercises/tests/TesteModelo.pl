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

langford(N,L):-
	LSize is 2*N,
  	length(Acc, LSize),
	impoeAux(N, Acc, L).

impoeAux(0, Acc, Acc).
impoeAux(N, Acc, L):-
	impoe(N,Acc),
	NewN is N-1,
	impoeAux(NewN, Acc, L).

%10
impoe(X,L) :- %Este predicado permite a geração de listas que seguem as restrições de espaço entre números enunciadas. X representa o número em questão.
    length(Mid,X),
    append(L1,[X|_],L), append(_,[X|Mid],L1).


%9
getPerformanceUnderMaxAge(MaxAge,[ID|IdsTail],[Performance|PerformanceTail]) :- %Obtem lista de performances com interpretes de idade não superior a MaxAge
    participant(ID,Age,Performance), Age=<MaxAge, !, %Cut Verde, Nao altera soluções
    getPerformanceUnderMaxAge(MaxAge,IdsTail,PerformanceTail).
getPerformanceUnderMaxAge(MaxAge,[ID|IdsTail],PerformanceTail) :-
    participant(ID,Age,_), Age>MaxAge,
    getPerformanceUnderMaxAge(MaxAge,IdsTail,PerformanceTail).
getPerformanceUnderMaxAge(_,[],[]).

%8
eligibleOutcome(Id,Perf,TT):-
    performance(Id,Times),
    madeItThrough(Id),
    participant(Id,_,Perf),
    sumlist(Times,TT).

nextPhase(N, Participants):-
	findall(TT-Id-Perf, eligibleOutcome(Id,Perf,TT), List),
	sort(List, WorstFirst),
	length(WorstFirst, Length),
	Length >= N,
	Diff is Length-N,
	cutList(WorstFirst, Diff, Participants).

cutList(List, 0, Participants):-
	reverse(List,Participants).
cutList([_|Tail], Diff, Participants):-
	NewDiff is Diff -1,
	cutList(Tail, NewDiff, Participants).

%7
juriFans(JuriFansList):-
	findall(Participant-ListFan, (performance(Participant, Times), findall(Fan, nth1(Fan, Times, 120), ListFan)), JuriFansList).

%6
nSuccessfulParticipants(T):-
	findall(Participant, (performance(Participant,Times), sumlist(Times, Sum), length(Times, Length), NoClick is Length * 120, Sum == NoClick), List),
	length(List, T).


%5
allPerfs:-
	performance(Participant, Times),
	participant(Participant, _, Performance),
	write(Participant), write(:), write(Performance), write(:), write(Times), nl,
	fail.
allPerfs.


%4
bestParticipant(P1, P2, Performance):-
	performance(P1, Times1),
	performance(P2, Times2),
	sumlist(Times1, Sum1),
	sumlist(Times2, Sum2),
	Sum1 > Sum2,
	Performance = P1.

bestParticipant(P1, P2, Performance):-
	performance(P1, Times1),
	performance(P2, Times2),
	sumlist(Times1, Sum1),
	sumlist(Times2, Sum2),
	Sum1 < Sum2,
	Performance = P2.

%3
patientJuri(JuriMember):-
	performance(Participant1, List1),
	nth1(JuriMember, List1, Time1),
	Time1 == 120,
	performance(Participant2, List2),
	nth1(JuriMember, List2, Time2),
	Time2 == 120,
	Participant1 \= Participant2.




%2
juriTimes(Participants, JuriMember, Times, Total):-
	juriTimesAux(Participants,JuriMember, [], Times, Total).


juriTimesAux([], _, Acc, Times, Total):-
	Times = Acc,
	sumlist(Times, Total).

juriTimesAux([Head|Tail], JuriMember, Acc, Times, Total):-
	performance(Head, List),
	nth1(JuriMember, List, Time),
	append(Acc, [Time], NewAcc),
	juriTimesAux(Tail, JuriMember, NewAcc, Times, Total).


%1

madeItThrough(Participant):-
	performance(Participant, Times),
	member(120, Times).
