%Teacher [+ID, +Name, +Category, +Area, +Preference]

findTeacherWithID(Teachers, ID, Teacher):-
    findall(Elem, (member(Elem, Teachers), getTeacherID(Elem, ID)), List),
    nth0(0, List, Teacher).

findTeacherWorkloadWithID(Teachers, ID, Workload):-
    findTeacherWithID(Teachers, ID, Teacher),
    getTeacherWorkload(Teacher, Workload).

findTeacherPreferenceWithID(Teachers, ID, Preference):-
    findTeacherWithID(Teachers, ID, Teacher),
    getTeacherPreference(Teacher, Preference).

findTeacherAreaWithID(Teachers, ID, Area):-
    findTeacherWithID(Teachers, ID, Teacher),
    getTeacherArea(Teacher, Area).

getTeacherID(Teacher, ID):-
    nth0(0, Teacher, ID).

getTeacherName(Teacher, Name):-
    nth0(1, Teacher, Name).

getTeacherCategory(Teacher, Category):-
    nth0(2, Teacher, Category).

getTeacherWorkload(Teacher, Workload):-
    getTeacherCategory(Teacher, Category),
    (
        Category == 'Professor' -> Workload is 7;
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

/* teacherSemesterHours(Teacher, FirstSemHours, SecondSemHours):-
    getTeacherWorkload(Teacher, Workload),
    getTeacherPreference(Teacher, Preference),
    FirstSemHours is Workload + (Workload * Preference),
    SecondSemHours is (Workload * 2) - FirstSemHours. */

getTeacherWorkloadBySemester(Teacher, Semester, Workload):-
    getTeacherSemesterHours(Teacher, First, Second),
    (
        Semester == 1 -> Workload is First;
        Semester == 2 -> Workload is Second;
        fail
    ).

printTeacherInfo(Teacher):-
    getTeacherID(Teacher, ID),
    getTeacherName(Teacher, Name),
    getTeacherCategory(Teacher, Category),
    getTeacherWorkload(Teacher, Workload),
    getTeacherArea(Teacher, Area),
    getTeacherPreference(Teacher, Preference),

    write(ID), write(' - '), write(Name), write(' '), write(Area), nl,
    write('Category: '), write(Category), nl,
    write('Expected Workload: '), write(Workload), nl,
    write('Preference: '), write(Preference), nl,
    nl.
    
