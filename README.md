# SuperSlimeFootball

A simple SuperSlimeSoccer copycat game made using libGDX for the LPOO classes.


## GUI Design

![](https://github.com/Toliveira97/SuperSlimeFootball/blob/master/checkPoint/GUIMockups.png)

## Main Functionalities

Main Menu:
  * SinglePlayer - allows user to play against computer
  * MultiPlayer - allows user to play with a friend nearby
  * Options - allows user to change settings
  * Facebook - login onto Facebook
  * Twitter - login onto Twitter

SinglePlayer: 
  Choose your Slime (Expected other colours/types when finishing the game): 
  * Blue Slime
  * Green Slime
  
MultiPlayer:
  Searching for other devices in the area
  * Refresh - Starts looking for nearby devices again
  * Find IP - Manual configuration via IP
  * (we migth change this to read QRcodes instead)
 
Options:
  * How to Play? - Info about the game
  * Sound On/Off - Change sound settings
  * Comments On/Off - Change comments 
  * Goal Limit 3/4/5/6/7 - Change goals limit

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
* [Flyweight Pattern](https://en.wikipedia.org/wiki/Flyweight_pattern) - Minimizes memory usage by sharing sprites
* [DoubleBuffer]() - Implemented by Libgdx in Graphics(??)
* [Template Method]() - Implemented by Libgdx in GameLoop(??)
* [Observer]() - Implemented by Libgdx with controls listeners (??)


## Test Design

Explain how to run the automated tests for this system

### Break down into end to end tests

#### [Game Tests]

* Construct Slime - Verifies if constructs a slime properly
* Construct Ball - Verifies if constructs a ball properly
* Construct Goal - Verifies if constructs a goal properly
* Score - Verifies if a slime scores into an oponent's goal
* End Game - Verifies if the game ends 
* Catch Powers - Verifies if the slime catches a power

#### [Physics Tests]

* Move Slime - Verifies if the slime moves correctly
* Contact between Slime and Ball - Verifies if the slime makes contact with the ball
* Contact between Slime and Goal - Verifies if the slime makes contact with the goal
* Contact between Ball and Goal - Verifies if the ball makes contact with the goal

#### [AI Tests]

* Slime Movement - Verifies if the AI slime moves correctly
* Slime Strategies - Verifies if the AI slime makes apropriate strategies

#### [Networking Tests]

* Connection between Devices - Verifies if connects with other devices


## Authors

* **Afonso Pinto** - [FooWalksIntoABar](https://github.com/FooWalksIntoABar)
* **Tomas Oliveira** - [Toliveira97](https://github.com/Toliveira97)

## Game Art

* Background by [Amon](https://opengameart.org/content/football-pitch)
* Ball and Goal by [looneybits](https://opengameart.org/content/soccer-pack)
