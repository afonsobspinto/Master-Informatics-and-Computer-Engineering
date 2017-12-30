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
  Return is (Y-96). %'a'-1=96


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


matrix_to_json([], []).
matrix_to_json([List | R], [JsonList | Json]):-
  list_to_json(List, JsonList),
  matrix_to_json(R, Json).

list_to_json([], []).
list_to_json([Element | Rest], [JSONElem | JsonRest]):-
  json(Element, JSONElem),
  list_to_json(Rest, JsonRest).

/*key_value_to_json_obj([], []).
key_value_to_json_obj([K-V | Ls], [PropName:PropVal | Os]):-
    surround(K, '"', '"', PropName),
    json(V, PropVal),
    key_value_to_json_obj(Ls, Os).



json([K-V | Rest], Output):-
    key_value_to_json_obj([K-V | Rest], ObjectContent),
    surround(ObjectContent, '{', '}', Output).
    %atom_concat('{', ObjectContent, ObjectLeft),
    %atom_concat('}', ObjectLeft, Output).*/

json(List, Output):-
    is_list(List),
    list_to_json(List, Output).

json(Number, Number):-
    number(Number).

json(Element, JSONElem):-
  surround(Element, '"', '"', JSONElem).
  %atom_concat('"', Element, JSONTemp),
  %atom_concat(JSONTemp, '"', JSONElem).


surround(Element, Left, Right, Surrounded):-
  atom_concat(Left, Element, Temp),
  atom_concat(Temp, Right, Surrounded).
