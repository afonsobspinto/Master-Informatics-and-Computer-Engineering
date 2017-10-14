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
