#!/usr/bin/env python

import rospy
from candybot5.msg import CandybotSensors
from sensors.sensor_state import SensorState


class Infrared:
    THRESHOLD = 800

    def __init__(self, robot):
        self.robot = robot
        self.infrared_sub = rospy.Subscriber('candybot_sensors', CandybotSensors, self.handler, queue_size=1)

    def handler(self, candybot_sensor):
        if self.is_cliff_detected(candybot_sensor) and self.is_forward_pos_in_path():
            self.robot.sensor_state = SensorState.CLIFF

    def is_cliff_detected(self, candybot_sensor):
        return candybot_sensor.infrared_left > self.THRESHOLD or candybot_sensor.infrared_right > self.THRESHOLD

    def is_forward_pos_in_path(self):
        return self.robot.current_position + self.robot.orientation.value == self.robot.next_pos
