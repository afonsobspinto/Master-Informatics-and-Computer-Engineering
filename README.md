# SuperSlimeFootball

A simple SuperSlimeSoccer copycat game made using libGDX for the LPOO classes.


## GUI Design

![](https://github.com/Toliveira97/SuperSlimeFootball/blob/master/checkPoint/GUIMockups.png)

## Main Functionalities

Main Menu:
  * SinglePlayer
  * MultiPlayer
  * Options

SinglePlayer: 
  Choose your Slime (Expected other colours when finishing the game): 
  * Blue Slime
  * Green Slime
  
MultiPlayer:
  Searching for other devices in the area
  * Refresh
  * Find IP
 
Options:
  * How to Play?
  * Sound On/Off
  * Comments On/Off
  * Goal Limit 3/4/5/6/7

## Architecture Design

### UML

\*image\*

### Behavioural Aspects
* Moving by tilting
* Newtwork connection (multiplayer mode) via QRCode (??)
* Share match result on social networks

### Design Patterns

* [MVC Design Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) - Software architectural pattern
* [Singleton](https://en.wikipedia.org/wiki/Singleton_pattern) -  Restricts the instantiation of GameModel class
* [State Pattern](https://en.wikipedia.org/wiki/State_pattern) - Restricts the slime movement && controls the game flow
* [Strategy Pattern](https://en.wikipedia.org/wiki/Strategy_pattern) - Controls the AI behavioural 
* [DoubleBuffer]() - Implemented by Libgdx in Graphics(??)
* [Template Method]() - Implemented by Libgdx in GameLoop(??)
* [Observer]() - Implemented by Libgdx with controls listeners (??)


## Test Design

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Authors

* **Afonso Pinto** - [FooWalksIntoABar](https://github.com/FooWalksIntoABar)
* **Tomas Oliveira** - [Toliveira97](https://github.com/Toliveira97)

## Game Art

* Background by [Amon](https://opengameart.org/content/football-pitch)
* Ball and Goal by [looneybits](https://opengameart.org/content/soccer-pack)
