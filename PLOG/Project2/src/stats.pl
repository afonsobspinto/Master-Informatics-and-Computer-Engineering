startTimer:-
    statistics(walltime,_).

stopTimer(TimeElapsed):-
    statistics(walltime,[_,TimeElapsed]).

printTimer(TimeElapsed):-
    TimeElapsedSeconds is ((TimeElapsed//10)*10)/1000,
    write('Time Elapsed: '), write(TimeElapsedSeconds), write('s'), nl.
