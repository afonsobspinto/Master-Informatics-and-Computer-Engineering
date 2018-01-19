%Resolução PLOG MT1 2016-2017

:- use_module(library(lists)).
:- use_module(library(between)).
:- dynamic vote/2.
:- dynamic user/3.
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


intersetam(Lista1, Lista2):-
  findall(N, (member(N1Min-N1Max, Lista1), member(N2Min-N2Max, Lista2), between(N1Min, N1Max, N), between(N2Min, N2Max, N)), List),
  length(List, Length),
  Length \= 0.


%9
nNumeros(Lista, NNumeros):-
  findall(N, (member(N1-N2, Lista), N is N2-N1+1), List),
  sumlist(List, NNumeros).


%8
dumpDataBase(FileName):-
  tell(FileName),
  listing(film),
  listing(user),
  listing(vote),
  told.


%7
filmVoting:-
  film(Film, _, _, _),
  findall(User-Vote, (vote(User, List), member(Film-Vote, List)), Result),
  assert(filmUsersVotes(Film, Result)),
  fail.
filmVoting.


%6
onlyOne(User1, User2, OnlyOneList):-
  findall(Movie, (vote(User1, List1), vote(User2, List2), getMovies(List1, Movies1), getMovies(List2, Movies2), member(Movie, Movies1), \+(member(Movie, Movies2))),ListOne),
  findall(Movie, (vote(User1, List1), vote(User2, List2), getMovies(List1, Movies1), getMovies(List2, Movies2), member(Movie, Movies2),\+(member(Movie, Movies1))),ListTwo),
  append(ListOne, ListTwo, OnlyOneList).


% 5
invert(PredicateSymbol, Arity) :-
  deleteData(PredicateSymbol, Arity, DeletedData),
  reverse(DeletedData, ReversedDeletedData),
  saveData(PredicateSymbol, Arity, ReversedDeletedData).

deleteData(PredicateSymbol, Arity, [Head|Tail]):-
  functor(E, PredicateSymbol, Arity),
  E =.. [_|Head],
  retract(E),
  deleteData(PredicateSymbol, Arity, Tail).
deleteData(_, _, _).

saveData(PredicateSymbol, Arity, [Head|Tail]):-
  functor(E, PredicateSymbol, Arity),
  E =..[PredicateSymbol | Head],
  assert(E),
  saveData(PredicateSymbol, Arity, Tail).
saveData(_,_,_).


recommends(User, Movie):-
  vote(User, List),
  getMovies(List, Movies),
  vote(OtherUser, OtherList),
  OtherUser \= User,
  getMovies(OtherList, OtherMovies),
  length(Movies, LengthMovies),
  length(OtherMovies, LengthOtherMovies),
  LengthMovies < LengthOtherMovies,
  sort(OtherMovies, OtherMoviesSorted), sort(Movies, MoviesSorted), %%Workaround
  segment(OtherMoviesSorted, MoviesSorted), !,                      % What I really wanted was sublist but this works too
  findMovie(OtherMoviesSorted, MoviesSorted, Movie).

findMovie([Head|_OtherMovies], Movies, Movie):-
  \+(member(Head, Movies)),
  Movie = Head.

findMovie([_Head|OtherMovies], Movies, Movie):-
  findMovie(OtherMovies, Movies, Movie).

getMovies(List, Movies):-
  getMoviesAux(List, [], Movies).

getMoviesAux([], Acc, Acc).
getMoviesAux([Movie-_Vote|Tail], Acc, Movies):-
  getMoviesAux(Tail, [Movie|Acc], Movies).

%3
likedBetter(User1, User2):-
  vote(User1, List1),
  vote(User2, List2),
  getMax(List1, Max1),!,
  getMax(List2, Max2),!,
  Max1 > Max2.

getMax(List, Max):-
  getMaxAux(List, 0, Max).

getMaxAux([], Acc, Acc).
getMaxAux([_Movie-Vote|Tail], Acc, Max):-
  Vote > Acc,
  NewAcc is Vote,
  getMaxAux(Tail, NewAcc, Max).

getMaxAux([_Movie-_Vote|Tail], Acc, Max):-
    getMaxAux(Tail, Acc, Max).

%2
happierGuy(User1, User2, HappierGuy):-
  vote(User1, List1),
  vote(User2, List2),
  calcAvg(List1, Avg1),
  calcAvg(List2, Avg2),
  (
  Avg1 >= Avg2 -> HappierGuy = User1 ;
  HappierGuy = User2
  ).

calcAvg(List, Avg):-
  length(List, Length),
  calcAvgAux(List, 0, Sum),
  Avg is Sum / Length.

calcAvgAux([], Acc, Acc).

calcAvgAux([_Movie-Vote| Tail], Acc, Sum):-
  NewAcc is Acc + Vote,
  calcAvgAux(Tail, NewAcc, Sum).



%1
raro(Movie):-
  film(Movie, _ , Duration, _),
  (Duration < 60 ; Duration >= 120).
