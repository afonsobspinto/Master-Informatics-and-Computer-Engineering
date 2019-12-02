#!/usr/bin/env python3

import rospy
from geometry_msgs.msg import Twist
from turtlebot3_msgs.msg import SensorState


class Communication:
    def __init__(self):
        self.cmd_pub = rospy.Publisher('cmd_vel', Twist, queue_size=1)

    def move_robot(self, linear, angular):
        twist = Twist()
        twist.linear = linear
        twist.angular = angular
        self.cmd_pub.publish(twist)

    def stop_robot(self):
        self.move_robot([0, 0, 0], [0, 0, 0])
