mainMenu:-
  printMainMenu,
  getChar(Char),
  (
		Char = '1' -> gameMenu, mainMenu;
		Char = '2' -> howToPlayMenu;
		Char = '3' -> aboutMenu;
		Char = '4';
		nl,
		write('Error: invalid input.'), nl,
		pressEnterToContinue, nl,
		mainMenu
).

printMainMenu:-
  clearConsole,
  write(' _____________________________________________ '),nl,
  write('|                                             |'),nl,
  write('|               Racing Kings                  |'),nl,
  write('|                                             |'),nl,
  write('|                                             |'),nl,
  write('| 1. Play                                     |'),nl,
  write('| 2. How to Play                              |'),nl,
  write('| 3. About                                    |'),nl,
  write('| 4. Exit                                     |'),nl,
  write('|                                             |'),nl,
  write('| Choose an option:                           |'),nl,
  write('|_____________________________________________|'),nl,
  nl, nl.
  
howToPlayMenu:-
  printHowToPlayMenu,
  getChar(Char),
  (
		Char = '1' -> mainMenu;
		Char = '2';
		nl,
		write('Error: invalid input.'), nl,
		pressEnterToContinue, nl,
		mainMenu
).

printHowToPlayMenu:-
  clearConsole,
  write(' ________________________________________________________________________ '),nl,
  write('|                                                                        |'),nl,
  write('|     How to Play?                                                       |'),nl,
  write('|                                                                        |'),nl,
  write('|                                                                        |'),nl,
  write('| The purpose of the game is to be the first player to move his king     |'),nl,
  write('| to the eight row. When whoevers playing white moves their king to      |'),nl,
  write('| the eight row, and the one playing black moves their king to the last  |'), nl,
  write('| row as well, directly after that, the game ends in a draw.             |'),nl,
  write('| In this game, check is entirely forbidden, not only is it forbidden    |'),nl,
  write('| to move ones king into check, but it is also forbidden to check the    |'),nl,
  write('| opponents king.                                                        |'),nl,
  write('|                                                                        |'),nl,
  write('| 1. Back                                                                |'),nl,
  write('| 2. Exit                                                                |'),nl,
  write('|________________________________________________________________________|'),nl,
  nl, nl.

aboutMenu:-
  printAboutMenu,
  getChar(Char),
  (
		Char = '1' -> mainMenu;
		Char = '2';
		nl,
		write('Error: invalid input.'), nl,
		pressEnterToContinue, nl,
		mainMenu
).

printAboutMenu:-
  clearConsole,
  write(' ________________________________________________________________ '),nl,
  write('|                                                                |'),nl,
  write('|     About                                                      |'),nl,
  write('|                                                                |'),nl,
  write('|                                                                |'),nl,
  write('| The game is a variant of Chess, invented by Vernan R. Parton.  |'),nl,
  write('| Adapted to PROLOG by Afonso Pinto and Tomás Oliveira.          |'),nl,
  write('|                                                                |'),nl,
  write('| 1. Back                                                        |'),nl,
  write('| 2. Exit                                                        |'),nl,
  write('|_______________________________________________________________ |'),nl,
  nl, nl.
  
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
  write(' _____________________________________________ '),nl,
  write('|                                             |'),nl,
  write('|               Racing Kings                  |'),nl,
  write('|                                             |'),nl,
  write('|                                             |'),nl,
  write('| 1. Player vs Player                         |'),nl,
  write('| 2. Player vs Computer                       |'),nl,
  write('| 3. Computer vs Computer                     |'),nl,
  write('| 4. Back                                     |'),nl,
  write('|                                             |'),nl,
  write('| Choose an option:                           |'),nl,
  write('|_____________________________________________|'),nl,
  nl, nl.

startPvPGame:-
    createPvPGame(Game),
    playGame(Game).
