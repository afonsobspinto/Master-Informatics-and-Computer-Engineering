example(S,T):-
    exampleSubjects(S),
    exampleTeachers(T).

%[Name, Area, Semester, HT, #TheoreticalClasses, HP, #PracticalClasses]
exampleSubjects(S):-
    S = [
        ['PLOG', 'Programming', 1, 2, 2, 12, 6],
        ['LAIG', 'Multimedia', 1, 2, 1, 18, 6],
        ['ESOF', 'Engineering', 1, 2, 1, 12, 6],
        ['LTW', 'Information', 1, 2, 1, 12, 6],
        ['RCOM', 'Systems', 1, 2, 1, 14, 7],

        ['LBAW', 'Information', 2, 2, 2, 18, 6],
        ['IART', 'AI', 2, 3, 1, 6, 3],
        ['COMP', 'Programming', 2, 3, 1, 6, 3],
        ['SDIS', 'Systems', 2, 2, 1, 12, 6],
        ['PPIN', 'Social', 2, 2, 1, 6, 3]
    ].

%[Name, Category, Area, Preference]
exampleTeachers(T):-
    T = [
        ['HLC', 'Assistant', 'Programming', 0],
        ['RCS', 'Associated', 'Programming', 0],
        ['DCS', 'Assistant', 'Programming', 0],

        ['AAS', 'Associated', 'Multimedia', 0],
        ['AVC', 'Assistant', 'Multimedia', 0],
        ['JGB', 'Assistant', 'Multimedia', 0],
        ['RPR', 'Assistant', 'Multimedia', 0],

        ['AMA', 'Assistant', 'Engineering', 0],
        ['TBS', 'Assistant', 'Engineering', 0],
        ['NHF', 'Assistant', 'Engineering', 0],

        ['MPR', 'Associated', 'Systems', 0],
        ['JMCN', 'Assistant', 'Systems', 0],
        ['MTA', 'Assistant', 'Systems', 0],
        ['SRC', 'Assistant', 'Systems', 0],

        ['AOR', 'Assistant', 'Information', 0],
        ['FFC', 'Assistant', 'Information', 0],
        ['JCL', 'Assistant', 'Information', 0],

        ['SSN', 'Assistant', 'Information', 0],

        ['ECO', 'Professor', 'AI', 0],
        ['APR', 'Assistant', 'AI', 0],

        ['JMPC', 'Professor', 'Programming', 0],
        ['RJFN', 'Assistant', 'Programming', 0],
        ['TDRC', 'Assistant', 'Programming', 0],

        ['PFS', 'Assistant', 'Systems', 0],
        ['HFC', 'Assistant', 'Systems', 0],

        ['MFST', 'Assistant', 'Social', 0],
        ['FMSTT', 'Assistant', 'Social', 0]
    ].