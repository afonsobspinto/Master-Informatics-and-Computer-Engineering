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
        self.obstacle_flag = False
        self.angle_view = 90
        self.left = False
        self.right = False

    def handle(self, sensor):
        lidar_distances = self.get_scan(sensor)
        for i, d in enumerate(lidar_distances):
            if d < self.SAFE_STOP_DISTANCE:
                log("Lidar", "handle", "Detected Object")
                if i <= len(lidar_distances)/2:
                    self.left = True
                else:
                    self.right = True
                self.robot.switch_state = SwitchState.TO_LIDAR

    def get_scan(self, scan):
        scan_filter = []
        samples = len(scan.ranges)
        min, front, max = self.get_indexes(self.angle_view)

        if max <= samples and min > 0:
            for i in range(min, max + 1):
                ray = scan.ranges[i]
                if ray != float('Inf') or not math.isnan(ray) or ray != 0.0:
                    scan_filter.append(ray)

        return scan_filter

    @staticmethod
    def get_indexes(angle_view):
        front_angle = 90
        split_angle = angle_view / 2
        min_angle = front_angle - split_angle
        max_angle = front_angle + split_angle
        return min_angle, front_angle, max_angle
