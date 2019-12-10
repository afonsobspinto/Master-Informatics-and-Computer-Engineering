#!/usr/bin/env python

from settings import *
from navigation.utils.position import *
from robot import *

import rospy

def setup():
    # Tell rospy the name of your node -- until rospy has this information, it cannot start communicating with the
    # ROS Master. In this case, your node will take on the name 'main'

    rospy.init_node('main')
    #rate = rospy.Rate(50)


    r = Robot(Position(0, 0), rows=5)
    r.set_target(Position(0, 4))
   


if __name__ == '__main__':
    setup()
