# LPOO

## Dungeon Keep

"Unfairly captured by the tyrant ruler of your Realm, you have been thrown into a dark, damp and ghastly dungeon, left there to rot into forgetfulness... You keep yelling for the Guard, but he seems oblivious to your calls...You need to escape...wait...but...in the midst of all the fuss that was your capture, they forgot to lock your cell door...there is hope...but the task is not simple...will you have it in you to elude your jailers and make your way back to freedom?"


![menu preview](https://github.com/FooWalksIntoABar/FEUP/blob/master/LPOO/Dungeon%20Keep/src/gui/res/menuPreview.png?raw=true)


![game preview](https://github.com/FooWalksIntoABar/FEUP/blob/master/LPOO/Dungeon%20Keep/src/gui/res/gamePreview.png?raw=true)


![custom preview](https://github.com/FooWalksIntoABar/FEUP/blob/master/LPOO/Dungeon%20Keep/src/gui/res/customPreview.png?raw=true)

## SuperSlimeFootball

A simple SuperSlimeSoccer copycat game made using libGDX for the LPOO classes.

## Installation Procedure

 Setup - Project:
    Install the following pieces of software:
       - Java Development Kit 7+ (JDK);
       - [Android Studio] (https://developer.android.com/sdk/index.html) 
       Android Studio already comes packaged with the Android SDK so contrary to Eclipse or Intellij IDEA you do not need to install this component.

 Setup - App:
    - Run apk;
    - Accept permissions.

### UML

![](https://github.com/Toliveira97/SuperSlimeFootball/blob/finalRelease/ClassDiagram.png)

### Design Patterns Used

* [Singleton](https://en.wikipedia.org/wiki/Singleton_pattern) -  Restricts the instantiation of many classes
* [State Pattern](https://en.wikipedia.org/wiki/State_pattern) - Restricts the slime movement (in GameController class) && controls the game flow (in StateModel class and extensions)
* [Strategy Pattern](https://en.wikipedia.org/wiki/Strategy_pattern) - Controls the AI behavioural and the Menu Appeareance 
* [Flyweight Pattern](https://en.wikipedia.org/wiki/Flyweight_pattern) - Minimizes memory usage by sharing sprites (in EntityView class)
* [Factory Pattern](https://en.wikipedia.org/wiki/Factory_method_pattern) - Creates new object Views using EntityView as a common interface (in ViewFactory class)
* [DoubleBuffer]() - Implemented by Libgdx in Graphics Management (in GameView Class) 
* [Template Method](https://en.wikipedia.org/wiki/Template_method_pattern) - Implemented by Libgdx in GameLoop (GameView, GameModel, Game Controller classes)
* [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern) - Implemented by Libgdx with controls listeners (in GameView class)


### Design Decisions

* [MVC Design Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) - Software architectural pattern 


### Major Dificulties

We had some dificulties in our project mainly regarding the use of a thirdy-party framework (Libgdx). Objects serialization (needed for networking)  and testing were the major problems we faced. 
Our Better Code Hub classification were also affected by the use of this tool-

### Lessons Learned

With this project, we learned that creating a game is very complex and time consuming. We learned many things regarding networking, social networks integration, physics and AI.

### Overal Time Spent Developing

We spent the majority of our studying time developing the project, dedicating more time to it, than the exams. We worked, approximately, 35 hours a week on the project.

### Work Distribuition

Afonso Pinto - 60% - Integrating Libgdx, Logic, Networking, Social Networks, AI

Tomás Oliveira - 40% - Helping integrate Libgdx, Logic, GUI, Tests

It's safe to say that each one of us worked on the other partner's tasks and vice-versa.

## User Manual

On the Menu, you can see three Buttons. SinglePlayer, MultiPlayer and Options.

In SinglePlayer you play against an AI opponent, in Multiplayer, you play against another player using the same Internet and in the Options you can check the game's configurations.

![](https://github.com/Toliveira97/SuperSlimeFootball/blob/finalRelease/Screenshots/initialMenu.png)

On the Options menu, you can change the goal Limit and learn how to play.

![](https://github.com/Toliveira97/SuperSlimeFootball/blob/finalRelease/Screenshots/options.png)

![](https://github.com/Toliveira97/SuperSlimeFootball/blob/finalRelease/Screenshots/howToPlay.png)

On the SinglePlayer menu, you choose the slime you want to play with (blue or red).

![](https://github.com/Toliveira97/SuperSlimeFootball/blob/finalRelease/Screenshots/singlePlayer.png)

After choosing, the game starts, be ready!

![](https://github.com/Toliveira97/SuperSlimeFootball/blob/finalRelease/Screenshots/game.png)

## Authors
* Afonso Pinto – [@afonsobspinto](https://github.com/afonsobspinto)
* Tomás Oliveira – [@Toliveira97](https://github.com/Toliveira97)


