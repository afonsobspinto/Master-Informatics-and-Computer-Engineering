# SuperSlimeFootball

A simple SuperSlimeSoccer copycat game made using libGDX for the LPOO classes.


## GUI Design

![](https://github.com/Toliveira97/SuperSlimeFootball/blob/master/checkPoint/GUIMockups.png)

### Main Functionalities

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

### Package Diagram

![](https://github.com/Toliveira97/SuperSlimeFootball/blob/master/checkPoint/PackageDiagram.png)

### UML

![](https://github.com/Toliveira97/SuperSlimeFootball/blob/master/checkPoint/uml.png)

### Behavioural Aspects
* Moving by tilting
* Newtwork connection (multiplayer mode) via QRCode 
* Login and Share options on social networks

### Design Patterns

* [MVC Design Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) - Software architectural pattern 
* [Singleton](https://en.wikipedia.org/wiki/Singleton_pattern) -  Restricts the instantiation of GameModel class
* [State Pattern](https://en.wikipedia.org/wiki/State_pattern) - Restricts the slime movement (in GameController class) && controls the game flow (StateModel )
* [Strategy Pattern](https://en.wikipedia.org/wiki/Strategy_pattern) - Controls the AI behavioural (in GameController) 
* [Flyweight Pattern](https://en.wikipedia.org/wiki/Flyweight_pattern) - Minimizes memory usage by sharing sprites (in EntityView class)
* [Factory Pattern](https://en.wikipedia.org/wiki/Factory_method_pattern) - Creates new object Views using EntityView as a common interface (in ViewFactory class)
* [DoubleBuffer]() - Implemented by Libgdx in Graphics Management (in GameView) 
* [Template Method](https://en.wikipedia.org/wiki/Template_method_pattern) - Implemented by Libgdx in GameLoop (GameView, GameModel, Game Controller)
* [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern) - Implemented by Libgdx with controls listeners (in GameView)


## Test Design

### Break down into end to end tests

#### [Game Tests]

* Construct Slime - Verifies if constructs a slime properly
* Construct Ball - Verifies if constructs a ball properly
* Construct Goal - Verifies if constructs a goal properly
* Score - Verifies if the score is updated when ball gets into a slime's goal
* End Game - Verifies if the game ends when goal limit is reached


#### [Physics Tests]

* Move Slime - Verifies if the slime moves correctly
* Jump Slime - Verifies if the slime can jump only when  he is in the ground
* Contact between Slime and Ball - Verifies the ball position and velocity after it contacts with slime
* Contact between Slime and Goal - Verifies the slime position after it makes contact with the goal
* Contact between Ball and Goal - Verifies the ball position after it makes contact with the goal
* Catch Powers - Verifies if the slime catches a power when contacts with it

#### [AI Tests]

* Slime Movement - Verifies if the AI slime moves in order to catch the ball
* Slime Jumps - Verifies if the AI slime tries to reach Powers or avoid own goals by jumping over a moving ball in direction to his own goal
* Slime Strategies - Verifies if the AI slime average position on pitch agrees with a given strategy (Attack, Defense)

#### [Networking Tests]

* Connection between Devices - Verifies if two devices are connected


## Authors

* **Afonso Pinto** - [FooWalksIntoABar](https://github.com/FooWalksIntoABar)
* **Tomas Oliveira** - [Toliveira97](https://github.com/Toliveira97)

