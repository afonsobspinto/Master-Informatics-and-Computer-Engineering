%Teacher [+ID, +Name, +Category, +Area, +Preference, -Classes]

getTeacherID(Teacher, ID):-
    nth0(0, Teacher, ID).

getTeacherName(Teacher, Name):-
    nth0(1, Teacher, Name).

getTeacherCategory(Teacher, Category):-
    nth0(2, Teacher, Category).

getTeacherWorkload(Teacher, Workload):-
    getTeacherCategory(Teacher, Category),
    (
        Category == 'Assistant' -> Workload is 7;
        Category == 'Associated' -> Workload is 8;
        Category == 'Assistant' -> Workload is 9;
        fail
    ).

getTeacherArea(Teacher, Area):-
    nth0(3, Teacher, Area).

getTeacherPreference(Teacher, Preference):-
    nth0(4, Teacher, Preference).

getAllTeachersFromArea(Teachers, Area, Result):-
    findall(Teacher, (member(Teacher, Teachers), getTeacherArea(Teacher, Area)), Result).

getTeacherTheoreticalClasses(Teacher, TheoreticalClasses):-
    nth0(5,Teacher,TheoreticalClasses).

    

printTeacherInfo(Teacher):-
    getTeacherID(Teacher, ID),
    getTeacherName(Teacher, Name),
    getTeacherCategory(Teacher, Category),
    getTeacherWorkload(Teacher, Workload),
    getTeacherArea(Teacher, Area),
    getTeacherPreference(Teacher, Preference),
    getTeacherTheoreticalClasses(Teacher, TheoreticalClasses),

    write(ID), write(' - '), write(Name), write(' '), write(Area), nl,
    write('Category: '), write(Category), nl,
    write('Expected Workload: '), write(Workload), nl,
    write('Preference: '), write(Preference), nl,
    write('Theoretical Classes:'), write(TheoreticalClasses), nl,
    nl.
    
