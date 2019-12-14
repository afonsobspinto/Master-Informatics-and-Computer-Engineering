#!/usr/bin/env python
import math

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

    def handle(self, sensor):
        lidar_distances = self.get_scan(sensor)
        for l in lidar_distances:
            print l
        min_distance = min(lidar_distances)

        if self.robot.switch_state == SwitchState.REMAIN_TARGET or self.robot.switch_state == SwitchState.TO_TARGET:
            if min_distance < self.SAFE_STOP_DISTANCE:
                log("Lidar", "handle", "Detected Object")
                self.robot.switch_state = SwitchState.TO_LIDAR

    @staticmethod
    def get_scan(scan):
        scan_filter = []
        samples = len(scan.ranges)
        samples_view = 1
        if samples_view > samples:
            samples_view = samples
        if samples_view is 1:
            scan_filter.append(scan.ranges[0])
        else:
            left_lidar_samples_ranges = -(samples_view // 2 + samples_view % 2)
            right_lidar_samples_ranges = samples_view // 2

            left_lidar_samples = scan.ranges[left_lidar_samples_ranges:]
            right_lidar_samples = scan.ranges[:right_lidar_samples_ranges]
            scan_filter.extend(left_lidar_samples + right_lidar_samples)

        for i in range(samples_view):
            if scan_filter[i] == float('Inf'):
                scan_filter[i] = 3.5
            elif math.isnan(scan_filter[i]):
                scan_filter[i] = 0

        return scan_filter


