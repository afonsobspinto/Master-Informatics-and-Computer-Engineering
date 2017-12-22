subjects([
%Subject[ID, Name, AreaID, Semester, [Hours Per Theoretical], [Hours Per Pratical]]
[1, 'PLOG', 1, 1, [1], [1]],
[2, 'CLOG', 2, 2, [1], [2]]
]).

teachers([
%Teacher[ID, Name, Category, Area, Preference]
[1, 'HLC', 'Assistant', 2, 0.5],
[2, 'RCS', 'Associated', 1, 0],
[3, 'DCS', 'Assistant', 3, 0],
[4, 'AAS', 'Associated', 3, 1],
[5, 'NHF', 'Assistant', 3, -1]
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
