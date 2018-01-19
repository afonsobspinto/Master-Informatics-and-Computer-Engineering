
% --- authors list --- %

author('Eca de Queiroz').
author('Afonso'). % just to test the queiries %

% --- books list --- %

book('Os Maias').
book('Prolog').

% --- nationality list --- %

nationality('Portugues').
nationality('Ingles').

% --- genders list --- %

gender('Romance').
gender('Ficcao').

% --- wrote list --- %

wrote('Eca de Queiroz', 'Os Maias').
wrote('Afonso','Prolog').

% --- book gender list --- %

isFromGender('Os Maias', 'Romance').
isFromGender('Os Maias', 'Ficcao').
isFromGender('Prolog', 'Ficcao').

% --- author nationality list --- %

isFromNationality('Eca de Queiroz', 'Portugues').
isFromNationality('Afonso', 'Portugues').