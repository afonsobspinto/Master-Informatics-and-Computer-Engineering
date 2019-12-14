#!/usr/bin/env python

import rospy
from turtlebot3_msgs.msg import SensorState

from navigation.utils.switch_state import SwitchState


class Ultrasonic:
    THRESHOLD = 35

    def __init__(self, robot):
        self.robot = robot
        self.ultrasound_sub = rospy.Subscriber('sensor_state', SensorState, self.handle, queue_size=1)
        self.left = False
        self.right = False

    def handle(self, sensor):
        # Battery is left
        # Sonar is right
        self.left = self.is_object_detected(sensor.battery)
        self.right = self.is_object_detected(sensor.sonar)
        if self.robot.switch_state == SwitchState.REMAIN_TARGET or self.robot.switch_state == SwitchState.TO_TARGET:
            if self.left or self.right:
                self.robot.switch_state = SwitchState.TO_ULTRASOUND

    def is_object_detected(self, value):
        return value < self.THRESHOLD and value is not 0
