#!/usr/bin/env python

import rospy
from geometry_msgs.msg import Twist
from turtlebot3_msgs.msg import SensorState


class Communication:
    def __init__(self):
        self.cmd_pub = rospy.Publisher('cmd_vel', Twist, queue_size=1)
        self.proceed = True

    def move_robot(self, linear, angular):
        if(proceed):
            twist = Twist()
            twist.linear.x = -linear[0]
            twist.linear.y = -linear[1]
            twist.linear.z = -linear[2]
            twist.angular.x = angular[0]
            twist.angular.y = angular[0]
            twist.angular.z = angular[0]
            self.cmd_pub.publish(twist)
        else:
            self.stop_robot()

    def stop_robot(self):
        twist = Twist()
        twist.linear.x = 0
        wist.linear.y = 0
        twist.linear.z = 0
        twist.angular.x = 0
        twist.angular.y = 0
        twist.angular.z = 0
        self.cmd_pub.publish(twist)
