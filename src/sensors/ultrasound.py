#!/usr/bin/env python

import rospy
from turtlebot3_msgs.msg import SensorState

class Ultrasound:
    THRESHOLD = 20

    def __init__(self, robot):
        self.robot = robot
        self.ultrasound_sub = rospy.Subscriber('sensor_state', SensorState, self.handle, queue_size=1)


    def handle(self, sensor):
        # sonar = top
        # battery = bottom
        if (self.robot.current_position + self.robot.orientation.value == self.robot.next_pos):
            if (sensor.sonar < self.THRESHOLD):
                self.robot.communication.proceed = "SONAR_TOP"
            elif (sensor.battery < self.THRESHOLD):
                self.robot.communication.proceed = "SONAR_BOTTOM"

    def ultrasound(self):
        pass
        # rate = rospy.Rate(10)
        # while not rospy.is_shutdown():
        # 	rate.sleep()
