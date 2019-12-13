#!/usr/bin/env python

import rospy
from settings import log
from turtlebot3_msgs.msg import SensorState
from navigation.utils.switch_state import SwitchState


class Infrared:
    # digital so only 0 or 1 (40 or 1023)
    THRESHOLD = 800

    def __init__(self, robot):
        log("Infrared activated")
        self.robot = robot
        self.infrared_sub = rospy.Subscriber('sensor_state', SensorState, self.handler, queue_size=1)
        self.left = False
        self.right = False

    def handler(self, sensor_state):
        self.left = self.is_cliff_detected(sensor_state.cliff)
        self.right = self.is_cliff_detected(sensor_state.illumination)
        if self.robot.switch_state == SwitchState.REMAIN_TARGET or self.robot.switch_state == SwitchState.TO_TARGET or self.robot.switch_state == SwitchState.REMAIN_ULTRASOUND:
            if self.left and self.right:
                self.robot.switch_state = SwitchState.TO_INFRARED_BOTH
            elif self.left:
                self.robot.switch_state = SwitchState.TO_INFRARED_LEFT
            elif self.right:
                self.robot.switch_state = SwitchState.TO_INFRARED_RIGHT

    def is_cliff_detected(self, value):
        return value > self.THRESHOLD and value is not 0