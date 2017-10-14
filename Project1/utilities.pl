clearConsole:-
  %write('\33\[2J').
  nl,nl,nl.

getChar(Input):-
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
