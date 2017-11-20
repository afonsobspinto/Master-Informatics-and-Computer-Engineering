%Resolução PLOG MT1 2016-2017

:- use_module(library(lists)).
:- dynamic film/4.


% film(title, categorie, duration, avgClassification)
film('Doctor Strange', [action, adventure, fantasy], 115, 7.6).
film('Hacksaw Ridge', [biography, drama, romance], 131, 8.7).
film('Inferno', [action, adventure, crime], 121, 6.4).
film('Arrival', [drama, mystery, scifi], 116, 8.5).
film('The Accountant', [action, crime, drama], 127, 7.6).
film('The Girl on the Train', [drama, mystery, thriller], 112, 6.7).

%user(username, yearofbirth, country)
user(john, 1992, 'USA').
user(jack, 1989, 'UK').
user(peter, 1983, 'Portugal').
user(harry, 1993, 'USA').
user(richard, 1982, 'USA').

%vote(username, list-of-film-rating)
vote(john, ['Inferno'-7, 'Doctor Strange'-9, 'The Accountant'-6]).
vote(jack, ['Inferno'-8, 'Doctor Strange'-8, 'The Accountant'-7]).
vote(peter, ['The Accountant'-4, 'Hacksaw Ridge'-7, 'The Girl on the Train'-3]).
vote(harry, ['Inferno'-7, 'The Accountant'-6]).
vote(richard, ['Inferno'-10, 'Hacksaw Ridge'-10, 'Arrival'-9]).


%13
minJogadas(StartPos, StartPos, 0).
minJogadas(StartPos, DestPos, Min):-
  minJogadasAux(StartPos, DestPos, 0, Min).

minJogadasAux(SrcRow/SrcCol, DestRow/DestCol, Counter, Min):-
  podeMoverEmN(SrcRow/SrcCol, Counter, PossibleMoves),
  write(PossibleMoves),
  member(DestRow/DestCol, PossibleMoves), !,
  Min is Counter.

minJogadasAux(SrcRow/SrcCol, DestRow/DestCol, Counter, Min):-
  NextCounter is Counter+ 1,
  minJogadasAux(SrcRow/SrcCol, DestRow/DestCol, NextCounter, Min).

%12

podeMoverEmN(SrcRow/SrcCol, 0, [SrcRow/SrcCol]).

podeMoverEmN(SrcRow/SrcCol, N, PossibleMoves):-
  N > 0,
  NextN is N-1,
  move(SrcRow/SrcCol, TempPossibleMoves),
  findall(NewTempPossibleMoves, (member(Move, TempPossibleMoves), podeMoverEmN(Move, NextN, NewTempPossibleMoves)), ListOfLists),
  append(ListOfLists, JustOneList),
  append(TempPossibleMoves, JustOneList, UnsortedPossibleMoves),
  sort(UnsortedPossibleMoves, PossibleMoves).



%11
move(SrcRow/SrcCol, PossibleMoves):-
  findall(DestRow/DestCol, (
  knightBasicMove(SrcRow, SrcCol, DestRow,DestCol),
  validRowCol(DestRow, DestCol)
  ), PossibleMoves).


knightBasicMove(SrcRow, SrcCol, DestRow, DestCol):-
  DestCol is SrcCol - 2,
  DestRow is SrcRow + 1.
knightBasicMove(SrcRow, SrcCol, DestRow, DestCol):-
  DestCol is SrcCol - 2,
  DestRow is SrcRow - 1.

knightBasicMove(SrcRow, SrcCol, DestRow, DestCol):-
  DestCol is SrcCol + 2,
  DestRow is SrcRow + 1.
knightBasicMove(SrcRow, SrcCol, DestRow, DestCol):-
  DestCol is SrcCol + 2,
  DestRow is SrcRow - 1.

knightBasicMove(SrcRow, SrcCol, DestRow, DestCol):-
  DestRow is SrcRow - 2,
  DestCol is SrcCol + 1.
knightBasicMove(SrcRow, SrcCol, DestRow, DestCol):-
  DestRow is SrcRow - 2,
  DestCol is SrcCol - 1.

knightBasicMove(SrcRow, SrcCol, DestRow, DestCol):-
  DestRow is SrcRow + 2,
  DestCol is SrcCol + 1.
knightBasicMove(SrcRow, SrcCol, DestRow, DestCol):-
  DestRow is SrcRow + 2,
  DestCol is SrcCol - 1.

validRowCol(Row, Col):-
  Row > 0,
  Row < 9,
  Col > 0,
  Col < 9.

%10
userAverageVote(User, Average):- %Calculates the average classification assigned by User
  vote(User, VoteList), !, %Green Cut, doesn't affect the final result (if an user has only one list of votes as it seems)
  findall(Vote, member(_Film-Vote, VoteList), VoteScoreList),
  length(VoteScoreList, Length),
  sumlist(VoteScoreList, Sum),
  Average is Sum/Length.

%9
update(Film):-
  findall(Vote,
    (
    vote(_, List),
    member(Film-Vote, List)
    ), Result),
  listAvg(Result, VoteAvg),
  retract(film(Film,Categories,Duration,_)),
  assert(film(Film, Categories, Duration, VoteAvg)).


%8
distancia(User1, Distancia, User2):-
  user(User1, Year1, Country1),
  user(User2, Year2, Country2),

  AgeDiff is abs(Year2-Year1),
  (
    (Country1 == Country2) -> CountryDiff is 0;
    CountryDiff is 2
  ),

  vote(User1, List1),
  vote(User2, List2),
  findall(VoteDiff, (member(TempFilm-V1, List1), member(TempFilm-V2, List2), (VoteDiff is abs(V1-V2))), Result),
  listAvg(Result, AvgDiff),

  Distancia is (AvgDiff + AgeDiff/3 + CountryDiff).

listAvg(List,AvgDiff):-
  sumlist(List, Sum),
  length(List, Length),
  AvgDiff is (Sum/ Length).

%7
mostSimilar(Film, Similarity, Films):-
  findall(TempSim-TempFilm, (similarity(Film, TempFilm, TempSim), TempFilm \= Film), Result), !,
  max_member(Similarity-_, Result),
  Similarity > 10,
  findall(TempFilm2, member(Similarity-TempFilm2, Result), Films).

mostSimilar(_, 0, []).

%6
similarity(Film1, Film2, Similarity):-
  film(Film1, Categories1, Duration1, Classification1),
  film(Film2, Categories2, Duration2, Classification2),

  DurDiff is abs(Duration2 - Duration1),
  ScoreDiff is abs(Classification2 - Classification1),

  elemsComuns(Categories1, Common, Categories2),
  length(Common, Numerator),

  union(Categories1, Categories2, Union),
  length(Union, Denominator),

  PercentCommonCat is (Numerator/Denominator)*100,

  Similarity is PercentCommonCat - (3 * DurDiff) - (5*ScoreDiff).

union(List1, List2, Union):-
  append(List1, List2, Temp),
  sort(Temp, Union). %Remove Duplicates

%4
elemsComuns(List1, Common, List2):-
  elemsComunsAux(List1, List2, [], Common).

elemsComunsAux([], _, L, Commom):-
  sort(L, Commom).

elemsComunsAux([H|Tail], List2, L, Commom):-
  member(H, List2), !,
  elemsComunsAux(Tail, List2, [H|L], Commom).

elemsComunsAux([_|Tail], List2, L, Commom):-
  elemsComunsAux(Tail, List2, L, Commom).


%5
printCategory(Category):-
  film(Title, ListCategories, Duration, Classification),
  member(Category, ListCategories),
  write(Title), write(' ('), write(Duration), write('min, '),
  write(Classification), write('/10)'), nl,
  fail.

printCategory(_).



%3
niceGuy(User):-
  vote(User, Movies),
  member(Film-Vote1, Movies),
  Vote1 >= 8,
  member(Film-Vote2, Movies),
  Vote2 > 8.


%2
diff(User1, User2, Difference, Film):-
  vote(User1, List1),
  vote(User2, List2),
  member(Film-Vote1, List1),
  member(Film-Vote2, List2),
  Difference is abs(Vote1-Vote2).

%1
curto(Movie):-
  film(Movie,_,Duration,_),
  Duration < 125.
