from Infrared import *
from Grid import *


def setup():
	# Tell rospy the name of your node -- until rospy has this information, it cannot start communicating with the
	# ROS Master. In this case, your node will take on the name 'main'
	rospy.init_node('main')
	infrared, ultrasound = init_sensors()


def init_sensors():
	infrared = Infrared()
	ultrasound = UltraSound()
	return infrared, ultrasound


if __name__ == '__main__':
	setup()

