mainMenu:-
  printMainMenu,
  getChar(Char),
  (
		Input = '1' -> gameMenu, mainMenu;
		Input = '2' -> mainMenu;
		Input = '3' -> mainMenu;
		Input = '4';
		nl,
		write('Error: invalid input.'), nl,
		pressEnterToContinue, nl,
		mainMenu
).

printMainMenu:-
  clearConsole,
  write('..:: Racing Kings ::..'), nl,
  write('=   1. Play                     ='), nl,
  write('=   2. How to play              ='), nl,
  write('=   3. About                    ='), nl,
  write('=   4. Exit                     ='), nl,
  write('Choose an option:'), nl.


gameMenu:-
  	printGameMenu,
  	getChar(Input),
  	(
  		Input = '1' -> startPvPGame;
  		Input = '2' -> ;
  		Input = '3' -> ;
      Input = '4';

  		nl,
  		write('Error: invalid input.'), nl,
  		pressEnterToContinue, nl,
  		gameModeMenu
  	).

printgameModeMenu:-
    	clearConsole,
    	write('=      ..:: Racing Kings ::..      ='), nl,
    	write('=                               ='), nl,
    	write('=   1. Player vs. Player        ='), nl,
    	write('=   2. Player vs. Computer      ='), nl,
    	write('=   3. Computer vs. Computer    ='), nl,
    	write('=   4. Back                     ='), nl,
    	write('=                               ='), nl,
    	write('================================='), nl,
    write('Choose an option:'), nl.

startPvPGame:-
    createPvPGame(Game),
    playGame(Game).
