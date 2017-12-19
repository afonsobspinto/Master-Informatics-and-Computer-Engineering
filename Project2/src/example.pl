example(S,T):-
    exampleSubjects(S),
    exampleTeachers(T),
    exampleArea(A).

%Subject[ID, Name, Area, Semester, [Hours Per Theoretical], [Hours Per Pratical]]
exampleSubjects(S):-
    S = [
        [1, 'PLOG', 'Programming', 1, [1, 1], [2, 2, 2, 2, 2, 2]],
        [2, 'LAIG', 'Multimedia', 1, [2], [3, 3, 3, 3, 3, 3]],
        [3, 'ESOF', 'Engineering', 1, [2], [2, 2, 2, 2, 2, 2]],
        [4, 'LTW', 'Information', 1, [2], [2, 2, 2, 2, 2, 2]],
        [5, 'RCOM', 'Systems', 1, [2], [2, 2, 2, 2, 2, 2, 2]],

        [6, 'LBAW', 'Information', 2, [1, 1], [3, 3, 3, 3, 3, 3]],
        [7, 'IART', 'AI', 2, [3], [2, 2, 2]],
        [8, 'COMP', 'Programming', 2, [3, 1], [2, 2, 2]],
        [9, 'SDIS', 'Systems', 2, [2], [2, 2, 2, 2, 2, 2]],
        [10, 'PPIN', 'Social', 2, [2], [2, 2, 2]]
    ].

%Teacher[ID, Name, Category, Area, Preference(between -1 and 1)]
exampleTeachers(T):-
    T = [
        [1, 'HLC', 'Assistant', 'Programming', 0],
        [2, 'RCS', 'Associated', 'Programming', 0],
        [3, 'DCS', 'Assistant', 'Programming', 0],

        [4, 'AAS', 'Associated', 'Multimedia', 0],
        [5, 'AVC', 'Assistant', 'Multimedia', 0],
        [6, 'JGB', 'Assistant', 'Multimedia', 0],
        [7, 'RPR', 'Assistant', 'Multimedia', 0],

        [8, 'AMA', 'Assistant', 'Engineering', 0],
        [9, 'TBS', 'Assistant', 'Engineering', 0],
        [10, 'NHF', 'Assistant', 'Engineering', 0],

        [11, 'MPR', 'Associated', 'Systems', 0],
        [12, 'JMCN', 'Assistant', 'Systems', 0],
        [13, 'MTA', 'Assistant', 'Systems', 0],
        [14, 'SRC', 'Assistant', 'Systems', 0],

        [15, 'AOR', 'Assistant', 'Information', 0],
        [16, 'FFC', 'Assistant', 'Information', 0],
        [17, 'JCL', 'Assistant', 'Information', 0],

        [18, 'SSN', 'Assistant', 'Information', 0],

        [19, 'ECO', 'Professor', 'AI', 0],
        [20, 'APR', 'Assistant', 'AI', 0],

        [21, 'JMPC', 'Professor', 'Programming', 0],
        [22, 'RJFN', 'Assistant', 'Programming', 0],
        [23, 'TDRC', 'Assistant', 'Programming', 0],

        [24, 'PFS', 'Assistant', 'Systems', 0],
        [25, 'HFC', 'Assistant', 'Systems', 0],

        [26, 'MFST', 'Assistant', 'Social', 0],
        [27, 'FMSTT', 'Assistant', 'Social', 0]
    ].

%Area[ID, Name]
exampleArea(A):-
    A = [
        [1, 'Programming'],
        [2, 'Multimedia'],
        [3, 'Engineering'],
        [4, 'Systems'],
        [5, 'Information'],
        [6, 'AI'],
        [7, 'Social']
    ].