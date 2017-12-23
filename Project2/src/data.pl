subjects([
    %Subject[ID, Name, AreaID, Semester, [Hours Per Theoretical], [Hours Per Pratical]]
    [1, 'PLOG', 1, 2, [1,1,1,1,1,1,1], []],
    [2, 'CLOG', 1, 1, [1,1,1,1,1,1,1], []]

]).
    
    teachers([
    %Teacher[ID, Name, Category, Area, Preference]
    [1, 'HLC', 'Assistant', 1, 7],
    [2, 'CLH', 'Assistant', 1, -7],
    [3, 'HCL', 'Assistant', 1, 0]

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
    