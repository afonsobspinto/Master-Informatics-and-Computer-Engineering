#!/usr/bin/env python

import rospy
from turtlebot3_msgs.msg import SensorState
from navigation.utils.switch_state import SwitchState
from settings import log

class Ultrasound:
    THRESHOLD = 40

    def __init__(self, robot):
        log("Ultrasound activated")
        self.robot = robot
        self.ultrasound_sub = rospy.Subscriber('sensor_state', SensorState, self.handle, queue_size=1)
        self.left = False
        self.right = False

    def handle(self, sensor):
        # Battery is left
        # Sonar is right
        self.left = sensor.battery < self.THRESHOLD
        self.right = sensor.sonar < self.THRESHOLD
        if self.robot.switch_state == SwitchState.REMAIN_TARGET or self.robot.switch_state == SwitchState.TO_TARGET:
            if (self.left and self.right):
                self.robot.switch_state = SwitchState.TO_ULTRASOUND_BOTH
            elif (self.left):
                self.robot.switch_state = SwitchState.TO_ULTRASOUND_LEFT
            elif (self.right):
                self.robot.switch_state = SwitchState.TO_ULTRASOUND_RIGHT
