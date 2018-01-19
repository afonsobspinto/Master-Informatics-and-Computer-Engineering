subjects([
%Subject[ID, Name, AreaID, Semester, [Hours Per Theoretical], [Hours Per Pratical]]
[1, 'PLOG', 1, 1, [1], [2,2]],
[2, 'COMP', 1, 2, [1], [2,2,2]],
[3, 'LTW', 2, 1, [1,1], [2,2]],
[4, 'LBAW', 2, 2, [1], [2,2]],
[5, 'IART', 3, 1, [1], [2,2]]
]).

teachers([
%Teacher[ID, Name, Category, Area, Preference]
[1, 'HLC', 'Assistant', 1, -4],
[2, 'RCS', 'Associated', 1, 0],
[3, 'DCS', 'Assistant', 1, 0],
[4, 'AOR', 'Professor', 2, 0],
[5, 'ECO', 'Professor', 3, 4]
]).

scientificArea([
[1, 'Programming'],
[2, 'Information'],
[3, 'AI']
]).
