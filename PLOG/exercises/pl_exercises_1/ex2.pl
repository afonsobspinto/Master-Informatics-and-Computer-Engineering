% --- facts list --- %

% --- pilots list --- %
pilot('Lamb').
pilot('Besenyei').
pilot('Chambliss').
pilot('MacLean').
pilot('Mangold').
pilot('Jones').
pilot('Bonhomme').

% --- teams list --- %
team('Breitling').
team('Red Bull').
team('Mediterranean Racing Team').
team('Cobra').
team('Matador').

% --- team members list --- %
isMemberOf('Lamb', 'Breitling').
isMemberOf('Besenyei', 'Red Bull').
isMemberOf('Chambliss', 'Red Bull').
isMemberOf('MacLean', 'Mediterranean Racing Team').
isMemberOf('Mangold', 'Cobra').
isMemberOf('Jones', 'Matador').
isMemberOf('Bonhomme', 'Matador').

% --- planes list --- %
plane('MX2').
plane('Edge540').

% --- pilots planes list --- %
hasPlane('Lamb', 'MX2').
hasPlane('Besenyei', 'Edge540').
hasPlane('Chambliss', 'Edge540').
hasPlane('MacLean', 'Edge540').
hasPlane('Mangold', 'Edge540').
hasPlane('Jones', 'Edge540').
hasPlane('Bonhomme', 'Edge540').

% --- circuits list --- %
circuit('Istanbul').
circuit('Budapest').
circuit('Porto').

% --- winners list --- %
winner('Jones', 'Porto').
winner('Mangold', 'Budapest').
winner('Mangold', 'Istanbul').

% --- gates list --- %
gates('Porto', 5).
gates('Istanbul', 9).
gates('Budapest', 6).


% --- rules list --- %
teamWon(T, C) :- team(T), circuit(C), pilot(P), winner(P, C), isMemberOf(P, T).