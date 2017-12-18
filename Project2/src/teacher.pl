%Teacher [Name, Category, Area, Preference]

getTeacherName(Teacher, Name):-
    nth0(0, Teacher, Name).

getTeacherCategory(Teacher, Category):-
    nth0(1, Teacher, Category).

getTeacherWorkload(Teacher, Workload):-
    getTeacherCategory(Teacher, Category),
    (
        Category == 'Assistant' -> Workload is 7;
        Category == 'Associated' -> Workload is 8;
        Category == 'Assistant' -> Workload is 9;
        fail
    ).

getTeacherArea(Teacher, Area):-
    nth0(2, Teacher, Area).

getTeacherPreference(Teacher, Preference):-
    nth0(3, Teacher, Preference).

printTeacherInfo(Teacher):-
    getTeacherName(Teacher, Name),
    getTeacherCategory(Teacher, Category),
    getTeacherWorkload(Teacher, Workload),
    getTeacherArea(Teacher, Area),
    getTeacherPreference(Teacher, Preference),

    write(Name), write(' '), write(Area), nl,
    write('Category: '), write(Category), nl,
    write('Expected Workload: '), write(Workload), nl,
    write('Preference: '), write(Preference), nl.
