clearConsole:-
  write('\33\[2J').

getChar(Input):-
  get_char(Input),
  get_char(_).

pressEnterToContinue:-
  write('Press <Enter> to continue.'), nl,
  get_char(_).
