subjects([
%Subject[ID, Name, AreaID, Semester, [Hours Per Theoretical], [Hours Per Pratical]]
[1, 'PLOG', 1, 2, [1,1], [2,2]],
[2, 'CLOG', 1, 1, [1,1], [2,2]],
[3, 'ESOF', 2, 1, [1,1], [2,2]]

]).

teachers([
%Teacher[ID, Name, Category, Area, Preference]
[1, 'WWW', 'Assistant', 1, 0],
[2, 'GGG', 'Assistant', 1, 0],
[3, 'BBB', 'Professor', 1, 0],
[4, 'QQQ', 'Associated', 2, 0],
[5, 'TTT', 'Professor', 2, 0]
]).

scientificArea([
[1, 'Programming'],
[2, 'Multimedia'],
[3, 'Engineering'],
[4, 'Systems'],
[5, 'Information'],
[6, 'AI'],
[7, 'Social']
]).
