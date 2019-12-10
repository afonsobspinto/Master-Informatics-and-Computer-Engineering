#!/usr/bin/env python

import rospy
from geometry_msgs.msg import Twist


class Communication:
    def __init__(self, robot):
        self.robot = robot
        self.cmd_pub = rospy.Publisher('cmd_vel', Twist, queue_size=1)

    def move(self, linear, angular):
        twist = Twist()
        twist.linear.x = -linear[0]
        twist.linear.y = -linear[1]
        twist.linear.z = -linear[2]
        twist.angular.x = angular[0]
        twist.angular.y = angular[1]
        twist.angular.z = angular[2]
        self.cmd_pub.publish(twist)

    def stop(self):
        self.move([0, 0, 0], [0, 0, 0])
