[![made-with-python](https://img.shields.io/badge/Made%20with-Python-1f425f.svg)](https://www.python.org/)
[![made-with-ros](https://img.shields.io/badge/Made%20with-ROS-informational)](https://www.ros.org/)

# Robotics-5

How many times do you feel like having a candy but you are too lazy to pick it up? Fear no more, Candybot5 is here to help.

Attentive and agile, Candybot5 goes through the darkest places on your table to give you a handful of help.

[![Take 1](https://img.youtube.com/vi/EGyTptYlcaU/default.jpg)](https://youtu.be/EGyTptYlcaU)
[![Take 2](https://img.youtube.com/vi/GPRidL9xaKI/default.jpg)](https://youtu.be/GPRidL9xaKI)
 
We are not responsible for weight gain or broken mugs.

## Getting Started

### Setup
#### Remote
1. `nano ~/.bashrc`

	a) ROS_MASTER_URI=http://REMOTE_IP:11311
	
    b) ROS_HOSTNAME=REMOTE_IP
2. `source ~/.bashrc`
3. Create and activate a python2 virtual environment
4. `pip install -r requirements.txt`

#### Raspberry Pi
1. `nano ~/.bashrc`

	a) ROS_MASTER_URI=http://REMOTE_IP:11311
	
	b) ROS_HOSTNAME=RASPBERRY_IP

### Run Base
#### Remote
1. `export TURTLEBOT3_MODEL=burger`
2. `roscore`

#### Raspberry Pi
1. `roslaunch turtlebot3_bringup turtlebot3_robot.launch`

### Run Code
#### Remote
1. `rosrun candybot_nomap main.py`

## Built With

* [Turtlebot3](http://emanual.robotis.com/docs/en/platform/turtlebot3/overview/) - TurtleBot is a ROS standard platform robot. 
* [OpenCR](http://emanual.robotis.com/docs/en/parts/controller/opencr10/) - OpenCR1.0 is developed for ROS embedded systems to provide completely open-source hardware and software.

## Authors
* Afonso Pinto [@afpinto](https://github.ugent.be/afpinto)
* Arthur Crapé [@acrap](https://github.ugent.be/acrap)
* Kasper Zwijsen [@kzwijsen](https://github.ugent.be/kzwijsen)
* Thiebe Stegen [@tstegen](https://github.ugent.be/tstegen)