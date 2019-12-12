#!/usr/bin/env python

import rospy
from settings import log
from turtlebot3_msgs.msg import SensorState
from navigation.utils.switch_state import SwitchState


class Infrared:
    THRESHOLD = 800

    def __init__(self, robot):
        log("Infrared activated")
        self.robot = robot
        self.infrared_sub = rospy.Subscriber('sensor_state', SensorState, self.handler, queue_size=1)

    def handler(self, sensor_state):
        if self.robot.switch_state == SwitchState.REMAIN_TARGET or self.robot.switch_state == SwitchState.TO_TARGET or self.robot.switch_state == SwitchState.REMAIN_ULTRASOUND:
            left = self.is_cliff_detected(sensor_state.cliff)
            right = self.is_cliff_detected(sensor_state.illumination)
            if left and right:
                self.robot.switch_state = SwitchState.TO_INFRARED_BOTH
            elif left:
                self.robot.switch_state = SwitchState.TO_INFRARED_LEFT
            elif right:
                self.robot.switch_state = SwitchState.TO_INFRARED_RIGHT

    def is_cliff_detected(self, value):
        return value > self.THRESHOLD