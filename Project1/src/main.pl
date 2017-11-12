
%=    ..:: Racing Kings ::..    =%

:- include('menus.pl').
:- include('utilities.pl').
:- include('board.pl').
:- include('game.pl').
:- include('piece.pl').
:- include('testsBoard.pl').

:- use_module(library(lists)).
:- use_module(library(random)).
:- use_module(library(system)).

%TODO: Remove Warnings
racingKings:-
  mainMenu.
