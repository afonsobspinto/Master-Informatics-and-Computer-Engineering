clearConsole:-
  write('\33\[2J').
  %nl,nl,nl.

getChar(Input):- %TODO: 34 is read as 3 with this method
  get_char(Input),
  get_char(_).

pressEnterToContinue:-
  write('Press <Enter> to continue.'), nl,
  get_char(_).

convertToNumber(Char, Return):-
  char_code(Char, Y),
  Return is (Y - 96). %'a'-1=96


getRowInt(Return):-
  get_code(Input),
  Return is Input - 48,
  Return > 0,
  Return < 9.

getColChar(Return):-
  get_char(Return),
  char_code(Return, Validation),
  Validation > 96,
  Validation < 105.


matrixToJson([], []).
matrixToJson([List | R], [JsonList | Json]):-
  listToJson(List, JsonList),
  matrixToJson(R, Json).

listToJson([], []).
listToJson([Element | Rest], [JSONElem | JsonRest]):-
  json(Element, JSONElem),
  listToJson(Rest, JsonRest).

json(List, Output):-
    is_list(List),
    listToJson(List, Output).

json(Number, Number):-
    number(Number).

json(Element, JSONElem):-
  addCommas(Element, '"', '"', JSONElem).

addCommas(Element, Left, Right, JSONElem):-
  atom_concat(Left, Element, Temp),
  atom_concat(Temp, Right, JSONElem).
