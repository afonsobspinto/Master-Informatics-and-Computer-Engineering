#!/usr/bin/env python3

from navigation.utils.position import *
from robot import *

import rospy

def setup():
    # Tell rospy the name of your node -- until rospy has this information, it cannot start communicating with the
    # ROS Master. In this case, your node will take on the name 'main'
    rospy.init_node('main')
    r = Robot(Position(5, 5), rows=5)
    r.grid.set_pos(Position(3, 3), GridType.OBSTACLE)
    r.grid.set_pos(Position(3, 2), GridType.OBSTACLE)
    r.grid.set_pos(Position(3, 1), GridType.OBSTACLE)
    r.grid.set_pos(Position(3, 0), GridType.OBSTACLE)
    r.grid.set_pos(Position(2, 3), GridType.OBSTACLE)
    r.grid.set_pos(Position(1, 3), GridType.OBSTACLE)
    r.set_target(Position(2, 2))
 
    r.move()
   


if __name__ == '__main__':
    setup()
