#!/usr/bin/env python
import math
import sys

import rospy
from sensor_msgs.msg import LaserScan

from navigation.utils.switch_state import SwitchState
from settings import log


#
# Code adapted from
# https://github.com/ROBOTIS-GIT/turtlebot3/blob/master/turtlebot3_example/nodes/turtlebot3_obstacle#L43
#
class Lidar:
    STOP_DISTANCE = 0.2
    LIDAR_ERROR = 0.05
    SAFE_STOP_DISTANCE = STOP_DISTANCE + LIDAR_ERROR

    def __init__(self, robot):
        log("Lidar", "__init__", "Lidar Sensor Activated")
        self.robot = robot
        self.lidar_sub = rospy.Subscriber('scan', LaserScan, self.handle, queue_size=1)
        self.angle_view = 60
        self.left = False
        self.right = False

    def handle(self, sensor):
        left_distances, right_distances = self.get_scan(sensor)

        self.left = self._detect(left_distances)
        self.right = self._detect(right_distances)

        if self.robot.switch_state == SwitchState.REMAIN_TARGET or self.robot.switch_state == SwitchState.TO_TARGET \
                or self.robot.switch_state == SwitchState.REMAIN_ULTRASOUND:
            if self.left or self.right:
                print self.left, self.right
                self.robot.switch_state = SwitchState.TO_LIDAR

    def _detect(self, lidar_distances):
        for distance in lidar_distances:
            if distance < self.SAFE_STOP_DISTANCE:
                return True
        return False

    def get_scan(self, scan):
        left_scan_filter = []
        right_scan_filter = []
        left_min = self.angle_view
        left_max = 0
        right_min = 359
        right_max = 360 - self.angle_view

        if scan.ranges:
            for i in range(left_min, left_max, -1):
                ray = scan.ranges[i]
                if ray != float('Inf') and not math.isnan(ray) and ray != 0.0:
                    left_scan_filter.append(ray)

            for i in range(right_min, right_max, -1):
                ray = scan.ranges[i]
                if ray != float('Inf') and not math.isnan(ray) and ray != 0.0:
                    right_scan_filter.append(ray)

        return right_scan_filter, left_scan_filter
