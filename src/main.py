from infrared import *
from Grid import *


def setup():
	# Tell rospy the name of your node -- until rospy has this information, it cannot start 	communicating with the ROS Master. In this case, your node will take on the name 'main'
	rospy.init_node('main')

	cliff = Cliff()
	ultrasound = UltraSound()

if __name__ == '__main__':
	setup()
	

	
	
