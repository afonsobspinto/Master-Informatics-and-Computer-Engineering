mainMenu:-
  printMainMenu,
  getChar(Char),
  (
		Char = '1' -> gameMenu, mainMenu;
		Char = '2' -> mainMenu;
		Char = '3' -> mainMenu;
		Char = '4';
		nl,
		write('Error: invalid input.'), nl,
		pressEnterToContinue, nl,
		mainMenu
).

printMainMenu:-
  clearConsole,
  write('   Racing Kings                '), nl, nl,

  write('   1. Play                     '), nl,
  write('   2. How to play              '), nl,
  write('   3. About                    '), nl,
  write('   4. Exit                     '), nl,nl,

  write(' Choose an option:'), nl.


gameMenu:-
  	printGameMenu,
  	getChar(Char),
  	(
  		Char = '1' -> startPvPGame;
  		Char = '2';
  		Char = '3';
      Char = '4';

  		nl,
  		write('Error: invalid input.'), nl,
  		pressEnterToContinue, nl,
  		gameMenu
  	).

printGameMenu:-
    	clearConsole,
    	write('   Racing Kings                '), nl, nl,
    	write('   1. Player vs. Player        '), nl,
    	write('   2. Player vs. Computer      '), nl,
    	write('   3. Computer vs. Computer    '), nl,
    	write('   4. Back                     '), nl,nl,

      write(' Choose an option:'), nl.

startPvPGame:-
    createPvPGame(Game),
    playGame(Game).
